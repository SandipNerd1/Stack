import {
  SET_QUESTIONS,
  SET_QUESTION_DETAIL,
  SET_FILTERED_QUESTIONS,
  SEARCH_QUESTIONS,
  UPVOTE_QUESTION,
  DOWNVOTE_QUESTION,
} from "../actions/question";

const initialState = {
  availableQuestions: [],
  availableQuestionDetails: [],
  filteredQuestions: [],
  markedQuestions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        availableQuestions: action.questions,
      };
    case SET_QUESTION_DETAIL:
      return {
        ...state,
        availableQuestionDetails: action.questionDetail,
      };
    case SET_FILTERED_QUESTIONS:
      return {
        ...state,
        availableQuestions: action.orderedQuestions,
      };
    case SEARCH_QUESTIONS:
      return {
        ...state,
        filteredQuestions: action.searchedQuestions,
      };
    case UPVOTE_QUESTION:
      if (state.availableQuestionDetails.user_downvoted) {
        return {
          ...state,
          availableQuestionDetails: {
            ...state.availableQuestionDetails,
            user_downvoted: !state.availableQuestionDetails.user_downvoted,
            user_upvoted: !state.availableQuestionDetails.user_upvoted,
          },
        };
      }
      return {
        ...state,
        availableQuestionDetails: {
          ...state.availableQuestionDetails,
          user_upvoted: !state.availableQuestionDetails.user_upvoted,
        },
      };
    case DOWNVOTE_QUESTION:
      if (state.availableQuestionDetails.user_upvoted) {
        return {
          ...state,
          availableQuestionDetails: {
            ...state.availableQuestionDetails,
            user_downvoted: !state.availableQuestionDetails.user_downvoted,
            user_upvoted: !state.availableQuestionDetails.user_upvoted,
          },
        };
      }
      return {
        ...state,
        availableQuestionDetails: {
          ...state.availableQuestionDetails,
          user_downvoted: !state.availableQuestionDetails.user_downvoted,
        },
      };
  }
  return state;
};
