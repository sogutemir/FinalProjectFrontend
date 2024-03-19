import React, { useEffect } from "react";
import Personels from "./Personels";
import Slide from "./Slide";
import PersonelCard from "../../components/personel/PersonelCard.jsx";

function MainPage() {
  return (
    <>
      <Personels 
        isContactPage={false}
      />
      <Slide />
      <PersonelCard />
    </>
  );
}

export default MainPage;
