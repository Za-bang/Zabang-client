"use client";

import { RoomDetail } from "@/types/propertyPost";
import styles from "./propertyDetail.module.css";
import { useState, useEffect } from "react";
import { getRoomDetail } from "@/lib/api"; 

export default function PropertyPostDetail({ post }: { post: RoomDetail }) {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [room, setRoom] = useState<RoomDetail | null>(post ?? null);

  useEffect(() => {
    if (!post?.propertyId) return;
    (async () => {
      try {
        const data = await getRoomDetail(post.propertyId);
        setRoom(data);
      } catch (err) {
        console.error("매물 상세 조회 실패:", err);
      }
    })();
  }, [post?.propertyId]);

  const images = Array.isArray(room?.imagePath)
    ? room!.imagePath
    : [room?.imagePath || ""];

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

  if (!room) return <div>매물 정보를 불러오는 중...</div>;

  return (
    <div>
      {/* 사진 영역 */}
      <div className={styles.imageGallery}>
        <div className={styles.imageRow}>
          {images.slice(0, 3).map((src, i, arr) => (
            <div key={i} className={styles.imageWrapper}>
              <img
                src={src}
                alt={`${room.name} ${i + 1}`}
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
              alt={`${room.name} ${currentIndex + 1}`}
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
        <div className={styles.title}>{room.name}</div>
        <div className={styles.address}>
          {room.address} | {room.area}
        </div>
        <ul className={styles.detailList}>
          <li>보증금: {room.deposit}</li>
          <li>월세: {room.rentPrice}</li>
          <li>전용 면적: {room.wide}</li>
        </ul>
        <div className={styles.content}>
          <div className={styles.options}>옵션</div>
          <ul>
            {Object.entries(room.options)
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
