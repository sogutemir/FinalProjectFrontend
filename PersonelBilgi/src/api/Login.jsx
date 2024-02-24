import axios from "axios";

const loginUser = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:8080/user/login", {
      username,
      password,
    });
    console.log("Login successful:", response.data);
    const token = response.data;

    document.cookie = `user_token=${token}; path=/; max-age=86400; Secure; SameSite=Strict`;
    return true;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};

export { loginUser };
