const KEY = "zabang_feedbacks";

export function loadFeedbacks() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function addFeedback(item) {
  if (typeof window === "undefined") return;
  const list = loadFeedbacks();
  list.unshift(item); // 최신이 위로
  localStorage.setItem(KEY, JSON.stringify(list));
}
