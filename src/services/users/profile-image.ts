import { z } from "zod";

import { STORAGE_BUCKET_NAME } from "~/utils/config";

export const ProfileImageKind = z.union([z.literal("avatar"), z.literal("banner")]);
export type ProfileImageKind = z.infer<typeof ProfileImageKind>;

export interface ProfileImageKindInformation {
	size: {
		width: number;
		height: number;
	};
}

export const ProfileImageKindMetadata: Record<ProfileImageKind, ProfileImageKindInformation> = {
	avatar: {
		size: {
			width: 512,
			height: 512
		}
	},
	banner: {
		size: {
			width: 2048,
			height: 512
		}
	}
};

export function getProfileImageUrl(kind: ProfileImageKind, hash?: string | null): string {
	if (!hash) {
		const { size } = ProfileImageKindMetadata[kind];
		return `https://via.placeholder.com/${size.width}x${size.height}`;
	}

	return `https://storage.googleapis.com/${STORAGE_BUCKET_NAME}/${kind}s/${hash || "default"}`;
}
