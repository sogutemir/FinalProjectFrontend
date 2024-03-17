import React, { useEffect, useState } from "react";
import { getAllPersonel, getResourcePhoto } from "../../api/Personel";

function Personels() {
  const [allPersonels, setAllPersonels] = useState([]);
  const [personels, setPersonels] = useState([]);
  const [resourceUrls, setResourceUrls] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState('');
  const [task, setTask] = useState('');
  const [unit, setUnit] = useState('');
  const [project, setProject] = useState('');
  const [name, setName] = useState('');

  const handleRouteDetail = (id) => {
    console.log(id);
    window.location.href = `http://localhost:5173/personal-detail/${id}`;
    console.log("id", id);
  };

  const handleQueryClick = () => {
    const filteredPersonnels = allPersonels.filter((personel) => {
      return (
          (personel.title ? personel.title.includes(title) : true) &&
          (personel.task ? personel.task.includes(task) : true) &&
          (personel.unit ? personel.unit.includes(unit) : true) &&
          (personel.project ? personel.project.includes(project) : true) &&
          (personel.name ? personel.name.includes(name) : true)
      );
    });

    setPersonels(filteredPersonnels);
  };

  useEffect(() => {
    const fetchAllPersonels = async () => {
      setIsLoading(true);
      try {
        const response = await getAllPersonel();
        if (response.status === 200) {
          setAllPersonels(response.data);
          setPersonels(response.data);

          const fetchPromises = response.data.map((personel) =>
              getResourcePhoto(personel.photoId)
                  .then((response) => ({
                    id: personel.id,
                    url: URL.createObjectURL(response.data),
                  }))
                  .catch((error) => ({ id: personel.id, url: "" }))
          );

          const results = await Promise.all(fetchPromises);
          const urls = results.reduce((acc, current) => {
            acc[current.id] = current.url;
            return acc;
          }, {});

          setResourceUrls(urls);

        } else {
          setError("Failed to load data from server");
        }
      } catch (error) {
        setError("An error occurred while fetching personel data");
        console.error("Error fetching personel", error);
      }
      setIsLoading(false);
    };

    fetchAllPersonels();
  }, []);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <>
        <div className="searchbox">
          <input type="text" placeholder="Isim Soyisim" onChange={e => setName(e.target.value)}/>
          <input type="text" placeholder="Unvan" onChange={e => setTitle(e.target.value)}/>
          <input type="text" placeholder="Görev" onChange={e => setTask(e.target.value)}/>
          <input type="text" placeholder="Birim" onChange={e => setUnit(e.target.value)}/>
          <input type="text" placeholder="Proje" onChange={e => setProject(e.target.value)}/>
          <button onClick={handleQueryClick}>Sorgula</button>
        </div>
        <table className="personel-table">
          <thead className="personel-thead">
          <tr className="personel-tr">
            <th className="personel-th"></th>
            <th className="personel-th"></th>
            <th className="personel-th"></th>
            <th className="personel-th"></th>
            <th className="personel-th"></th>
          </tr>
          </thead>
          <tbody>
          {personels.map((personel) => (
              <tr key={personel.id} className="personel-tr">
                <td className="personel-td">
                  {resourceUrls[personel.id] ? (
                      <img
                          src={resourceUrls[personel.id]}
                          alt={`${personel.name} ${personel.surname}`}
                          className="personel-img"
                      />
                  ) : (
                      <span>Loading...</span>
                  )}
                </td>
                <td className="personel-td">
                  {personel.name} {personel.surname}
                </td>
                <td className="personel-td">
                  {personel.teamName} {personel.teamName}
                </td>
                <td className="personel-td">{personel.position}</td>
                <td className="personel-td">
                  <button onClick={() => handleRouteDetail(personel.id)}>
                    More
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
        <div>

        </div>
      </>
  );
}

export default Personels;
