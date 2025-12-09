import "./Home.css";
import HeaderPage from "../../components/Header/header.jsx";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu.jsx";
import { useState } from "react";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay.jsx";
import AppDownload from "../../components/AppDownload/AppDownload.jsx";

function Home() {

  const [category, setCategory] = useState("All");

  return (
    <>
      <HeaderPage />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </>
  )
}

export default Home