import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

class AuthService {
  login(username, password) {
    console.log(username);
    return axios
      .post(API_URL + "login", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
