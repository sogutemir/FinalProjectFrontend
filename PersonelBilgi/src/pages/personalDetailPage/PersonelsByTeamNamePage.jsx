import React from "react";
import { useParams } from "react-router-dom";
import SuperUserPersonels from "../../components/personel/PersonelsByTeamName";

function PersonelsByTeamNamePage() {
  let { teamName } = useParams();

  return (
    <>
      <SuperUserPersonels teamName={teamName} />
    </>
  );
}

export default PersonelsByTeamNamePage;
