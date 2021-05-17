import axios from "axios";

const baseURL = "https://pocketstack.herokuapp.com/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: "Token b12f8801a27589eff33f385798d7dfbf8421ff18",
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export const createAnswer = (qid, body) => {
  return async () => {
    try {
      await axiosInstance.post(`/questions/${qid}/answer/create/`, {
        body: body,
      });
    } catch (err) {
      throw err;
    }
    //any async code here
  };
};

export const editAnswer = (answerId, body) => {
  return async () => {
    try {
      await axiosInstance.put(`/answers/${answerId}/edit/`, {
        body: body,
      });
    } catch (err) {
      throw err;
    }
  };
};
