import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export (GitHub Pages 등)
  output: "export",
  trailingSlash: true,        // /community/view/ 형태 허용
  images: { unoptimized: true }, // export 모드에서 이미지 최적화 끔

  // TypeScript/ESLint 빌드 검증
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },

  // 실험 옵션 (MUI import 최적화)
  experimental: {
    optimizePackageImports: [
      "@mui/material",
      "@emotion/react",
      "@emotion/styled",
    ],
  },
};

export default nextConfig;
