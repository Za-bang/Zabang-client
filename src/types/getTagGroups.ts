import { TAG_GROUPS } from "@/types/constants";
import { MOCK_PROPERTY_AI } from "@/data/demoProperties";

export function getCombinedTagGroups() {
  // AI 키워드 전체 모으기
  const aiKeywords = MOCK_PROPERTY_AI.flatMap((ai) =>
    ai.keywords.map((kw) => kw.replace(/^[-+]/, "")) // 부호 제거
  );

  // 중복 제거
  const uniqueKeywords = [...new Set(aiKeywords)];

  // AI 그룹
  const aiGroup = {
    key: "ai",
    label: "AI 키워드",
    tags: uniqueKeywords,
  };

  // 기존 TAG_GROUPS + AI 그룹 합치기
  return [...TAG_GROUPS, aiGroup];
}
