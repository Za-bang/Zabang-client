"use client";
import styles from "./page.module.css";
import Header from "@/Components/Header";
import BottomNav from "@/Components/BottomNav";
import { useState } from "react";
import UploadImageButton from "./UploadImgBtn";
import { FILTERS } from "@/types/constants";

export default function WritePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      alert("제목과 내용을 입력하세요.");
      return;
    }

    const payload = {
      title,
      content,
      tags,
    };

    try {
      const res = await fetch("http://localhost:8000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("등록 실패");

      const data = await res.json();
      alert("등록 성공!");
      console.log(data);
    } catch (err) {
      console.error(err);
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.main}>
        <div className={styles.title}>
          <button className={styles.subBtn} onClick={() => history.back()}>취소</button>
          <div className={styles.titleName}>글쓰기</div>
          <button className={styles.subBtn} onClick={handleSubmit}>등록</button>
        </div>

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
        <div className={styles.uploadImg}>
          <UploadImageButton />
        </div>
        {/* 태그 선택 */}
        <div>
          <div className={styles.tagTitle}>태그 선택</div>
          <div>
            {FILTERS.map((t, idx) => idx === 0 ? null : ( 
              <button
                key={t}
                onClick={() => toggleTag(t)}
                className={`${styles.tag} ${
                  tags.includes(t) ? styles.tagActive : ""
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
