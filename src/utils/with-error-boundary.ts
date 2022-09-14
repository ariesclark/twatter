import { NextApiHandler } from "next";

import { RequestError } from "./request-error";

export function withRequestErrorBoundary<T extends NextApiHandler>(callback: T): T {
	return (async (request, response) => {
		try {
			await callback(request, response);
		} catch (reason) {
			const error = RequestError.from(reason);
			if (error.isInternal()) console.error(error);

			response.status(error.statusCode).json({ error });
		}
	}) as T;
}
