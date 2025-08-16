import { POSTS as SEED_POSTS } from "./_data";

const KEY = "zabang_posts";
const KEY_LAST = "zabang_posts_last";

function notifyChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("zabang:posts-changed"));
  localStorage.setItem(KEY_LAST, String(Date.now()));
}

function normalizePosts(posts) {
  return posts.map((p) => ({
    ...p,
    reports: typeof p.reports === "number" ? p.reports : 0,
    comments: Array.isArray(p.comments)
      ? p.comments.map((c) => ({
          ...c,
          replies: Array.isArray(c.replies) ? c.replies : [],
          reports: typeof c.reports === "number" ? c.reports : 0,
        }))
      : [],
  }));
}

export function loadPosts() {
  if (typeof window === "undefined") return normalizePosts(SEED_POSTS);
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    const init = normalizePosts(SEED_POSTS);
    localStorage.setItem(KEY, JSON.stringify(init));
    return init;
  }
  try {
    const parsed = JSON.parse(raw);
    const normalized = normalizePosts(parsed);
    if (JSON.stringify(parsed) !== JSON.stringify(normalized)) {
      localStorage.setItem(KEY, JSON.stringify(normalized));
    }
    return normalized;
  } catch {
    const init = normalizePosts(SEED_POSTS);
    localStorage.setItem(KEY, JSON.stringify(init));
    return init;
  }
}

export function savePosts(posts) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(normalizePosts(posts)));
  notifyChange();
}

export function addPost({ title, body, tags = [], imageDataUrl = "" }) {
  const posts = loadPosts();
  const region = tags.find((t) => /구역$/.test(t)) || "1구역";
  const type = tags.find((t) => t !== region) || "자유글";
  const id = "u" + Date.now().toString(36);
  const newPost = {
    id,
    type,
    region,
    title,
    status: "",
    author: "익명",
    date: new Date().toISOString().slice(0, 16).replace("T", " "),
    excerpt: (body || "").slice(0, 80),
    image: imageDataUrl,
    views: 0,
    comments: [],
    reports: 0,
  };
  savePosts([newPost, ...posts]);
  return newPost;
}

export function getPostById(id) {
  const posts = loadPosts();
  return posts.find((p) => p.id === id);
}

/* 댓글/답글 추가 */
export function addComment(postId, { author = "익명", text = "" }) {
  const posts = loadPosts();
  const pIdx = posts.findIndex((p) => p.id === postId);
  if (pIdx < 0) return null;

  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const dateLabel = `${pad(now.getMonth() + 1)}/${pad(now.getDate())} ${pad(
    now.getHours()
  )}:${pad(now.getMinutes())}`;

  const comment = {
    id: "c" + Date.now().toString(36),
    author,
    text,
    date: dateLabel,
    replies: [],
    reports: 0,
  };

  const updated = { ...posts[pIdx], comments: [...posts[pIdx].comments, comment] };
  const next = [...posts];
  next[pIdx] = updated;
  savePosts(next);
  return updated;
}

export function addReply(postId, parentCommentId, { author = "익명", text = "" }) {
  const posts = loadPosts();
  const pIdx = posts.findIndex((p) => p.id === postId);
  if (pIdx < 0) return null;
  const cIdx = posts[pIdx].comments.findIndex((c) => c.id === parentCommentId);
  if (cIdx < 0) return null;

  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const dateLabel = `${pad(now.getMonth() + 1)}/${pad(now.getDate())} ${pad(
    now.getHours()
  )}:${pad(now.getMinutes())}`;

  const reply = {
    id: "r" + Date.now().toString(36),
    author,
    text,
    date: dateLabel,
    reports: 0,
  };

  const parent = posts[pIdx].comments[cIdx];
  const updatedComment = { ...parent, replies: [...parent.replies, reply] };
  const updatedPost = {
    ...posts[pIdx],
    comments: posts[pIdx].comments.map((c, i) => (i === cIdx ? updatedComment : c)),
  };

  const next = [...posts];
  next[pIdx] = updatedPost;
  savePosts(next);
  return updatedPost;
}

/* 신고 */
export function reportPost(postId) {
  const posts = loadPosts();
  const pIdx = posts.findIndex((p) => p.id === postId);
  if (pIdx < 0) return null;
  const updated = { ...posts[pIdx], reports: (posts[pIdx].reports || 0) + 1 };
  const next = [...posts];
  next[pIdx] = updated;
  savePosts(next);
  return updated;
}
export function reportComment(postId, commentId) {
  const posts = loadPosts();
  const pIdx = posts.findIndex((p) => p.id === postId);
  if (pIdx < 0) return null;
  const cIdx = posts[pIdx].comments.findIndex((c) => c.id === commentId);
  if (cIdx < 0) return null;

  const comment = posts[pIdx].comments[cIdx];
  const updatedComment = { ...comment, reports: (comment.reports || 0) + 1 };
  const updatedPost = {
    ...posts[pIdx],
    comments: posts[pIdx].comments.map((c, i) => (i === cIdx ? updatedComment : c)),
  };
  const next = [...posts];
  next[pIdx] = updatedPost;
  savePosts(next);
  return updatedPost;
}
export function reportReply(postId, commentId, replyId) {
  const posts = loadPosts();
  const pIdx = posts.findIndex((p) => p.id === postId);
  if (pIdx < 0) return null;
  const cIdx = posts[pIdx].comments.findIndex((c) => c.id === commentId);
  if (cIdx < 0) return null;

  const parent = posts[pIdx].comments[cIdx];
  const updatedComment = {
    ...parent,
    replies: parent.replies.map((r) =>
      r.id === replyId ? { ...r, reports: (r.reports || 0) + 1 } : r
    ),
  };
  const updatedPost = {
    ...posts[pIdx],
    comments: posts[pIdx].comments.map((c, i) => (i === cIdx ? updatedComment : c)),
  };
  const next = [...posts];
  next[pIdx] = updatedPost;
  savePosts(next);
  return updatedPost;
}

/* 삭제 */
export function deletePost(postId) {
  const posts = loadPosts();
  const next = posts.filter((p) => p.id !== postId);
  savePosts(next);
  return next;
}
export function deleteComment(postId, commentId) {
  const posts = loadPosts();
  const pIdx = posts.findIndex((p) => p.id === postId);
  if (pIdx < 0) return null;
  const updatedPost = {
    ...posts[pIdx],
    comments: posts[pIdx].comments.filter((c) => c.id !== commentId),
  };
  const next = [...posts];
  next[pIdx] = updatedPost;
  savePosts(next);
  return updatedPost;
}
export function deleteReply(postId, parentCommentId, replyId) {
  const posts = loadPosts();
  const pIdx = posts.findIndex((p) => p.id === postId);
  if (pIdx < 0) return null;
  const cIdx = posts[pIdx].comments.findIndex((c) => c.id === parentCommentId);
  if (cIdx < 0) return null;

  const parent = posts[pIdx].comments[cIdx];
  const updatedComment = { ...parent, replies: parent.replies.filter((r) => r.id !== replyId) };
  const updatedPost = {
    ...posts[pIdx],
    comments: posts[pIdx].comments.map((c, i) => (i === cIdx ? updatedComment : c)),
  };
  const next = [...posts];
  next[pIdx] = updatedPost;
  savePosts(next);
  return updatedPost;
}
