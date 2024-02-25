import React from "react";
import Personel from "../../components/personel/Personel";
import Education from "../../components/education/Education";
import PersonelFile from "../../components/personelFile/PersonelFile";
function PersonalDetailPage() {
  return (
    <>
      <Personel />
      <PersonelFile personnelId={1} />

      <Education personnelId={1} />
    </>
  );
}

export default PersonalDetailPage;
