import assert from "assert";
import fs from "fs/promises";

import { z } from "zod";
import { Storage } from "@google-cloud/storage";
import { File } from "formidable";
import sharp from "sharp";

import { withValidation } from "~/utils/with-validation";
import { Username } from "~/models/user";
import { Session } from "~/models/session";
import { RequestError } from "~/utils/request-error";
import { prisma } from "~/utils/prisma";
import { STORAGE_BUCKET_NAME } from "~/utils/config";

import { getByUsername } from "./get-by-username";
import { ProfileImageKind, ProfileImageKindMetadata } from "./profile-image";

const storage = new Storage({ projectId: process.env.GOOGLE_CLOUD_PROJECT_ID });
const bucket = storage.bucket(STORAGE_BUCKET_NAME);

export const uploadProfileImage = withValidation(
	[z.union([Username, z.literal("me")]), ProfileImageKind, z.any(), Session],
	async (username, kind, file: File, session) => {
		const user = await getByUsername(username, session);
		assert(user !== null);

		if (user.id !== session.userId)
			throw new RequestError("Insufficient permissions", { statusCode: 403 });

		const metadata = ProfileImageKindMetadata[kind];

		const imageData = await sharp(file.filepath)
			.jpeg({ mozjpeg: true, quality: 90 })
			.resize(metadata.size.width, metadata.size.height)
			.toBuffer();

		const cloudFile = bucket.file(`${kind}s/${file.hash}`);
		await cloudFile.save(imageData, { contentType: "image/jpeg" });

		await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				profile: {
					update: {
						[kind]: file.hash
					}
				}
			}
		});

		// delete local temporary file.
		await fs.unlink(file.filepath);

		return { url: cloudFile.publicUrl() };
	}
);
