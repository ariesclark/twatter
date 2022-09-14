import "~/styles/globals.css";

import { Provider } from "jotai";

import { useSession } from "~/hooks/use-session";

import type { AppProps } from "next/app";

type SessionProviderProps = Pick<AppProps, "Component" | "pageProps">;

const SessionProvider: React.FC<SessionProviderProps> = ({ Component, pageProps }) => {
	const [, setSession] = useSession();
	setSession(pageProps.session);

	return <Component {...pageProps} />;
};

export default function App({ Component, pageProps }: AppProps) {
	const [, setSession] = useSession();
	setSession(pageProps.session);

	return (
		<Provider>
			<SessionProvider {...{ pageProps, Component }} />
		</Provider>
	);
}
