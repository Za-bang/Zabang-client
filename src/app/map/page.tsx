"use client";
import styles from "./page.module.css";
import BottomNav from "@/Components/BottomNav";
import Header from "@/Components/Header";
import PropertyPreview from "./Components/PropertyPreview";
import dynamic from "next/dynamic";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
// import { MOCK_PROPERTY_POST, MOCK_PROPERTY_AI, MOCK_ROOM_DETAILS } from "@/data/demoProperties";
import { useEffect, useState } from "react";
import { getRoomList } from "@/lib/api";   

import type { RoomDetail } from "@/types/propertyPost";

const KMap = dynamic(
  () => import("./Components/KakaoMap").then((mod) => mod.KakaoMap),
  { ssr: false }
);

export default function MapPage() {
  const router = useRouter();
  const handlGoToSearchPage = () => {
    router.push("../search");
  };

  const [rooms, setRooms] = useState<RoomDetail[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await getRoomList();
        setRooms(data);
      } catch (err) {
        console.error(err);
        // setRooms(MOCK_ROOM_DETAILS); // 🔹 더미데이터 fallback (주석 유지)
      }
    })();
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.main}>
        <KMap />
        <div className={styles.search}>
          <IconButton onClick={handlGoToSearchPage}>
            <FilterAltIcon fontSize="large" />
          </IconButton>
        </div>

        <div className={styles.propertyPrev}>
          {rooms.map((room) => (
            <PropertyPreview key={room.propertyId} data={room} />
          ))}

          {/* 
          {MOCK_PROPERTY_POST.map((item) => {
            const aiResult = MOCK_PROPERTY_AI.find((ai) => ai.propertyId === item.propertyId);
            const roomDetail = MOCK_ROOM_DETAILS.find((room) => room.propertyId === item.propertyId);
            if (!roomDetail) return null;
            return <PropertyPreview key={item.propertyId} data={roomDetail} reviewAI={aiResult} />;
          })}
          */}
        </div>
      </div>
      <BottomNav active="map" />
    </div>
  );
}
