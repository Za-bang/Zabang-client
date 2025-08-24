"use client";

import { RoomDetail } from "@/types/propertyPost";
import styles from "./propertyDetail.module.css";
import { useState } from "react";

export default function PropertyPostDetail({ post }: { post: RoomDetail }) {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = Array.isArray(post.imagePath)
    ? post.imagePath
    : [post.imagePath];

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

  const optionLabels: Record<string, string> = {
    airConditioner: "에어컨",
    refrigerator: "냉장고",
    washingMachine: "세탁기",
    dryer: "건조기",
    pet: "반려동물",
    bed: "침대",
    microwave: "전자레인지",
    balcony: "발코니",
    fireProtection: "소방시설",
    gas: "가스",
    wifi: "와이파이",
    cctv: "CCTV",
    parkingLot: "주차장",
  };

  return (
    <div>
      {/* 사진 영역 */}
      <div className={styles.imageGallery}>
        <div className={styles.imageRow}>
          {images.slice(0, 3).map((src, i, arr) => (
            <div key={i} className={styles.imageWrapper}>
              <img
                src={src}
                alt={`${post.name} ${i + 1}`}
                className={styles.mainImage}
                onClick={() => openModal(i)}
              />
              {i === arr.length - 1 && images.length > arr.length && (
                <button className={styles.moreBtn} onClick={() => openModal(i)}>
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
            <button className={styles.prevBtn} onClick={prevImage}>
              ◀
            </button>
            <img
              src={images[currentIndex]}
              alt={`${post.name} ${currentIndex + 1}`}
              className={styles.previewImage}
            />
            <button className={styles.nextBtn} onClick={nextImage}>
              ▶
            </button>
          </div>
        </div>
      )}

      {/* 매물 정보 */}
      <section className={styles.infoSection}>
        <div className={styles.title}>{post.name}</div>
        <div className={styles.address}>
          {post.address} | {post.area}
        </div>
        <ul className={styles.detailList}>
          <li>보증금: {post.deposit}</li>
          <li>월세: {post.rentPrice}</li>
          <li>전용 면적: {post.wide}</li>
        </ul>
        <div className={styles.content}>
          <div className={styles.options}>옵션</div>
          <ul>
            {Object.entries(post.options)
              .filter(([_, value]) => value === true)
              .map(([key]) => (
                <li key={key}>{optionLabels[key] || key} </li>
              ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
