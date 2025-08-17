"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../community.module.css";
import {
  getPostById,
  addComment,
  addReply,
  deletePost,
  deleteComment,
  deleteReply,
  reportComment,
  reportReply,
  reportPost, // ⬅ 게시글 신고
} from "../_store";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import BottomNav from "../../components/BottomNav";

export default function PostView() {
  const router = useRouter();
  const sp = useSearchParams();
  const id = sp.get("id") || "";

  const [post, setPost] = useState(() => getPostById(id));
  const [comment, setComment] = useState("");
  const inputRef = useRef(null);
  const endAnchorRef = useRef(null);

  // 대댓글 입력/토글
  const [replyOpen, setReplyOpen] = useState({}); // { [cid]: boolean }
  const [replyText, setReplyText] = useState({}); // { [cid]: string }

  // 더보기 메뉴 상태 (post | comment | reply)
  const [menu, setMenu] = useState({ type: null, cid: null, rid: null });

  // 변경 브로드캐스트 수신
  useEffect(() => {
    const onChange = () => setPost(getPostById(id));
    window.addEventListener("zabang:posts-changed", onChange);
    return () => window.removeEventListener("zabang:posts-changed", onChange);
  }, [id]);

  // 바깥 클릭 시 메뉴 닫기
  useEffect(() => {
    const close = () => setMenu({ type: null, cid: null, rid: null });
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  if (!post) {
    return (
      <>
        <div className={styles.detailHeader}>
          <div className={styles.detailHeaderIn}>
            <button onClick={() => router.back()} aria-label="뒤로가기">
              <ArrowBackIosNewRoundedIcon fontSize="small" />
            </button>
          </div>
        </div>
        <div className={styles.detailWrap}>
          <div className={styles.detailArticle}>존재하지 않는 게시글입니다.</div>
        </div>
        <BottomNav active="board" />
      </>
    );
  }

  /* ── 게시글 더보기 메뉴 ── */
  const openPostMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setMenu((m) => (m.type === "post" ? { type: null, cid: null, rid: null } : { type: "post", cid: null, rid: null }));
  };
  const onReportPost = () => {
    const updated = reportPost(post.id);
    if (updated) {
      setPost(updated);
      alert("신고가 접수되었습니다.");
    }
    setMenu({ type: null, cid: null, rid: null });
  };
  const onDeletePost = () => {
    if (!confirm("이 게시글을 삭제할까요?")) return;
    deletePost(post.id);
    router.replace("/community");
  };

  /* ── 상위 댓글 전송 ── */
  const submitComment = () => {
    const text = comment.trim();
    if (!text) return;
    const updated = addComment(id, { text, author: "익명" });
    if (updated) {
      setPost(updated);
      setComment("");
      inputRef.current?.focus();
      endAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };
  const onCommentKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitComment();
    }
  };

  /* ── 대댓글 ── */
  const toggleReply = (cid) => setReplyOpen((p) => ({ ...p, [cid]: !p[cid] }));
  const onReplyChange = (cid, val) => setReplyText((p) => ({ ...p, [cid]: val }));
  const submitReply = (cid) => {
    const text = (replyText[cid] || "").trim();
    if (!text) return;
    const updated = addReply(id, cid, { text, author: "익명" });
    if (updated) {
      setPost(updated);
      setReplyText((p) => ({ ...p, [cid]: "" }));
    }
  };

  /* ── 댓글/대댓글 메뉴 열기 ── */
  const openCommentMenu = (e, cid) => {
    e.stopPropagation();
    e.preventDefault();
    setMenu((m) =>
      m.type === "comment" && m.cid === cid ? { type: null, cid: null, rid: null } : { type: "comment", cid, rid: null }
    );
  };
  const openReplyMenu = (e, cid, rid) => {
    e.stopPropagation();
    e.preventDefault();
    setMenu((m) =>
      m.type === "reply" && m.cid === cid && m.rid === rid ? { type: null, cid: null, rid: null } : { type: "reply", cid, rid }
    );
  };

  /* ── 메뉴 액션: 신고/삭제 ── */
  const doReportComment = (cid) => {
    const updated = reportComment(id, cid);
    if (updated) {
      setPost(updated);
      alert("신고가 접수되었습니다.");
    }
    setMenu({ type: null, cid: null, rid: null });
  };
  const doDeleteComment = (cid) => {
    if (!confirm("이 댓글을 삭제할까요?")) return;
    const updated = deleteComment(id, cid);
    if (updated) setPost(updated);
    setMenu({ type: null, cid: null, rid: null });
  };
  const doReportReply = (cid, rid) => {
    const updated = reportReply(id, cid, rid);
    if (updated) {
      setPost(updated);
      alert("신고가 접수되었습니다.");
    }
    setMenu({ type: null, cid: null, rid: null });
  };
  const doDeleteReply = (cid, rid) => {
    if (!confirm("이 답글을 삭제할까요?")) return;
    const updated = deleteReply(id, cid, rid);
    if (updated) setPost(updated);
    setMenu({ type: null, cid: null, rid: null });
  };

  return (
    <>
      {/* 상단: 뒤로가기 + 점3개(신고/삭제) */}
      <div className={styles.detailHeader}>
        <div className={styles.detailHeaderIn}>
          <button onClick={() => router.back()} aria-label="뒤로가기">
            <ArrowBackIosNewRoundedIcon fontSize="small" />
          </button>
          <div style={{ flex: 1 }} />
          <div className={styles.cardActionsRight} onClick={(e) => e.stopPropagation()}>
            <button className={styles.iconGhost} onClick={openPostMenu} aria-label="더보기" title="더보기">
              <MoreHorizRoundedIcon fontSize="small" />
            </button>
            {menu.type === "post" && (
              <div className={styles.menu}>
                <button className={styles.menuItem} onClick={onReportPost}>
                  <FlagOutlinedIcon fontSize="small" /> 신고하기
                </button>
                <button className={styles.menuItemDanger} onClick={onDeletePost}>
                  <DeleteOutlineRoundedIcon fontSize="small" /> 삭제하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className={styles.detailWrap}>
        <article className={styles.detailArticle}>
          <div className={styles.detailAuthorRow}>
            <div className={styles.avatar} />
            <div>
              <div style={{ fontWeight: 700 }}>{post.author}</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                {post.date} · {post.region} · {post.type}
              </div>
            </div>
            <div style={{ flex: 1 }} />
            {post.status && <span className={styles.badge}>{post.status}</span>}
          </div>

          <h1 className={styles.detailTitle}>{post.title}</h1>
          <p className={styles.detailText}>{post.excerpt}</p>
          {post.image ? <img src={post.image} alt="" className={styles.detailImage} /> : null}
          <div className={styles.detailSubMeta}>댓글 {post.comments.length} · 조회 {post.views}</div>
        </article>

        {/* 댓글 + 대댓글 */}
        <section className={styles.commentWrap}>
          {post.comments.map((c) => (
            <div key={c.id} style={{ paddingBottom: 6 }}>
              <div className={styles.commentItem}>
                <div className={styles.avatar} />
                <div onClick={(e) => e.stopPropagation()}>
                  {/* 닉네임 줄 + 우측 아이콘 */}
                  <div className={styles.commentHeader}>
                    <div className={styles.commentMetaLeft}>
                      <span className={styles.commentName}>{c.author}</span>
                      <span className={styles.commentDate}>{c.date}</span>
                    </div>

                    <div className={styles.commentActionsRight}>
                      <button
                        className={`${styles.iconGhost} ${replyOpen[c.id] ? styles.iconPrimary : ""}`}
                        onClick={() => toggleReply(c.id)}
                        aria-label="답글"
                        title="답글"
                      >
                        <ReplyRoundedIcon fontSize="small" />
                      </button>
                      <button
                        className={styles.iconGhost}
                        onClick={(e) => openCommentMenu(e, c.id)}
                        aria-label="더보기"
                        title="더보기"
                      >
                        <MoreHorizRoundedIcon fontSize="small" />
                      </button>

                      {menu.type === "comment" && menu.cid === c.id && (
                        <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
                          <button className={styles.menuItem} onClick={() => doReportComment(c.id)}>
                            <FlagOutlinedIcon fontSize="small" /> 신고하기
                          </button>
                          <button className={styles.menuItemDanger} onClick={() => doDeleteComment(c.id)}>
                            <DeleteOutlineRoundedIcon fontSize="small" /> 삭제하기
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 본문 */}
                  <div className={styles.commentText}>{c.text}</div>

                  {/* 대댓글 리스트 */}
                  {c.replies?.length ? (
                    <div className={styles.replyList}>
                      {c.replies.map((r) => (
                        <div key={r.id} className={styles.replyItem}>
                          <div className={styles.replyAvatar} />
                          <div>
                            <div className={styles.replyTopRow}>
                              <div className={styles.replyName}>
                                {r.author}{" "}
                                <span className={styles.commentDate} style={{ marginLeft: 6 }}>
                                  {r.date}
                                </span>
                              </div>

                              <div className={styles.commentActionsRight}>
                                <button
                                  className={styles.iconGhost}
                                  onClick={(e) => openReplyMenu(e, c.id, r.id)}
                                  aria-label="더보기"
                                  title="더보기"
                                >
                                  <MoreHorizRoundedIcon fontSize="small" />
                                </button>

                                {menu.type === "reply" && menu.cid === c.id && menu.rid === r.id && (
                                  <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
                                    <button className={styles.menuItem} onClick={() => doReportReply(c.id, r.id)}>
                                      <FlagOutlinedIcon fontSize="small" /> 신고하기
                                    </button>
                                    <button className={styles.menuItemDanger} onClick={() => doDeleteReply(c.id, r.id)}>
                                      <DeleteOutlineRoundedIcon fontSize="small" /> 삭제하기
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className={styles.replyText}>{r.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {/* 대댓글 입력 */}
                  {replyOpen[c.id] ? (
                    <div className={styles.replyInputRow}>
                      <input
                        className={styles.replyInput}
                        placeholder="답글을 입력하세요. (Enter 전송)"
                        value={replyText[c.id] || ""}
                        onChange={(e) => onReplyChange(c.id, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            submitReply(c.id);
                          }
                        }}
                        maxLength={200}
                      />
                      <button
                        className={styles.replySendBtn}
                        onClick={() => submitReply(c.id)}
                        aria-label="답글 전송"
                        title="답글 전송"
                        disabled={!(replyText[c.id] || "").trim()}
                      >
                        <SendRoundedIcon fontSize="small" />
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
          <div ref={endAnchorRef} />
        </section>
      </div>

      {/* 상위 댓글 입력바 */}
      <div className={styles.replyBar}>
        <input
          ref={inputRef}
          className={styles.replyInput}
          placeholder="댓글을 입력하세요. (Enter 전송)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={onCommentKeyDown}
          maxLength={200}
        />
        <button
          onClick={submitComment}
          style={{ borderRadius: 10, border: "1px solid #e5e7eb", opacity: comment.trim() ? 1 : 0.5 }}
          aria-label="댓글 전송"
          title="댓글 전송"
          disabled={!comment.trim()}
        >
          <SendRoundedIcon />
        </button>
      </div>

      <BottomNav active="board" />
    </>
  );
}
