// import React, { useRef, useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { addLesson } from "../actions/index";
// import "./NewLesson.css";

// const NewLesson = ({ addLesson, courseId }) => {
//   let [editing, setEditing] = useState(false);
//   let [title, setTitle] = useState("");
//   let inputRef = useRef();

//   let reset = () => {
//     setTitle("");
//     setEditing(false);
//   };

//   useEffect(() => {
//     if (editing) {
//       inputRef.current.focus();
//     }
//   }, [editing]);

//   let commitLesson = (e) => {
//     e.preventDefault();

//     addLesson(title, courseId)
//       .then(reset)
//       .catch((err) => {
//         setEditing(false);
//       });
//     reset();
//   };

//   return editing ? (
//     <form className="add-lesson-button editing" onSubmit={commitLesson}>
//       <input
//         ref={inputRef}
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Add The Lesson"
//         onBlur={reset}
//       />
//     </form>
//   ) : (
//     <button className="add-lesson-button" onClick={() => setEditing(true)}>
//       New Lesson
//     </button>
//   );
// };

// export default connect(null, {
//   addLesson,
// })(NewLesson);

import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { addLesson, deleteLesson } from "../actions/index";
import "./NewLesson.css";

const NewLesson = ({
  onSubmitLesson,
  classname,
  children,
  lesson,
  deleteLesson,
}) => {
  let initValu = lesson ? lesson.name : "";
  let [editing, setEditing] = useState(false);
  let [title, setTitle] = useState(initValu);
  let inputRef = useRef();

  let reset = () => {
    setTitle(initValu);
    setEditing(false);
  };

  let beginEdit = () => {
    setEditing(true);
  };

  let remove = () => {
    deleteLesson(lesson);
  };

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  let commitLesson = (e) => {
    e.preventDefault();

    onSubmitLesson(title)
      .then(reset)
      .catch((err) => {
        setEditing(false);
      });
    reset();
  };

  return editing ? (
    <form className={`${classname || ""} editing`} onSubmit={commitLesson}>
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add The Lesson"
        onBlur={reset}
      />
    </form>
  ) : (
    children(beginEdit, remove)
  );
};

export default connect(null, {
  addLesson,
  deleteLesson,
})(NewLesson);
