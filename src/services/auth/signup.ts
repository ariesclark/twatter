import * as argon2 from "argon2";

import { prisma } from "~/utils/prisma";
import { withValidation } from "~/utils/with-validation";
import { CreateUser, PrismaUserInclude, transformUser } from "~/models/user";

export const signup = withValidation([CreateUser], async (payload) => {
	const password = await argon2.hash(payload.password);

	const user = await prisma.user.create({
		include: PrismaUserInclude,
		data: {
			email: payload.email,
			username: payload.username,
			password,
			profile: {
				create: {
					displayName: payload.displayName,
					bornAt: payload.bornAt,
					privacy: {
						create: {}
					}
				}
			}
		}
	});

	return transformUser(user);
});
