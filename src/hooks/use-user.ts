import { useDebugValue } from "react";
import useSWR from "swr";

import { User } from "~/models/user";

export function useUser(username: string) {
	const value = useSWR(`user/${username}`, async () => {
		const response = await fetch(`/api/users/${username}`);

		if (!response.ok) throw new Error("Response failed");
		return response.json() as Promise<User>;
	});

	useDebugValue(value.data, (user) => (user ? `@${user.username}` : "null"));

	return value;
}
