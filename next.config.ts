import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'p1yifgr600k2wcbg.public.blob.vercel-storage.com',
                port: '',
            },
        ],
    },
};

export default nextConfig;
