import { z } from "zod";
import { Post } from "~/models/post";
import { withValidation } from "~/utils/with-validation";

export const createPost = withValidation(
	[z.object({message:})],
	async (payload) => {
		payload.attachments[0].
	}
);
