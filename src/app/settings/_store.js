const KEY = "zabang_profile";

const DEFAULT_PROFILE = {
  name: "",
  nickname: "",
  phone: "",
  avatar: "", // dataURL

  notifications: {
    push: true,
    newListing: true,
    interestRegion: true,
    comment: true,
    interestRegions: [], // ["1구역", "2구역", ...]
  },

  privacy: {
    location: false,
    photos: false,
    contacts: false,
  },

  legal: {
    terms: false,
    privacy: false,
  },
};

export function loadProfile() {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(DEFAULT_PROFILE));
    return DEFAULT_PROFILE;
  }
  try {
    const parsed = JSON.parse(raw);
    // 남아있을지 모르는 예전 키(예: linkedProviders)는 자연스럽게 무시됨
    return { ...DEFAULT_PROFILE, ...parsed };
  } catch {
    localStorage.setItem(KEY, JSON.stringify(DEFAULT_PROFILE));
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(next) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("zabang:profile-changed"));
}

export function clearProfile() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("zabang:profile-changed"));
}
