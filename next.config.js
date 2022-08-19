/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	rewrites: async () => [
		{
			source: "/:path*",
			destination: "/profile/:path*"
		}
	],
	experimental: {
		images: {
			allowFutureImage: true,
			remotePatterns: [{ protocol: "https", hostname: "**" }]
		}
	}
};

module.exports = nextConfig;
