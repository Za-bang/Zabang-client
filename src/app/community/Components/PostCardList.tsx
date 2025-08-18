"use client";
import styles from "./page.module.css";
import Link from "next/link";
import type { Post } from "@/types/post";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

type Props = { post: Post };

export default function PostCardList({ post }: Props) {
  const commentCount = post.comments?.length ?? 0;

  const date = new Date(post.date);
  const formattedDate = `${date.getFullYear()}. ${
    date.getMonth() + 1
  }. ${date.getDate()}`;

  //공동구매 게시글 상태
  const renderStatus=(status: boolean)=> {
    if (status==post.purchaseType) {
      if (status)
        return <span className={styles.badgeBlue}>진행중</span>;
      }
      else
        return <span className={styles.badgeGray}>마감</span>;
  }

  return (
    <div>
      <Link href={`/posts/${post.id}`} className={styles.card}>
        <div className={styles.thumbWrap}>
          <img
            className={styles.thumb}
            src={post.image || "/no-image.png"}
            alt={post.title}
          />
        </div>

        <div className={styles.body}>
          <div className={styles.badges}>
            {post.purchaseType && (
              <span className={styles.badgePurple}>공구</span>
            )}
            <span className={styles.title}>
              {`${post.region} ${post.title.replace(`${post.region} `, "")}`}
            </span>
            <span className={styles.right}>
              {renderStatus(post.purchaseStatus)}
            </span>
          </div>

          <p className={styles.contents}>{post.contents}</p>

          <div className={styles.metaRow}>
            <span className={styles.metaDate}>{formattedDate}</span>
            <span className={styles.metaDot}>|</span>
            <span className={styles.metaRegion}>{post.region}</span>
            <span className={styles.right}>
              <ChatBubbleOutlineRoundedIcon  fontSize="inherit" className={styles.chatIcon}/>
              <span>{commentCount}</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
