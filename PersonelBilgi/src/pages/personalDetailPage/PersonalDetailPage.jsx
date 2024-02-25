import React from "react";
import Personel from "../../components/personel/Personel";
import Education from "../../components/education/Education";
import PersonelFile from "../../components/personelFile/PersonelFile";
import Project from "../../components/project/Project";
import { useParams } from "react-router-dom";

function PersonalDetailPage() {
  let { id } = useParams();

  return (
    <>
      <Personel personelId={id} />
      <PersonelFile personelId={id} />
      <Education personelId={id} />
      <Project personelId={id} />
    </>
  );
}

export default PersonalDetailPage;
