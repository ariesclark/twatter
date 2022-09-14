import { randomBytes } from "crypto";

import { prisma } from "~/utils/prisma";

function createSessionToken(): string {
	return randomBytes(32).toString("base64");
}

export async function getSession(token: string) {
	return prisma.session.findUnique({ where: { token } });
}

export async function createSession(userId: string) {
	return prisma.session.create({
		data: {
			userId,
			token: createSessionToken()
		}
	});
}
