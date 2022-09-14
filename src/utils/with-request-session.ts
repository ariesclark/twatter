import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";

import { Session } from "~/models/session";
import { auth } from "~/services";

import { RequestError } from "./request-error";
import { withRequestErrorBoundary } from "./with-error-boundary";

type Request<T> = NextApiRequest & T;

type Callback<T> = (req: Request<T>, res: NextApiResponse) => unknown | Promise<unknown>;
type NullableSessionCallback = Callback<{ session: Session | null }>;
type RequiredSessionCallback = Callback<{ session: Session }>;

interface WithRequestSessionOptions {
	required?: boolean;
}

type WithRequestSessionRequiredOptions = WithRequestSessionOptions & { required: true };

export async function getRequestSession(
	request: GetServerSidePropsContext["req"]
): Promise<Session | null> {
	return request.cookies.session ? await auth.getSession(request.cookies.session) : null;
}

export function withRequestSession(
	options: WithRequestSessionRequiredOptions,
	callback: RequiredSessionCallback
): RequiredSessionCallback;
export function withRequestSession(
	options: WithRequestSessionOptions,
	callback: NullableSessionCallback
): NullableSessionCallback;
export function withRequestSession(
	options: WithRequestSessionOptions,
	callback: NullableSessionCallback | RequiredSessionCallback
): NullableSessionCallback {
	return withRequestErrorBoundary(async (request, response) => {
		const session = request.cookies.session ? await auth.getSession(request.cookies.session) : null;

		if (options.required && session === null)
			throw new RequestError("Missing credentials", { statusCode: 401 });

		await callback(
			Object.assign(request, { session }) as Parameters<RequiredSessionCallback>[0],
			response
		);
	});
}
