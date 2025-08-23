"use client";

import { useState } from "react";
import type { PostDetail } from "@/types/community";
import styles from "./communityPostDetail.module.css";

export default function CommunityPostDetail({ post }: { post: PostDetail }) {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = Array.isArray(post.images) ? post.images : [post.images];

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.container}>
      {/* 작성자/메타 정보 */}
      <div className={styles.header}>
        <div className={styles.profileCircle}></div>
        <div className={styles.authorInfo}>
          <div className={styles.author}>{post.authorNickname}</div>
          <div className={styles.meta}>
            {post.createdAt} · {post.areaTag}
          </div>
        </div>
        <span
          className={`${styles.badge} ${
            post.status === "OPEN" ? styles.badgeBlue : styles.badgeGray
          }`}
        >
          {post.status === "OPEN" ? "진행중" : "마감"}
        </span>
      </div>

      {/* 제목/본문 */}
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.content}>{post.content}</p>

      {/* 사진 영역 */}
      <div className={styles.imageGallery}>
        <div className={styles.imageRow}>
          {images.slice(0, 3).map((src, i, arr) => (
            <div key={i} className={styles.imageWrapper}>
              <img
                src={src}
                alt={`${post.title} ${i + 1}`}
                className={styles.mainImage}
                onClick={() => openModal(i)} 
              />
              {i === arr.length - 1 && images.length > arr.length && (
                <button
                  className={styles.moreBtn}
                  onClick={() => openModal(i)}
                >
                  +{images.length - arr.length} 더보기
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            {/* 좌우 네비게이션 */}
            <button className={styles.prevBtn} onClick={prevImage}>◀</button>
            <img
              src={images[currentIndex]}
              alt={`${post.title} ${currentIndex + 1}`}
              className={styles.previewImage}
            />
            <button className={styles.nextBtn} onClick={nextImage}>▶</button>
          </div>
        </div>
      )}

      {/* 하단 조회수/관심수 */}
      <div className={styles.footer}>
        <span>조회 {post.viewCount}</span>
      </div>
    </div>
  );
}
