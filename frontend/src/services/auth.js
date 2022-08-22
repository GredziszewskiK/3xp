import api from "./api";
import TokenService from "./token";

const register = (email, name, lastname, sex, password, phone, dob) => {
  return api.post("auth/register/", { email, name, lastname, sex, password, phone, dob });
};

const login = (email, password) => {
  return api.post("/auth/login/", { email, password })
    .then((response) => {
      if (response.data.access) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.user : null;
};

const setPassword = (password) => {
  const user = getCurrentUser();
  let userid = user ? user.id : ''
  return api.post("/users/"+userid+"/set_password/", { password });
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  setPassword,
};

export default AuthService;