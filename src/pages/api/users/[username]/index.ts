import { users } from "~/services";
import { RequestError } from "~/utils/request-error";
import { withRequestSession } from "~/utils/with-request-session";

export default withRequestSession({}, async (request, response) => {
	const user = await users.getByUsername(request.query.username as string, request.session);
	if (!user) throw new RequestError("User not found", { statusCode: 404 });

	response.json(user);
});
