"use client";
import styles from "./styles.module.css";
import Link from "next/link";
import type { PostListItem } from "@/types/community";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

type Props = { post: PostListItem };

export default function PostCardList({ post }: Props) {
  const date = new Date(post.createdAt);
  const formattedDate = `${date.getFullYear()}. ${
    date.getMonth() + 1
  }. ${date.getDate()}`;

// 공동구매 게시글 상태
const renderStatus = (post: PostListItem) => {
  if (post.category === "GROUP_BUY") {
    if (post.status === "OPEN") {
      return <span className={styles.badgeBlue}>진행중</span>;
    } else {
      return <span className={styles.badgeGray}>마감</span>;
    }
  }
  return null; // GROUP_BUY가 아닌 경우 상태 뱃지 없음
};


  return (
    <div>
      <Link href={`/community/post?postId=${post.id}`} className={styles.card}>
        <div className={styles.thumbWrap}>
          <img
            className={styles.thumb}
            src={post.thumbnail || "/no-image.png"}
            alt={post.title}
          />
        </div>

        <div className={styles.body}>
          <div className={styles.badges}>
            {post.category === "GROUP_BUY" && (
              <span className={styles.badgePurple}>공구</span>
            )}
            <span className={styles.title}>
              {`${post.areaTag} ${post.title.replace(`${post.areaTag} `, "")}`}
            </span>
            <span className={styles.right}>
              {renderStatus(post)}
            </span>
          </div>


          <div className={styles.metaRow}>
            <span className={styles.metaDate}>{formattedDate}</span>
            <span className={styles.metaDot}>|</span>
            <span className={styles.metaRegion}>{post.areaTag}</span>
            <span className={styles.right}>
              <ChatBubbleOutlineRoundedIcon  fontSize="inherit" className={styles.chatIcon}/>
              <span>{post.commentCount}</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
