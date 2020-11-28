import { createSelector } from "reselect";

/**
 * reselect or (selectors) ==>
 *  centerlize where the things lives in state
 * give it the state and give us the thing that we want from it
 *
 * and cahche it's calls ==> memoization
 *      it inhance the performance if we have alot of data
 *
 */
let getlessons = (state) => state.lessons.lessons;

let courses = (state) => state.courses.courses;
let id = (state, ownProps) => parseInt(ownProps.courseId);

/***
 * 
 createSelector take 3 arguments 
    1- selector 
    2- seclecor 
    3- transform function ==> and what we return from this function 
    is what create selector returns

    *  */

//  export let getLessonsByCourse = createSelector(lessons, id, (lesson, id) =>
//   lesson.filter((l) => l.courseId === id)
// );

export let getcourseByid = createSelector(courses, id, (courses, id) =>
  courses.find((c) => c.id === id)
);

let getLessonsSorted = createSelector(getlessons, (lessons) => {
  return Object.values(lessons).sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    } else if (a.id > b.id) {
      return 1;
    } else {
      return 0;
    }
  });
});

export let getLessonsByCourse = createSelector(
  getLessonsSorted,
  id,
  (lesson, id) => {
    return lesson.filter((l) => l.courseId === id);
  }
);
