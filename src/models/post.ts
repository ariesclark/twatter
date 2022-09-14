/* eslint-disable import/named */
import { z } from "zod";

import {
	Post as PrismaPost,
	PostAttachment as PrismaPostAttachment,
	PostAttachmentType as PrismaPostAttachmentType,
	PostEntityList as PrismaPostEntityList
} from "~/utils/prisma";

import { User } from "./user";
export type { PrismaPost, PrismaPostAttachment, PrismaPostAttachmentType, PrismaPostEntityList };

export const PostMessage = z.string();

export const PostAttachmentType = z.nativeEnum(PrismaPostAttachmentType);

export const PostEntityList = z.object({
	mentions: z.array(User),
	links: z.array(z.string().url()),
	likes: z.array(z.string().cuid())
});

export type PostEntityList = z.infer<typeof PostEntityList>;

export const PostAttachment = z.object({
	id: z.string().cuid(),
	type: PostAttachmentType
});

export type PostAttachment = z.infer<typeof PostAttachment>;

export const Post = z.object({
	id: z.string().cuid(),
	message: PostMessage,
	author: User,
	parentId: z.string().cuid().nullable(),
	attachments: z.array(PostAttachment),
	entities: PostEntityList
});

export type Post = z.infer<typeof Post>;
