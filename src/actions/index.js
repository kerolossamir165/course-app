import { courseActions, lessonActions ,appActions } from "./actionsTypes";
import {
  createCourse,
  getCourses,
  createLesson,
  getLessons,
  updateLesson,
  destroyLesson,
  destroyCourse,
} from "../Api/api";

// export const addCourse = (name) => {
//   return {
//     type: courseActions.ADD_COURSE,
//     payload: {
//       name,
//       id: Math.random(),
//     },
//   };
// }; convert to use thunk ==> to make async action

/**action creators for course ******* */

export let addCourse = (name, price) => {
  return (dispatch) => {
    dispatch({ type: courseActions.ADD_COURSE_BEGIN });
    createCourse(name, price)
      .then((course) =>
        dispatch({
          type: courseActions.ADD_COURSE_SUCCESS,
          payload: course,
        })
      )
      .catch((error) =>
        dispatch({ type: courseActions.ADD_COURSE_ERROR, error })
      );
  };
};

export let loadCourses = () => {
  return (dispatch) => {
    dispatch({ type: courseActions.LOAD_COURSE_BEGIN });
    getCourses()
      .then((courses) =>
        dispatch({
          type: courseActions.LOAD_COURSE_SUCCESS,
          payload: courses,
        })
      )
      .catch((error) =>
        dispatch({ type: courseActions.LOAD_COURSE_ERROR, error })
      );
  };
};

export let deleteCourse = (course) => {
  return (dispatch) => {
    dispatch({ type: courseActions.DELETE_COURSE_BEGIN });
    return destroyCourse(course)
      .then(() =>
        dispatch({
          type: courseActions.DELETE_COURSE_SUCCESS,
          payload: course,
        })
      )
      .catch((error) =>
        dispatch({ type: courseActions.DELETE_COURSE_ERROR, error })
      );
  };
};

export let openCourseModal = () => {
  return {
    type: courseActions.OPEN_COURSE_MODAL,
  };
};

export let closeCourseModal = () => {
  return {
    type: courseActions.CLOSE_COURSE_MODAL,
  };
};

/**action creators for lesson ******* */
export let addLesson = (lesson, courseId) => {
  return (dispatch) => {
    dispatch({ type: lessonActions.ADD_LESSON_BEGIN });
    return createLesson(lesson, courseId)
      .then((lesson) =>
        dispatch({
          type: lessonActions.ADD_LESSON_SUCCESS,
          payload: lesson,
        })
      )
      .catch((error) =>
        dispatch({ type: lessonActions.ADD_LESSON_ERROR, error })
      );
  };
};

export let loadLessons = (courseId) => {
  return (dispatch) => {
    dispatch({ type: lessonActions.LOAD_LESSON_BEGIN });
    getLessons(courseId)
      .then((Lessons) => {
        dispatch({
          type: lessonActions.LOAD_LESSON_SUCCESS,
          payload: Lessons,
        });
      })
      .catch((error) => {
        dispatch({ type: lessonActions.LOAD_LESSON_ERROR, error });
      });
  };
};

export let saveLesson = (lesson) => {
  return (dispatch) => {
    dispatch({ type: lessonActions.SAVE_LESSON_BEGIN });
    return updateLesson(lesson)
      .then((lesson) =>
        dispatch({
          type: lessonActions.SAVE_LESSON_SUCCESS,
          payload: lesson,
        })
      )
      .catch((error) =>
        dispatch({ type: lessonActions.SAVE_LESSON_ERROR, error })
      );
  };
};

export let deleteLesson = (lesson) => {
  return (dispatch) => {
    dispatch({ type: lessonActions.DELETE_LESSON_BEGIN });
    return destroyLesson(lesson)
      .then(() =>
        dispatch({
          type: lessonActions.DELETE_LESSON_SUCCESS,
          payload: lesson,
        })
      )
      .catch((error) =>
        dispatch({ type: lessonActions.DELETE_LESSON_ERROR, error })
      );
  };
};

let timer = null;

export let setLessonMarkDown = (lesson, markDown) => {
  return (dispatch, getState) => {
    dispatch({
      type: lessonActions.SET_LESSON_MARKDOWN,
      payload: {
        lesson,
        markDown,
      },
    });
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      let latestData = getState().lessons.lessons[lesson.id];
  
      dispatch(saveLesson(latestData));
    }, 2000);
  };
};


//// preveiw mode 
export let togglePreviewMode = ()=> {
  return {
    type: appActions.TOGGLE_PREVIEW_MODE
  }
}