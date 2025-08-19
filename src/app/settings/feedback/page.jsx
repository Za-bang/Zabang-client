"use client";

import { useRef, useState } from "react";
import styles from "./feedback.module.css";
import { addFeedback } from "./_store";
import { useRouter } from "next/navigation";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";

export default function FeedbackPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState("");
  const fileRef = useRef(null);

  const onPick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setFileData(reader.result);
    reader.readAsDataURL(file);
  };

  const save = () => {
    if (!title.trim() || !body.trim()) {
      alert("제목과 건의내용을 입력해주세요.");
      return;
    }
    addFeedback({
      id: crypto.randomUUID(),
      title: title.trim(),
      body: body.trim(),
      fileName,
      fileData,
      createdAt: new Date().toISOString(),
    });
    alert("건의가 저장되었습니다. 감사합니다!");
    router.back();
  };

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <button className={styles.iconBtn} onClick={() => router.back()} aria-label="뒤로가기">
          <ArrowBackIosNewRoundedIcon fontSize="small" />
        </button>
        <div className={styles.title}>건의하기</div>
        <div style={{ width: 36 }} />
      </div>

      <div className={styles.inner}>
        <label className={styles.label}>제목</label>
        <input
          className={styles.input}
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className={styles.label}>건의내용</label>
        <textarea
          className={styles.textarea}
          placeholder="건의내용을 입력해주세요."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <label className={styles.label}>첨부파일</label>
        <div className={styles.attachRow}>
          <input className={styles.input} placeholder="파일을 첨부해주세요." readOnly value={fileName} />
          <button className={styles.attachBtn} onClick={() => fileRef.current?.click()}>
            <UploadFileRoundedIcon fontSize="small" /> 파일 선택
          </button>
          <input ref={fileRef} type="file" hidden onChange={onPick} />
        </div>
      </div>

      <div className={styles.bottomBar}>
        <button className={styles.ghostBtn} onClick={() => router.back()}>취소</button>
        <button className={styles.primaryBtn} onClick={save}>저장</button>
      </div>
    </div>
  );
}
