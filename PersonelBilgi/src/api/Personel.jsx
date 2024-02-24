import axios from "axios";
import Cookies from "js-cookie";

async function getAllPersonel() {
  try {
    const token = Cookies.get("user_token");
    const url = "http://localhost:8080/personel/all";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    return await axios.get(url, { headers: headers });
  } catch (error) {
    console.error("Error getting personel:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
}

async function getPersonel() {
  try {
    const token = Cookies.get("user_token");
    const url = `http://localhost:8080/personel/${id}`;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    return await axios.get(url, { headers: headers });
  } catch (error) {
    console.error("Error getting personel:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
}

export { getAllPersonel, getResource };

async function getProject(id) {
  try {
    const token = Cookies.get("user_token");
    const url = `http://localhost:8080/project/${id}`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return await axios.get(url, { headers: headers });
  } catch (error) {
    console.error("Error getting Project:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
}
export { getPersonel, getProject };

async function getResource(id) {
  try {
    const token = Cookies.get("user_token");
    const url = `http://localhost:8080/resourceFile/image/${id}`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return await axios.get(url, { headers: headers, responseType: "blob" });
  } catch (error) {
    console.error("Error getting Photo:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
}
