/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.credly.com',
      },
      {
        protocol: 'https',
        hostname: 'api.accredible.com',
      },
      {
        protocol: 'https',
        hostname: 'brm-workforce.oracle.com',
      },
      {
        protocol: 'https',
        hostname: 'trailhead.salesforce.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
};

export default nextConfig;
