// eslint-disable-next-line no-unused-vars
import React from "react";
import PersonelInfo from "../../components/personel/PersonalInfo.jsx";
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
      <PersonelInfo 
        personelId={id}
        isPersonels={true}
      />
      <Project
        personelId={id}
        isPersonels={true}
      />
      <Education 
        personelId={id}
        isPersonels={true}
      />
      <Experience
        personelId={id}
        isPersonels={true}
      />
      <Activity
        personelId={id}
        isPersonels={true}
      />
      <PersonelFile 
        personelId={id}
        isPersonels={true}
      />
    </>
  );
}

export default PersonalDetailPage;
