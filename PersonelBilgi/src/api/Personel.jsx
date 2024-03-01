import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8080";

const getHeaders = (isMultipart = false) => {
  const token = Cookies.get("user_token");
  if (isMultipart) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

//#region GetMethods
const getAllPersonel = async () => {
  try {
    const url = `${API_BASE_URL}/personel/all`;
    return await axios.get(url, { headers: getHeaders() });
  } catch (error) {
    console.error("Error getting all personel:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};

const getPersonelById = async (id) => {
  try {
    const url = `${API_BASE_URL}/personel/${id}`;
    return await axios.get(url, { headers: getHeaders() });
  } catch (error) {
    console.error("Error getting personel:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};

const getProjectByPersonelId = async (id) => {
  try {
    const url = `${API_BASE_URL}/project/getByPersonelId/${id}`;
    return await axios.get(url, { headers: getHeaders() });
  } catch (error) {
    console.error("Error getting project:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};

const getResourcePhoto = async (id) => {
  try {
    const url = `${API_BASE_URL}/resourceFile/image/${id}`;
    return await axios.get(url, {
      headers: getHeaders(),
      responseType: "blob",
    });
  } catch (error) {
    console.error("Error getting photo:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};

const getFileByPersonelId = async (personelId) => {
  try {
    const url = `${API_BASE_URL}/file/getByPersonelId/${personelId}`;
    return await axios.get(url, { headers: getHeaders() });
  } catch (error) {
    console.error("Error getting files by personel ID:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};

const getProjectsByPersonelId = async (personelId) => {
  try {
    const url = `${API_BASE_URL}/project/${personelId}`;
    return await axios.get(url, { headers: getHeaders() });
  } catch (error) {
    console.error("Error getting projects by personel ID:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};

const getActivityByPersonelId = async (personelId) => {
  try {
    const url = `${API_BASE_URL}/activity/getByPersonelId/${personelId}`;
    return await axios.get(url, { headers: getHeaders() });
  } catch (error) {
    console.error("Error getting activities by personel ID:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};

const getEducationByPersonelId = async (personelId) => {
  try {
    const url = `${API_BASE_URL}/education/getByPersonelId/${personelId}`;
    return await axios.get(url, { headers: getHeaders() });
  } catch (error) {
    console.error("Error getting education by personel ID:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};

const getExperienceByPersonelId = async (personelId) => {
  try {
    const url = `${API_BASE_URL}/experience/getByPersonelId/${personelId}`;
    return await axios.get(url, { headers: getHeaders() });
  } catch (error) {
    console.error("Error getting education by personel ID:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};
//#endregion

//#region  AddMethods

const addFile = async (file, section, personelId) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("section", section);
    formData.append("personelId", personelId);

    const url = `${API_BASE_URL}/file/add`;
    return await axios.post(url, formData, { headers: getHeaders(true) });
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};

const addActivity = async (
  file,
  activityName,
  description,
  eventType,
  link,
  personelId,
) => {
  const url = `${API_BASE_URL}/activity/add`;
  const formData = new FormData();

  formData.append("file", file);
  formData.append("activityName", activityName);
  formData.append("description", description);
  formData.append("eventType", eventType);
  formData.append("link", link);
  formData.append("personelId", personelId);

  try {
    const response = await axios.post(url, formData, {
      headers: getHeaders(true),
    });

    if (response.status === 200) {
      console.log("File uploaded successfully");
      return response.data;
    } else {
      console.error("Failed to upload file");
      return null;
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
    return null;
  }
};

const addProject = async (projectData) => {
  const token = Cookies.get("user_token");
  const formData = new FormData();

  formData.append("projectName", projectData.projectName);
  formData.append("teamName", projectData.teamName);
  formData.append("projectTask", projectData.projectTask);
  formData.append("projectStartDate", projectData.projectStartDate);
  formData.append("projectFinishDate", projectData.projectFinishDate);
  formData.append("projectStatus", projectData.projectStatus);
  formData.append("personelId", projectData.personelId);

  try {
    const response = await axios.post(`${API_BASE_URL}/project/add`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error adding project:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const addExperience = async (experienceData) => {
  const token = Cookies.get("user_token");
  const formData = new FormData();

  formData.append("institutionName", experienceData.institutionName);
  formData.append("workType", experienceData.workType);
  formData.append("jobStartDate", experienceData.jobStartDate);
  formData.append("jobEndDate", experienceData.jobEndDate);
  formData.append("workPosition", experienceData.workPosition);
  formData.append("workDescription", experienceData.workDescription);
  formData.append("personelId", experienceData.personelId);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/experience/add`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding experience:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const addEducation = async (educationData) => {
  const token = Cookies.get("user_token");
  const formData = new FormData();

  formData.append("educationType", educationData.educationType);
  formData.append("universityName", educationData.universityName);
  formData.append("educationStartDate", educationData.educationStartDate);
  formData.append("educationEndDate", educationData.educationEndDate);
  formData.append("additionalInformation", educationData.additionalInformation);
  formData.append("personelId", educationData.personelId);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/education/add`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding education:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

//#endregion

export {
  ///
  ///get methods
  ///
  getAllPersonel,
  getPersonelById,
  getResourcePhoto,
  getFileByPersonelId,
  getProjectsByPersonelId,
  getActivityByPersonelId,
  getEducationByPersonelId,
  getProjectByPersonelId,
  getExperienceByPersonelId,

  ///
  ///add methods
  ///
  addFile,
  addActivity,
  addProject,
  addExperience,
  addEducation,
};
