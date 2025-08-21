"use client";
import { useEffect, useRef } from "react";
import styles from "./styles.module.css";

export function KakaoMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!window.kakao?.maps) return;

    window.kakao.maps.load(() => {
      const center = new window.kakao.maps.LatLng(33.450701, 126.570667);
      const map = new window.kakao.maps.Map(mapRef.current, { center, level: 3 });
      new window.kakao.maps.Marker({ position: center }).setMap(map);
    });
  }, []);

  return <div ref={mapRef} className={styles.kakaoM} />;
}
