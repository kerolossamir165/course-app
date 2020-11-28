import React from "react";
import { connect } from "react-redux";
import LessonEditor from "../component/LessonEditor";
import Loading from "../component/LoadingPage";
import NotFound from "../pages/NotFoundPage";
import ReactMarkDown from "react-markdown";

const LessonPage = ({ lesson, loading, previewMode }) => {
  if (loading) {
    return <Loading />;
  }

  if (!lesson) {
    return <NotFound />;
  }

  return previewMode ? (
    <ReactMarkDown source={lesson.markDown || ""} />
  ) : (
    <LessonEditor lesson={lesson} />
  );
};

let mapState = (state, props) => {
  let lessonId = parseInt(props.lessonId);
 
  return {
    lesson: state.lessons.lessons[lessonId],
    loading: state.lessons.lessonLoading,
    previewMode: state.app.previewMode,
  };
};

export default connect(mapState)(LessonPage);
