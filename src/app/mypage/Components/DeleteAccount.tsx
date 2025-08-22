"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

export default function DeleteAccount() {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const handleDeleteAccount = () => {
    if (busy) return;

    if (!confirm("정말 탈퇴하시겠습니까? 되돌릴 수 없습니다.")) return;

    setBusy(true);

    // 실제 탈퇴 API 요청 자리
    // await api.deleteUserMe();

    alert("회원탈퇴 처리되었습니다.");

    setBusy(false);
    router.push("/"); 
  };

  return (
    <div>
      <button
        className={styles.deleteAccountBtn}
        onClick={handleDeleteAccount}
        disabled={busy}
      >
        회원탈퇴
      </button>
    </div>
  );
}
