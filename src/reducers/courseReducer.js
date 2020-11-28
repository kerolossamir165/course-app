import { produce } from "immer";
import { courseActions } from "../actions/actionsTypes";

let initialState = {
  courses: [],
  saveLoading: false,
  saveError: null,
  coursesLoading: false,
  coursesError: null,
  newCourseModalOpen: false,
};

export default produce((draft, action) => {
  switch (action.type) {
    case courseActions.ADD_COURSE_BEGIN:
      draft.saveLoading = true;
      draft.saveError = null;
      break;
    case courseActions.ADD_COURSE_SUCCESS:
      draft.saveLoading = false;
      draft.newCourseModalOpen = false;
      console.log(draft.courses);

      draft.courses.push(action.payload);
      break;
    case courseActions.ADD_COURSE_ERROR:
      draft.saveLoading = false;
      draft.saveError = action.error;
      break;

    case courseActions.LOAD_COURSE_BEGIN:
      draft.coursesLoading = true;
      draft.coursesError = null;
      break;
    case courseActions.LOAD_COURSE_SUCCESS:
      draft.coursesLoading = false;
      draft.courses = action.payload;

      break;
    case courseActions.LOAD_COURSE_ERROR:
      draft.coursesLoading = false;
      draft.coursesError = action.error;
      break;
    case courseActions.OPEN_COURSE_MODAL:
      draft.newCourseModalOpen = true;
      break;
    case courseActions.CLOSE_COURSE_MODAL:
      draft.newCourseModalOpen = false;
      draft.saveError = null;
      break;
      case courseActions.DELETE_COURSE_SUCCESS:
        delete draft.courses[action.payload.id];
        break;
    default:
      return;
  }
}, initialState);
