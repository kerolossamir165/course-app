// let PREFIX = "/api/";

//**** courses api  */
export let createCourse = (name, price = 0) => {
  return postData("http://localhost:3000/courses", {
    name,
    price: parseFloat(price),
  });
};

export let getCourses = () => {
  return fetch(" http://localhost:3000/courses")
    .then(handelErrors)
    .then((response) => response.json());
};

export let destroyCourse = (course) => {
  return deleteData(`http://localhost:3000/courses/${course.id}`, course);
};

/******lessons api *** */
export let createLesson = (name, courseId) => {
  return postData("http://localhost:3000/lessons", {
    name,
    courseId,
  });
};
export let getLessons = (courseId) => {
  return fetch(" http://localhost:3000/lessons?courseId=" + courseId)
    .then(handelErrors)
    .then((response) => response.json());
};

export let updateLesson = (lesson) => {
  return putData(`http://localhost:3000/lessons/${lesson.id}`, lesson);
};

export let destroyLesson = (lesson) => {
  return deleteData(`http://localhost:3000/lessons/${lesson.id}`, lesson);
};

/*********general api */
let postData = (url = "", data = {}) => {
  return fetchData(url, data, "POST");
};

let putData = (url = "", data = {}) => {
  return fetchData(url, data, "PUT");
};

let deleteData = (url = "", data = {}) => {
  return fetchData(url, data, "DELETE");
};

let fetchData = (url = "", data = {}, method) => {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then(handelErrors)
    .then((response) => response.json());
};

let handelErrors = (responce) => {
  if (!responce.ok) {
    return responce.json().then((body) => {
      throw new Error(body.message);
    });
  } else {
    return responce;
  }
};
