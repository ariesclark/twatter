import { z } from "zod";

import { prisma } from "~/utils/prisma";
import { withValidation } from "~/utils/with-validation";
import { PrismaUserInclude, transformUser, Username } from "~/models/user";
import { Session } from "~/models/session";

export const getByUsername = withValidation(
	[z.union([Username, z.literal("me")]), Session.nullish()],
	async (username, session) => {
		const user = await prisma.user.findUnique({
			where: username === "me" && session ? { id: session.userId } : { username },
			include: PrismaUserInclude
		});

		if (user === null) return null;
		return transformUser(user, session);
	}
);
