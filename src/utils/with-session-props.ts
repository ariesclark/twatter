import { ParsedUrlQuery } from "querystring";

import { GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from "next";

import { User } from "~/models/user";
import { users } from "~/services";
import { Session } from "~/models/session";

import { getRequestSession } from "./with-request-session";

export interface withSessionPropsOptions {
	required?: boolean;
}

export type WithSessionProps<T> = T & {
	session: Session & { user: User };
};

type GetServerSidePropsWithSessionContext<
	Q extends ParsedUrlQuery = ParsedUrlQuery,
	D extends PreviewData = PreviewData
> = GetServerSidePropsContext<Q, D> & { session: WithSessionProps<unknown>["session"] };

export type GetServerSidePropsWithSession<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	P extends { [key: string]: any } = { [key: string]: any },
	Q extends ParsedUrlQuery = ParsedUrlQuery,
	D extends PreviewData = PreviewData
> = (context: GetServerSidePropsWithSessionContext<Q, D>) => Promise<GetServerSidePropsResult<P>>;

export function withSessionProps<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	P extends { [key: string]: any } = { [key: string]: any },
	Q extends ParsedUrlQuery = ParsedUrlQuery,
	D extends PreviewData = PreviewData
>(
	options: withSessionPropsOptions,
	getServerSideProps: GetServerSidePropsWithSession<Omit<P, "session">, Q, D>
): GetServerSidePropsWithSession<P, Q, D> {
	return async (context): Promise<GetServerSidePropsResult<P>> => {
		const session = await getRequestSession(context.req);
		if (!session && options.required) {
			return {
				redirect: {
					destination: "/login",
					permanent: false
				}
			};
		}

		const user = await users.getByUsername("me", session);
		context = Object.assign(context, {
			session:
				session && user
					? {
							...session,
							user
					  }
					: null
		});

		const response = await getServerSideProps(context);

		return {
			...response,
			props: JSON.parse(
				JSON.stringify({
					...("props" in response ? response.props : {}),
					session: context.session
				})
			)
		};
	};
}
