import axiosInstance from "../../api/axiosApi";

// const baseURL = "https://pocketstack.herokuapp.com/";

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

export const deleteAnswer = (answerId) => {
  return async () => {
    try {
      await axiosInstance.delete(`/answers/${answerId}/edit/`);
    } catch (err) {
      throw err;
    }
  };
};
