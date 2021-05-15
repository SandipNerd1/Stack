import axiosInstance from '../../api/axiosApi';

// export const CREATE_QUESTION = "CREATE_QUESTION";
export const SET_QUESTIONS = "SET_QUESTIONS";
export const SET_QUESTION_DETAIL = "SET_QUESTION_DETAIL";
export const SET_FILTERED_QUESTIONS = "SET_FILTERED_QUESTIONS";
export const SEARCH_QUESTIONS = "SEARCH_QUESTIONS";
export const MARK_QUESTION = "MARK_QUESTION";
export const UPVOTE_QUESTION = "UPVOTE_QUESTION";
export const DOWNVOTE_QUESTION = "DOWNVOTE_QUESTION";

// const baseURL = "https://pocketstack.herokuapp.com/";

// const axiosInstance = axios.create({
//   baseURL: baseURL,
//   timeout: 5000,
//   headers: {
//     Authorization: "Token 4461f2aab8667ea9eee1997604623a8df8949e1f",
//     "Content-Type": "application/json",
//     accept: "application/json",
//   },
// });

export const fetchQuestions = () => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get("/questions/");
      if (!response.status === 200) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.data;
      console.log(resData);
      dispatch({ type: SET_QUESTIONS, questions: resData });
    } catch (err) {
      throw error;
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
      throw error;
    }
  };
};

export const createQuestion = (title, body, tagList) => {
  return async () => {
    console.log("waiting");
    console.log(title);
    console.log(body);
    console.log("tag");
    console.log(tagList);
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
      throw error;
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
      throw error;
    }
  };
};

export const markQuestion = (id) => {
  return { type: MARK_QUESTION, questionId: id };
};

export const upvoteQuestion = (qid) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.put(`/questions/${qid}/upvote/`);

      dispatch({ type: UPVOTE_QUESTION, questionId: qid });
    } catch (error) {
      throw error;
    }
  };
};

export const downvoteQuestion = (qid) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.put(`/questions/${qid}/downvote/`);

      dispatch({ type: DOWNVOTE_QUESTION, questionId: qid });
    } catch (error) {
      throw error;
    }
  };
};
