import { useAtom, atom } from "jotai";
import { useDebugValue } from "react";

import { Session } from "~/models/session";

const sessionAtom = atom<Session | null>(null);
// const userAtom = atom((get) => get(sessionAtom)?.user);

export function useSession() {
	return useAtom(sessionAtom);
}

export function useCurrentUser() {
	const [session] = useSession();

	useDebugValue(session?.user, (user) => (user ? `@${user.username}` : "null"));

	if (!session || !session.user) return null;
	const { user } = session;

	return user;
}
