"use client";
import { useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export default function UploadImageButton() {
  const [image, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        overflowX: "auto",
        padding: "0.5rem 0",
      }}
    >
      {/* 숨겨진 파일 input */}
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {/* 카메라 아이콘 버튼 */}
      <IconButton
        onClick={() => fileInputRef.current?.click()}
        aria-label="upload picture"
        component="span"
        sx={{
          border: "1px solid #999",
          borderRadius: "8px",
          width: "3rem",
          height: "3rem",
        }}
      >
        <CameraAltIcon fontSize="large" />
      </IconButton>

      {/* 이미지 미리보기 */}
      {image.map((img, idx) => (
        <img
          key={idx}
          src={URL.createObjectURL(img)}
          alt="preview"
          style={{
            width: "4rem",
            height: "4rem",
            borderRadius: "8px",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}
