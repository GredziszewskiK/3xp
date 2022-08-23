class TokenService {
    getLocalRefreshToken() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.refresh;
    }
    getLocalAccessToken() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.access;
    }
    updateLocalAccessToken(token) {
      let user = JSON.parse(localStorage.getItem("user"));
      user.access = token;
      localStorage.setItem("user", JSON.stringify(user));
    }
    getUser() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.user;
    }
    setUser(user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    removeUser() {
      localStorage.removeItem("user");
    }
  }
  export default new TokenService();