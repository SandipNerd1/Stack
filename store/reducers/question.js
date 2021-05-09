import {
  SET_QUESTIONS,
  SET_QUESTION_DETAIL,
  SET_FILTERED_QUESTIONS,
  SEARCH_QUESTIONS,
  MARK_QUESTION,
  UPVOTE_QUESTION,
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
    case MARK_QUESTION:
      const existingIndex = state.markedQuestions.findIndex(
        (ques) => ques.id === action.questionId
      );
      if (existingIndex >= 0) {
        const updatedMarkQuestions = [...state.markedQuestions];
        updatedMarkQuestions.splice(existingIndex, 1);
        return { ...state, markedQuestions: updatedMarkQuestions };
      } else {
        const question = state.availableQuestions.find(
          (ques) => ques.id === action.questionId
        );
        return {
          ...state,
          markedQuestions: state.markedQuestions.concat(question),
        };
      }
  }
  return state;
};
