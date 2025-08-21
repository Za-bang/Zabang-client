import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";

const noto = Noto_Sans_KR({
  weight: ["400", "500", "700", "900"], // 자주 쓰는 굵기만 포함 → 용량↓
  subsets: ["latin"],                   // KR 글꼴은 자동 포함됨
  display: "swap",                      // FOUT 최소화
});

export const metadata = {
  title: "ZaBang",
  description: "주변 자취방 리뷰/추천 플랫폼",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={noto.className}>
        {children}
      </body>
    </html>
  );
}
