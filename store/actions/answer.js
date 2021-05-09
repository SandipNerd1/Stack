import axios from "axios";

const baseURL = "https://pocketstack.herokuapp.com/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: "Token 4461f2aab8667ea9eee1997604623a8df8949e1f",
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

export const upvoteAnswer = (answerId) => {
  return async () => {
    try {
      await axiosInstance.put(`/answers/${answerId}/upvote/`);
    } catch (err) {
      throw err;
    }
  };
};

export const downvoteAnswer = (answerId) => {
  return async () => {
    try {
      await axiosInstance.put(`/answers/${answerId}/downvote/`);
    } catch (err) {
      throw err;
    }
  };
};
