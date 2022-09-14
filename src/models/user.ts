/* eslint-disable import/named */
import { z } from "zod";

import {
	User as PrismaUser,
	Profile as PrismaProfile,
	ProfilePrivacy as PrismaProfilePrivacy
} from "~/utils/prisma";

import { Date } from "./date";
import { PrivacyLevel } from "./privacy";
import { Session } from "./session";

export type { PrismaUser, PrismaProfile, PrismaProfilePrivacy };

export const Username = z.string().min(5).max(24).regex(/\w+/, "Bad characters");
export const UserDisplayName = z.string().min(5).max(24);
export const UserDescription = z.string().max(196);

export const UserPassword = z.string().min(8).max(32);

export const UserEmail = z.string().email();

export const ProfilePrivacy = z.object({
	overall: PrivacyLevel.default("public"),
	location: PrivacyLevel.default("public"),
	locationState: PrivacyLevel.default("public"),
	bornAt: PrivacyLevel.default("public"),
	bornAtYear: PrivacyLevel.default("public")
});

export type ProfilePrivacy = z.infer<typeof ProfilePrivacy>;

export const Profile = z.object({
	displayName: UserDisplayName,
	description: UserDescription,
	avatar: z.string().nullable(),
	banner: z.string().nullable(),
	url: z.string().url().nullable(),
	urlVerifiedAt: Date.nullable(),
	location: z.string().nullable(),
	bornAt: Date,
	privacy: ProfilePrivacy
});

export type Profile = z.infer<typeof Profile>;

export const User = z.object({
	id: z.string().cuid(),
	username: Username,
	following: z.number(),
	followers: z.number(),
	email: UserEmail.nullish(),
	emailVerifiedAt: Date.nullish(),
	profile: Profile,
	createdAt: Date
});

export type User = z.infer<typeof User>;

export const CreateUser = z.object({
	email: UserEmail,
	username: Username,
	displayName: UserDisplayName,
	bornAt: Date,
	password: UserPassword
});

type PrismaUserSource = PrismaUser & {
	profile: PrismaProfile & {
		privacy: PrismaProfilePrivacy;
	};
	_count: {
		followers: number;
		following: number;
	};
};

export const PrismaUserInclude = {
	profile: {
		include: {
			privacy: true
		}
	},
	_count: {
		select: {
			followers: true,
			following: true
		}
	}
} as const;

export function transformUser(source: PrismaUserSource, session?: Session | null): User {
	const user: User = {
		...source,
		followers: source._count.followers,
		following: source._count.following
	};

	if (!session || session.userId !== source.id) {
		(["email", "emailVerifiedAt"] as const).forEach((key) => (user[key] = null));
	}

	return User.parse(user);
}
