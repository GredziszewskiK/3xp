import api from "./api";
import Auth from "./auth"

const getProfile = () => {
  const user = Auth.getCurrentUser();
  let userid = user ? user.id : ''
  return api.get("/users/"+userid+'/')
  .then((response) =>{
    return response.data;
  });
};

const editUser = (email, name, lastname, sex, phone, dob) => {
  const user = Auth.getCurrentUser();
  let userid = user ? user.id : '';
  return api.patch("/users/"+userid+"/", { email, name, lastname, sex, phone, dob });
};

const getProjects = () => {
  return api.get("/projects/");
};

const getProject = (id) => {
  return api.get("/projects/"+id+"/");
};

const craeteProject = (name, description, start_date, end_date, users_list) => {
  const comments_list = []
  return api.post("/projects/", { name, description, start_date, end_date, users_list, comments_list });
};

const deleteProject = (id) => {
  return api.delete("/projects/"+id+"/");
}

const editProject = (id, name, description, start_date, end_date, users_list) => {
  const comments_list = []
  return api.patch("/projects/"+id+"/", { name, description, start_date, end_date, users_list, comments_list });
}

const getUsers = () => {
  return api.get("/users/");
};

const addComment = (project, description) => {
  return api.post("/projects/"+project+"/add_comment/", {description});
};

const UserService = {
  getProfile,
  editUser,
  getProjects,
  getUsers,
  craeteProject,
  getProject,
  deleteProject,
  editProject,
  addComment,
};
export default UserService;