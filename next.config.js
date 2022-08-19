/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		images: {
			allowFutureImage: true,
			remotePatterns: [{ protocol: "https", hostname: "**" }]
		}
	}
};

module.exports = nextConfig;
