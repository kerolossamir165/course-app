// import { produce } from "immer";
// import { lessonActions } from "../actions/actionsTypes";

// let initialState = {
//   lessons: [],
//   saveLoading: false,
//   saveError: null,
//   lessonLoading: false,
//   lessonError: null,
// };

// export default produce((draft, action) => {
//   switch (action.type) {
//     case lessonActions.ADD_LESSON_BEGIN:
//       draft.saveLoading = true;
//       draft.saveError = null;
//       break;
//     case lessonActions.ADD_LESSON_SUCCESS:
//       draft.saveLoading = false;
//       console.log(action.payload);
//       draft.lessons.push(action.payload);
//       break;
//     case lessonActions.ADD_LESSON_ERROR:
//       draft.saveLoading = false;
//       draft.saveError = action.error;
//       break;

//     case lessonActions.LOAD_LESSON_BEGIN:
//       draft.lessonLoading = true;
//       draft.lessonError = null;
//       break;
//     case lessonActions.LOAD_LESSON_SUCCESS:
//       draft.lessonLoading = false;
//       draft.lessons = draft.lessons.concat(
//         action.payload.filter((i) => {
//           return !draft.lessons.find((l) => l.id === i.id);
//         })
//       );
//       break;
//     case lessonActions.LOAD_LESSON_ERROR:
//       draft.lessonLoading = false;
//       draft.lessonError = action.error;
//       break;

//     default:
//       return;
//   }
// }, initialState);

import { produce } from "immer";
import { lessonActions } from "../actions/actionsTypes";

let initialState = {
  lessons: {},
  saveLoading: false,
  saveError: null,
  lessonLoading: false,
  lessonError: null,
};

export default produce((draft, action) => {
  switch (action.type) {
    case lessonActions.ADD_LESSON_BEGIN:
    case lessonActions.SAVE_LESSON_BEGIN:
      draft.saveLoading = true;
      draft.saveError = null;
      break;
    case lessonActions.ADD_LESSON_SUCCESS:
    case lessonActions.SAVE_LESSON_SUCCESS:
      draft.saveLoading = false;
      console.log(action.payload);
      draft.lessons[action.payload.id] = action.payload;
      break;
    case lessonActions.ADD_LESSON_ERROR:
    case lessonActions.SAVE_LESSON_ERROR:
      draft.saveLoading = false;
      draft.saveError = action.error;
      break;

    case lessonActions.LOAD_LESSON_BEGIN:
      draft.lessonLoading = true;
      draft.lessonError = null;
      break;
    case lessonActions.LOAD_LESSON_SUCCESS:
      draft.lessonLoading = false;

      action.payload.forEach((lesson) => {
        draft.lessons[lesson.id] = lesson;
      });

      break;
    case lessonActions.LOAD_LESSON_ERROR:
      draft.lessonLoading = false;
      draft.lessonError = action.error;
      break;
    case lessonActions.DELETE_LESSON_SUCCESS:
      delete draft.lessons[action.payload.id];
      break;
    case lessonActions.SET_LESSON_MARKDOWN:
      draft.lessons[action.payload.lesson.id].markDown =
        action.payload.markDown;
    default:
      return;
  }
}, initialState);
