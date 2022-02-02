module.exports = {
  reactStrictMode: true,
  swcMinify: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "encrypted-tbn0.gstatic.com",
      "lh3.googleusercontent.com",
      "miro.medium.com",
      "localhost",
      "img.icons8.com",
      "helostatus.com",
    ],
  },
};
