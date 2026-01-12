/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        // ssr and displayName are configured by default
        styledComponents: true,
    },
    async rewrites() {
        return [
            {
                source: '/(links|lnk|l)',
                destination: '/',
            },
        ]
    },
}

module.exports = nextConfig
