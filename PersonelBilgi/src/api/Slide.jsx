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

const getSlides = async () => {
  try {
    const url = `${API_BASE_URL}/slide/getAll`;
    return await axios.get(url, { headers: getHeaders() });
  } catch (error) {
    console.error("Error getting slides:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};

export { getSlides };
