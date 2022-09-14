import { z } from "zod";

// eslint-disable-next-line import/named
import { Session as PrismaSession } from "~/utils/prisma";

import { User } from "./user";
export type { PrismaSession };

export const Session = z.object({
	id: z.string().cuid(),
	token: z.string(),
	userId: z.string().cuid(),
	user: User.nullish()
});

export type Session = z.infer<typeof Session>;
