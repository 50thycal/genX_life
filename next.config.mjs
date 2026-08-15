/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "d3t3ozftmdmh3i.cloudfront.net" },
      { protocol: "https", hostname: "i.etsystatic.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  async redirects() {
    return [
      // The old brand's domain is pointed here. Keep deep links alive.
      { source: "/podcast.html", destination: "/#podcast", permanent: true },
    ];
  },
};

export default nextConfig;
