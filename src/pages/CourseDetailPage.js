import React, { useEffect } from "react";
import { connect } from "react-redux";
import Loading from "../component/LoadingPage";
import { Link, Match } from "@reach/router";
import NotFound from "../pages/NotFoundPage";
import {
  addLesson,
  loadLessons,
  saveLesson,
  togglePreviewMode,
} from "../actions/index";
import { getLessonsByCourse, getcourseByid } from "../selectors";
import NewLesson from "../component/NewLesson";
import "./CourseDetailPage.css";

const CourseDetailPage = ({
  course,
  coursesLoading,
  lessons,
  loadLessons,
  addLesson,
  lessonError,
  saveLesson,
  children,
  previewMode,
  togglePreviewMode,
}) => {
  if (coursesLoading) {
    return <Loading />;
  }
  if (!course) {
    return <NotFound />;
  }
  if (lessonError) {
    return <Loading />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    loadLessons(course.id);

    //// load the lessons when the course change
  }, [course]);

  return (
    <div className="CourseDetail">
      <header>
        <h1>{course.name.toUpperCase()}</h1>
        <button className="preview-btn" onClick={togglePreviewMode}>
          {previewMode ? "Edite" : "Preview"}
        </button>
      </header>
      <div className="content">
        <div className="sidebar">
          {lessons.length > 0 && (
            <ul className="lessons">
              {lessons.map((lesson) => (
                <Match key={lesson.id} path={`lessons/${lesson.id}`}>
                  {({ match }) => {
                    let lessonClassName = `lesson-item ${
                      match ? "selected" : ""
                    }`;
                    return (
                      <li>
                        <NewLesson
                          className={lessonClassName}
                          lesson={lesson}
                          onSubmitLesson={(name) =>
                            saveLesson({
                              ...lesson,
                              name,
                            })
                          }
                        >
                          {(edit, destroy) => (
                            <div className={lessonClassName}>
                              <Link to={`lessons/${lesson.id}`}>
                                <span>{lesson.name}</span>
                                <button
                                  className="edit-lesson-btn"
                                  onClick={() => edit(lesson.name)}
                                >
                                  Edite
                                </button>
                                <button
                                  className="delete-lesson-btn"
                                  onClick={destroy}
                                >
                                  Delete
                                </button>
                              </Link>
                            </div>
                          )}
                        </NewLesson>
                      </li>
                    );
                  }}
                </Match>
              ))}
            </ul>
          )}
          <NewLesson
            classname="add-lesson-button"
            onSubmitLesson={(title) => addLesson(title, course.id)}
          >
            {(edit) => {
              return (
                <button className="add-lesson-button" onClick={edit}>
                  New Lesson
                </button>
              );
            }}
          </NewLesson>
        </div>
        <div className="lesson">{children}</div>
      </div>
    </div>
  );
};

let mapState = (state, ownProps) => {
   
  return {
    course: getcourseByid(state, ownProps),
    coursesLoading: state.courses.coursesLoading,
    lessons: getLessonsByCourse(state, ownProps),
    lessonError: state.lessons.lessonError,
    previewMode: state.app.previewMode,
  };
};

// without selectors
// let mapState = (state, ownProps) => {
//    let idCourse = parseInt(ownProps.courseId);
//   return {
//      course: state.courses.courses.find((c) => c.id === idCourse),

//     coursesLoading: state.courses.coursesLoading,
//     lessons: state.lessons.lessons.filter((l) => l.courseId === idCourse)
//   };
// };

export default connect(mapState, {
  loadLessons,
  addLesson,
  saveLesson,
  togglePreviewMode,
})(CourseDetailPage);
