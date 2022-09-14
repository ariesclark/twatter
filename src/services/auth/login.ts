import { z } from "zod";
import * as argon2 from "argon2";

import { prisma } from "~/utils/prisma";
import { withValidation } from "~/utils/with-validation";
import { PrismaUserInclude, transformUser, UserEmail, Username, UserPassword } from "~/models/user";

import { createSession } from "./session";

export const login = withValidation(
	[
		z.union([z.object({ username: Username }), z.object({ email: UserEmail })]).and(
			z.object({
				password: UserPassword,
				mfa: z
					.discriminatedUnion("type", [
						z.object({
							type: z.literal("totp"),
							code: z.number()
						}),
						z.object({
							type: z.literal("sms"),
							code: z.number()
						})
					])
					.optional()
			})
		)
	],
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async ({ password, mfa, ...where }) => {
		const user = await prisma.user.findUnique({ where, include: PrismaUserInclude });
		const valid = user !== null && (await argon2.verify(user.password, password));

		// @todo: do mfa things.
		if (!valid) throw new Error("Bad credentials");
		const session = await createSession(user.id);

		return {
			session,
			user: transformUser(user)
		};
	}
);
