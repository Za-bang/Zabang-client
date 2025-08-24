"use client";
import styles from "./page.module.css";
import HeaderBack from "@/Components/HeaderBack";
import BottomNav from "@/Components/BottomNav";
import { useState } from "react";
import UploadImageButton from "./UploadImgBtn";
import { FILTERS } from "@/types/constants";
import type { PostCreateRequest } from "@/types/community";

export default function WritePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [areaTag, setAreaTag] = useState<"1구역" | "2구역" | "3구역" | "4구역">("1구역");
  const [category, setCategory] = useState<"FREE" | "GROUP_BUY">("FREE");
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleSubmit = async () => {
    if (!title || !content) {
      alert("제목과 내용을 입력하세요.");
      return;
    }

    const payload: PostCreateRequest = {
      userId: 1, // TODO: 로그인 유저 정보로 교체
      title,
      content,
      areaTag,
      category,
      imageUrls,
    };

    try {
      const res = await fetch("http://localhost:8000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("등록 실패");

      const data = await res.json();
      alert("등록 성공!");
      console.log("등록된 글:", data);
    } catch (err) {
      console.error(err);
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <div className={styles.page}>
      <HeaderBack />
      <div className={styles.main}>
        {/* 제목 */}
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.textTitle}
        />

        {/* 내용 */}
        <textarea
          className={styles.textArea}
          placeholder="내용을 입력하세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* 이미지 업로드 */}
        <div className={styles.uploadImg}>
          <UploadImageButton onUpload={(urls) => setImageUrls(urls)} />
        </div>

        {/* 카테고리 선택 */}
        <div className={styles.section}>
          <label>
            <input
              type="radio"
              name="category"
              value="FREE"
              checked={category === "FREE"}
              onChange={() => setCategory("FREE")}
            />
            자유글
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="GROUP_BUY"
              checked={category === "GROUP_BUY"}
              onChange={() => setCategory("GROUP_BUY")}
            />
            공동구매
          </label>
        </div>

        {/* 구역 선택 */}
        <div>
          <div className={styles.tagTitle}>구역 선택</div>
          <div>
            {FILTERS.map((t, idx) =>
              idx === 0 ? null : (
                <button
                  key={t}
                  onClick={() => setAreaTag(t as any)}
                  className={`${styles.tag} ${areaTag === t ? styles.tagActive : ""}`}
                >
                  {t}
                </button>
              )
            )}
          </div>
        </div>

        {/* 등록 버튼 */}
        <div className={styles.btnGroup}>
          <button className={styles.submitBtn} onClick={handleSubmit}>
            등록하기
          </button>
        </div>
      </div>

      <BottomNav active="board" />
    </div>
  );
}
