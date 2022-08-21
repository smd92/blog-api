import React from "react";
import { getPosts, getPostbyID, deletePostByID, getCommentByID, deleteCommentByID } from "../utils";
import Modal from "./Modal";

const Adminpanel = () => {
  const [posts, setPosts] = React.useState([]);
  const [adminPostnodes, setAdminPostnodes] = React.useState([]);

  const editPost = async (postID) => {
    const post = await getPostbyID(postID);
    console.log(post);
  };

  const deletePost = (postID) => {
    deletePostByID(postID);
  };

  const editComment = async (commentID) => {
    const comment = await getCommentByID(commentID);
    console.log(comment);
  };

  const deleteComment = (commentID) => {
    deleteCommentByID(commentID);
  };

  const renderPosts = async () => {
    //get posts from DB
    const postsList = await getPosts();
    setPosts(postsList);
    //create html based on posts and comments
    if (posts.length > 0) {
      const nodes = posts.map((post) => {
        return (
          <div key={post["_id"]}>
            {post.isPublic ? (
              <div>
                <p>Published</p>
                <button type="button">Unpublish</button>
              </div>
            ) : (
              <div>
                <p>Not published yet</p>
                <button type="button">Publish</button>
              </div>
            )}
            <h3>{post.title}</h3>
            <p>{post.text}</p>
            <button
              type="button"
              value={post["_id"]}
              onClick={(event) => editPost(event.target.value)}
            >
              Edit
            </button>
            <button
              type="button"
              value={post["_id"]}
              onClick={(event) => deletePost(event.target.value)}
            >
              Delete
            </button>
            <hr />
            {post.comments.map((comment) => {
              return (
                <div key={comment["_id"]}>
                  <p>User: {comment.user}</p>
                  <p>Comment: {comment.text}</p>
                  <button
                    type="button"
                    value={comment["_id"]}
                    onClick={(event) => editComment(event.target.value)}
                  >
                    Edit Comment
                  </button>
                  <button
                    type="button"
                    value={comment["_id"]}
                    onClick={(event) => deleteComment(event.target.value)}
                  >
                    Delete Comment
                  </button>
                </div>
              );
            })}
          </div>
        );
      });
      setAdminPostnodes(nodes);
    }
  };

  React.useEffect(() => {
    renderPosts();
  }, [posts.length]);

  return (
    <div>
      <h2>Adminpanel</h2>
      {adminPostnodes}
      <button type="button">New Post</button>
    </div>
  );
};

export default Adminpanel;
