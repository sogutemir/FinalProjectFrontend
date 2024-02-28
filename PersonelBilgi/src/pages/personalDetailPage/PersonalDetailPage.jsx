import React from "react";
import Personel from "../../components/personel/Personel";
import Education from "../../components/education/Education";
import PersonelFile from "../../components/personelFile/PersonelFile";
import Experience from "../../components/experience/Experience";
import Project from "../../components/project/Project";
import { useParams } from "react-router-dom";
import Activity from "../../components/activity/Activity";

function PersonalDetailPage() {
  let { id } = useParams();

  return (
    <>
      <Personel personelId={id} />
      <Project personelId={id} />
      <Education personelId={id} />
      <Experience personelId={id} />
      {/* <Activity personelId={id} /> */}
      <PersonelFile personelId={id} />
    </>
  );
}

export default PersonalDetailPage;
