"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../page.module.css";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";

const TAGS = ["공동구매", "1구역", "2구역", "3구역", "4구역"];

export default function WritePost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [imageDataUrl, setImageDataUrl] = useState("");

  const toggleTag = (t) =>
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageDataUrl(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  const submit = () => {
    if (!title.trim()) return alert("제목을 입력하세요.");
    const newPost = addPost({ title, body, tags, imageDataUrl });
    router.push(`/community/view?id=${newPost.id}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <div className={styles.headerInner}>
        <button className={styles.headerCancle} onClick={() => router.back()}>취소</button>
        <div className={styles.headerTitle}>글 쓰기</div>
        <button className={styles.headerPost} onClick={submit}>등록</button>
      </div>
      </div>

      <div className={styles.writeWrap}>
        <label className={styles.uploadBtn} aria-label="이미지 업로드">
          {imageDataUrl ? (
            <img src={imageDataUrl} alt="" style={{ width: 72, height: 72, borderRadius: 12, objectFit: "cover" }} />
          ) : (
            <AddAPhotoRoundedIcon />
          )}
          <input type="file" hidden accept="image/*" onChange={onFile} />
        </label>

        <input
          className={styles.input}
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className={styles.textarea}
          placeholder="내용을 입력하세요."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <div style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}>태그 선택</div>
        <div className={styles.tagRow}>
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => toggleTag(t)}
              className={`${styles.tagChip} ${tags.includes(t) ? styles.tagActive : ""}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      </div>
  );
}

