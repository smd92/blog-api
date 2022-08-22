//get list of all posts from DB
const getPosts = async () => {
  try {
    const res = await fetch("/posts");
    const postList = await res.json();
    return postList;
  } catch (err) {
    console.log(err);
  }
};

//get specific post by ID
const getPostbyID = async (postID) => {
  try {
    const res = await fetch(`/posts/${postID}`);
    const post = await res.json();
    return post;
  } catch (err) {
    console.log(err);
  }
};

//delete specific post by ID
const deletePostByID = async (postID) => {
  try {
    await fetch(`/posts/${postID}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err);
  }
};

//get specific comment by ID
const getCommentByID = async (commentID) => {
  try {
    const res = await fetch(`/comments/${commentID}`);
    const comment = await res.json();
    return comment;
  } catch (err) {
    console.log(err);
  }
};

//delete specific comment by ID
const deleteCommentByID = async (commentID) => {
  try {
    await fetch(`/comments/${commentID}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err);
  }
};

export {
  getPosts,
  getPostbyID,
  deletePostByID,
  getCommentByID,
  deleteCommentByID,
};
