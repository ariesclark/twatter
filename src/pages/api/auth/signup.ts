import { auth } from "~/services";
import { withRequestErrorBoundary } from "~/utils/with-error-boundary";

export default withRequestErrorBoundary(async (request, response) => {
	const user = await auth.signup(request.body);
	response.json(user);
});
