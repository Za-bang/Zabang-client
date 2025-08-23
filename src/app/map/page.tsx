"use client";
import styles from "./page.module.css";
import BottomNav from "@/Components/BottomNav";
import Header from "@/Components/Header";
import PropertyPreview from "./Components/PropertyPreview";
import dynamic from "next/dynamic";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import SearchBar from "@/app/search/SearchBar";
import { MOCK_PROPERTY_POST } from "@/data/demoProperties";

const KMap = dynamic(
  () => import("./Components/KakaoMap").then((mod) => mod.KakaoMap),
  {
    ssr: false,
  }
);

export default function MapPage() {
  const router = useRouter();
  const handlGoToSearchPage = () => {
    router.push("../search");
  };
  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.main}>
        <KMap />
        <div className={styles.search}>
          <IconButton onClick={handlGoToSearchPage}>
            <FilterAltIcon fontSize="large" />
          </IconButton>
          <div className={styles.searchBox}>
            <SearchBar />
          </div>
        </div>
        <div className={styles.propertyPrev}>
          {MOCK_PROPERTY_POST.map((item) => (
            <PropertyPreview key={item.propertyId} data={item} />
          ))}
        </div>
      </div>

      <BottomNav active="map" />
    </div>
  );
}
