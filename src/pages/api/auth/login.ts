import { serialize } from "cookie";

import { User } from "~/models/user";
import { auth } from "~/services";
import { withRequestErrorBoundary } from "~/utils/with-error-boundary";

export default withRequestErrorBoundary(async (request, response) => {
	const { user, session } = await auth.login(request.body);

	response.setHeader("Set-Cookie", serialize("session", session.token, { path: "/" }));
	response.json(User.parse(user));
});
