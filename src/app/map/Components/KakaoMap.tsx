"use client";
import { useEffect, useRef } from "react";
import styles from "./styles.module.css";

export function KakaoMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!window.kakao?.maps) return;

    window.kakao.maps.load(() => {
      const map = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(36.771665, 126.930165), 
        level: 4,
      });

      const zones = [
        {
          name: "1구역",
          lat: 36.771665,
          lng: 126.930165,
          radius: 150,
        },
        // {
        //   name: "2구역",
        //   lat: 36.7735,
        //   lng: 126.9325,
        //   radius: 250,
        // },
        // {
        //   name: "3구역",
        //   lat: 36.7695,
        //   lng: 126.927,
        //   radius: 200,
        // },
      ];

      zones.forEach((zone) => {
        const center = new window.kakao.maps.LatLng(zone.lat, zone.lng);

        const circle = new window.kakao.maps.Circle({
          center: center,
          radius: zone.radius,
          strokeWeight: 2,
          strokeColor: "#35528bff",
          strokeOpacity: 0.9,
          strokeStyle: "solid",
          fillColor: "#1b386bbb",
          fillOpacity: 0.15,
        });
        circle.setMap(map);

        const label = new window.kakao.maps.CustomOverlay({
          position: center,
          content: `
            <div style="
              font-size: clamp(1rem, 1.8vw, 1.3rem);
              font-weight: bold;
              padding: 4px 10px;
              border-radius: 6px;
              color: #000000ff;
              box-shargba(138, 137, 144, 1)2px 6px rgba(0,0,0,0.15);
            ">
              ${zone.name}
            </div>
          `,
          yAnchor: 1,
        });
        label.setMap(map);
      });
    });
  }, []);

  return <div ref={mapRef} className={styles.kakaoM} />;
}
