import { z } from "zod";

export const Date = z.preprocess((value) => {
	if (typeof value == "string" || value instanceof globalThis.Date)
		return new globalThis.Date(value);
}, z.date());
