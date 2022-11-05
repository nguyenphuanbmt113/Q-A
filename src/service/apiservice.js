import axios from "./customaxios";
const getAllUser = () => {
  return axios.get("api/v1/participant/all");
};
const getUserWithPaginate = (page) => {
  return axios.get(`api/v1/participant?page=${page}&limit=3`);
};
const deleteUserWithId = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
};
const postCreateUser = (email, password, username, role, img) => {
  const form = new FormData();
  form.append("email", email);
  form.append("password", password);
  form.append("username", username);
  form.append("role", role);
  form.append("userImage", img);
  return axios.post("api/v1/participant", form);
};
const putUpdateUser = (id, username, role, img) => {
  const form = new FormData();
  form.append("id", id);
  form.append("username", username);
  form.append("role", role);
  form.append("userImage", img);
  return axios.put("api/v1/participant", form);
};
const loginUser = (email, password) => {
  return axios.post(`api/v1/login`, {
    email,
    password,
  });
};
const postRegister = (email, username, password) => {
  return axios.post("api/v1/register", {
    email,
    username,
    password,
  });
};
const logOutUser = (email, refresh_token) => {
  return axios.post("api/v1/logout", {
    email,
    refresh_token,
  });
};
const postUpdateProfile = (username, userImage) => {
  const form = new FormData();
  form.append("username", username);
  form.append("userImage", userImage);
  return axios.post("api/v1/profile", form);
};
const postChangePassword = (current_password, new_password) => {
  return axios.post("api/v1/change-password", {
    current_password,
    new_password,
  });
};
const getHistory = () => {
  return axios.get("api/v1/history");
};
const getQuizWithQA = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};
const getAllQuizForAdmin = () => {
  return axios.get("api/v1/quiz/all");
};
const getQuizByUser = () => {
  return axios.get("/api/v1/quiz-by-participant");
};
const getDetailQuiz = (id) => {
  return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`);
};
const postSubmit = (data) => {
  return axios.post(`api/v1/quiz-submit`, { ...data });
};
const postCreateNewQuiz = (description, name, difficulty, image) => {
  const form = new FormData();
  form.append("description", description);
  form.append("name", name);
  form.append("difficulty", difficulty);
  form.append("quizImage", image);
  return axios.post("api/v1/quiz", form);
};
const deleteQuizWithid = (quizid) => {
  return axios.delete(`api/v1/quiz/${quizid}`);
};
const putUpdateQuizWithId = (id, name, difficulty, quizImage) => {
  const form = new FormData();
  form.append("id", id);
  form.append("name", name);
  form.append("difficulty", difficulty);
  form.append("quizImage", quizImage);
  return axios.put("api/v1/quiz", form);
};
const postCreateQuestion = (quiz_id, description, questionImage) => {
  const form = new FormData();
  form.append("quiz_id", quiz_id);
  form.append("description", description);
  form.append("questionImage", questionImage);
  return axios.post("api/v1/question", form);
};
const postNewAnswerForQuestion = (description, correct_answer, question_id) => {
  return axios.post("/api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
};
const getAllQA = () => {
  return axios.get(`api/v1/question/all`);
};
const getQAByQuiz = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};
const postAssignQuiz = (quizId, userId) => {
  return axios.post("api/v1/quiz-assign-to-user", {
    quizId,
    userId,
  });
};
const deleteQuestion = (id, quizId) => {
  return axios.delete("api/v1/question", { data: { id, quizId } });
};
const putUpdateQuestion = (id, quiz_id, description, questionImage) => {
  const form = new FormData();
  form.append("id", id);
  form.append("quiz_id", quiz_id);
  form.append("description", description);
  form.append("questionImage", questionImage);
  return axios.put("api/v1/question", form);
};
const postAssignToUser = (quizId, userId) => {
  return axios.post("api/v1/quiz-assign-to-user", {
    quizId,
    userId,
  });
};
const postUpsertWithAQA = (data) => {
  return axios.post("api/v1/quiz-upsert-qa", { ...data });
};
export {
  getAllUser,
  getUserWithPaginate,
  deleteUserWithId,
  postCreateUser,
  putUpdateUser,
  loginUser,
  logOutUser,
  postChangePassword,
  getHistory,
  getQuizWithQA,
  postUpdateProfile,
  postRegister,
  getAllQuizForAdmin,
  getQuizByUser,
  getDetailQuiz,
  postSubmit,
  postCreateNewQuiz,
  deleteQuizWithid,
  putUpdateQuizWithId,
  postCreateQuestion,
  postNewAnswerForQuestion,
  postAssignQuiz,
  deleteQuestion,
  putUpdateQuestion,
  getAllQA,
  getQAByQuiz,
  postAssignToUser,
  postUpsertWithAQA,
};
