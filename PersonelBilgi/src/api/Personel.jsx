import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8080";

const getHeaders = () => {
  const token = Cookies.get("user_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

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

const getActivitiesByPersonelId = async (personelId) => {
  try {
    const url = `${API_BASE_URL}/activity/getByPersonelId${personelId}`;
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

export {
  getAllPersonel,
  getPersonelById,
  getResourcePhoto,
  getFileByPersonelId,
  getProjectsByPersonelId,
  getActivitiesByPersonelId,
  getEducationByPersonelId,
  getProjectByPersonelId,
};
