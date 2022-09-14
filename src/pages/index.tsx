import { NextPage } from "next";

import { Layout } from "~/components/layout";
import { withSessionProps } from "~/utils/with-session-props";

export const getServerSideProps = withSessionProps({}, async () => {
	return {
		props: {}
	};
});

const RootIndexPage: NextPage = function () {
	return <Layout />;
};

export default RootIndexPage;
