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
  const [areaTag, setAreaTag] = useState<"1구역" | "2구역" | "3구역" | "4구역">(
    "1구역"
  );
  const [category, setCategory] = useState<"FREE" | "GROUP_BUY">("FREE");
  const [status, setStatus] = useState<"OPEN" | "CLOSED">("OPEN");
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
      status,
    };

    try {
      const res = await fetch("BASE_URL/posts", {
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
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.textTitle}
        />

        <textarea
          className={styles.textArea}
          placeholder="내용을 입력하세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className={styles.uploadImg}>
          <UploadImageButton onUpload={(urls) => setImageUrls(urls)} />
        </div>

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

{category === "GROUP_BUY" && (
  <div className={styles.statusRow}>
    <span className={styles.tagTitle}>공동구매 상태</span>
    <div className={styles.radioGroup}>
      <label>
        <input
          type="radio"
          name="status"
          value="OPEN"
          checked={status === "OPEN"}
          onChange={() => setStatus("OPEN")}
        />
        진행중
      </label>
      <label>
        <input
          type="radio"
          name="status"
          value="CLOSED"
          checked={status === "CLOSED"}
          onChange={() => setStatus("CLOSED")}
        />
        마감
      </label>
    </div>
  </div>
)}


        <div>
          <div className={styles.tagTitle}>구역 선택</div>
          <div>
            {FILTERS.map((t, idx) =>
              idx < 2 ? null : (
                <button
                  key={t}
                  onClick={() => setAreaTag(t as any)}
                  className={`${styles.tag} ${
                    areaTag === t ? styles.tagActive : ""
                  }`}
                >
                  {t}
                </button>
              )
            )}
          </div>
        </div>

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
