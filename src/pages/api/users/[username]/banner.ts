// eslint-disable-next-line import/named
import { File, Formidable } from "formidable";

import { users } from "~/services";
import { RequestError } from "~/utils/request-error";
import { withRequestSession } from "~/utils/with-request-session";

export const config = {
	api: {
		bodyParser: false
	}
};

export default withRequestSession({ required: true }, async (request, response) => {
	const data = await new Promise<File>((resolve, reject) => {
		const form = new Formidable({ hashAlgorithm: "sha256" });

		form.parse(request, (err, fields, files) => {
			if (err) return reject(err);

			const file = files.banner;
			if (!file || Array.isArray(file))
				throw new RequestError("Uploaded file invalid", { statusCode: 400 });

			resolve(file);
		});
	});

	response
		.status(201)
		.json(
			await users.uploadProfileImage(
				request.query.username as string,
				"banner",
				data,
				request.session
			)
		);
});
