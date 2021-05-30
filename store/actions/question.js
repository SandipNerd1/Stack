import axiosInstance from "../../api/axiosApi";

// export const CREATE_QUESTION = "CREATE_QUESTION";
export const SET_QUESTIONS = "SET_QUESTIONS";
export const SET_QUESTION_DETAIL = "SET_QUESTION_DETAIL";
export const SET_FILTERED_QUESTIONS = "SET_FILTERED_QUESTIONS";
export const SEARCH_QUESTIONS = "SEARCH_QUESTIONS";
export const UPVOTE_QUESTION = "UPVOTE_QUESTION";
export const DOWNVOTE_QUESTION = "DOWNVOTE_QUESTION";

// const baseURL = "https://pocketstack.herokuapp.com/";

export const fetchQuestions = () => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get("/questions/");
      if (!response.status === 200) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.data;
      dispatch({ type: SET_QUESTIONS, questions: resData });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchQuestionDetail = (qid) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(`/questions/${qid}/`);
      if (!response.status === 200) {
        throw new Error("Something went wrong!");
      }

      const resData = response.data;

      dispatch({ type: SET_QUESTION_DETAIL, questionDetail: resData });
    } catch (err) {
      throw err;
    }
  };
};

export const createQuestion = (title, body, tagList) => {
  return async () => {
    try {
      const response = await axiosInstance.post("/questions/create/", {
        title: title,
        body: body,
        tags: tagList,
      });
      console.log(response.status);
    } catch (err) {
      throw err;
    }
  };
};

export const deleteQuestion = (qid) => {
  return async () => {
    try {
      await axiosInstance.delete(`/questions/${qid}/edit/`);
    } catch (err) {
      throw err;
    }
  };
};

export const editQuestion = (qid, title, body) => {
  return async () => {
    try {
      console.log(title);
      console.log(body);
      const response = await axiosInstance.put(`/questions/${qid}/edit/`, {
        title: title,
        body: body,
      });
      console.log(response.status);
    } catch (err) {
      throw err;
    }
  };
};

export const filterQuestionList = (filterText) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(
        `/questions/?ordering=-${filterText}`
      );

      const resData = response.data;
      dispatch({ type: SET_FILTERED_QUESTIONS, orderedQuestions: resData });
    } catch (err) {
      throw err;
    }
  };
};

export const searchQuestion = (searchText) => {
  return async (dispatch) => {
    try {
      let resData;
      if (searchText === "") {
        resData = [];
      } else {
        const response = await axiosInstance.get(
          `/questions/?search=${searchText}`
        );
        resData = response.data;
      }
      dispatch({ type: SEARCH_QUESTIONS, searchedQuestions: resData });
    } catch (err) {
      throw err;
    }
  };
};

export const upvoteQuestion = (qid) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.put(`/questions/${qid}/upvote/`);

      dispatch({ type: UPVOTE_QUESTION, questionId: qid });
    } catch (err) {
      throw err;
    }
  };
};

export const downvoteQuestion = (qid) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.put(`/questions/${qid}/downvote/`);

      dispatch({ type: DOWNVOTE_QUESTION, questionId: qid });
    } catch (err) {
      throw err;
    }
  };
};
