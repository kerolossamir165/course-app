import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import { Link } from "@reach/router";
import NewCourse from "../component/NewCourse";
import Loading from "../component/LoadingPage";
// import NotFound from "./NotFoundPage";
import {
  openCourseModal,
  closeCourseModal,
  deleteCourse,
  loadCourses,
} from "../actions/index";

import "./CourseListPage.css";

const CourseListPage = ({
  courses,
  openCourseModal,
  closeCourseModal,
  newCourseModalOpen,
  coursesLoading,
  coursesError,
  deleteCourse,
  loadCourses,
}) => {
  console.log(courses);
  if (coursesLoading) {
    return <Loading />;
  }

  if (coursesError) {
    return <div>{coursesError.message}</div>;
  }

  return courses.length === 0 ? (
    <div className="CreateCourse">
      <NewCourse />
    </div>
  ) : (
    <div className="CourseList">
      <h1>Your Courses </h1>
      <button className="new-course-btn" onClick={openCourseModal}>
        New Course
      </button>
      <Modal isOpen={newCourseModalOpen} onRequestClose={closeCourseModal}>
        <NewCourse />
      </Modal>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Link to={`/courses/${course.id}`} style={{ flexGrow: 1 }}>
              <div className="title">{course.name}</div>
              <div className="price">
                {course.price ? course.price.toFixed(2) : 0}
              </div>
            </Link>
            <button
              className="delete-item"
              onClick={() => {
                deleteCourse(course);
                loadCourses();
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

let mapState = (state) => {
  return {
    courses: state.courses.courses,
    coursesLoading: state.courses.coursesLoading,
    coursesError: state.courses.coursesError,
    newCourseModalOpen: state.courses.newCourseModalOpen,
  };
};

export default connect(mapState, {
  closeCourseModal,
  openCourseModal,
  deleteCourse,
  loadCourses,
})(CourseListPage);
