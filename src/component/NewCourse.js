import React, { useState, useRef, useEffect } from "react";
import { addCourse } from "../actions";
import { connect } from "react-redux";
import "./NewCourse.css";

const NewCourse = ({ saveError, saveLoading, addCourse }) => {
  let [courseName, setCourseName] = useState("");
  let [coursePrice, setCoursePrice] = useState(0.0);
  let inputref = useRef();

  useEffect(() => {
    inputref.current.focus();
    console.log(saveError);
  }, []);

  let handelSubmit = (e) => {
    e.preventDefault();

    addCourse(courseName, coursePrice);
  };
  return (
    <div className="NewCourse">
      <h1>Create Your First Course</h1>
      <form className="createCourse-form" onSubmit={handelSubmit}>
        <label htmlFor="">Pick a Name</label>
        <input
          disabled={saveLoading}
          ref={inputref}
          required
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <label htmlFor="">Set a Price</label>
        <input
          disabled={saveLoading}
          type="text"
          value={coursePrice}
          onChange={(e) => setCoursePrice(e.target.value)}
        />
        {saveError && (
          <div className="saveError-message">Error: {saveError.message}</div>
        )}
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

let mapState = (state) => {
  return {
    saveLoading: state.courses.saveLoading,
    saveError: state.courses.saveError,
  };
};

export default connect(mapState, { addCourse })(NewCourse);
