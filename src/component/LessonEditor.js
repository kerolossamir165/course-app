import React from "react";
import { connect } from "react-redux";
import { setLessonMarkDown } from "../actions";

const LessonEditor = ({ lesson, setLessonMarkDown }) => {
  return (
    <div>
      <div className="lesson-editor-help">
        <p>You Are Editing this lesson . changes are saved automatically</p>
      </div>
      <textarea
        className="lesson-editor"
        value={lesson.markDown || ""}
        id=""
        cols="30"
        rows="10"
        onChange={(e) => setLessonMarkDown(lesson, e.target.value)}
      ></textarea>
    </div>
  );
};

export default connect(null, { setLessonMarkDown })(LessonEditor);
