import React from "react";
import { getPosts, deletePostByID, deleteCommentByID } from "../utils";
import PostForm from "./PostForm";
import CommentForm from "./CommentForm";

const Adminpanel = (props) => {
  const [posts, setPosts] = React.useState([]);
  const [adminPostnodes, setAdminPostnodes] = React.useState([]);
  const [isEditPost, setIsEditPost] = React.useState(null);
  const [isEditComment, setIsEditComment] = React.useState(null);

  const editPost = async (postID) => {
    setIsEditPost(true);
  };

  const deletePost = async (postID) => {
    await deletePostByID(postID);
    setPosts([]);
  };

  const publishPost = async (postID) => {
    await fetch(`/posts/publish/${postID}`, {
      method: "PUT",
    });
    setPosts([]);
  };

  const unpublishPost = async (postID) => {
    await fetch(`/posts/unpublish/${postID}`, {
      method: "PUT",
    });
    setPosts([]);
  };

  const editComment = async (commentID) => {
    setIsEditComment(true);
  };

  const deleteComment = async (commentID) => {
    await deleteCommentByID(commentID);
    setPosts([]);
  };

  const renderPosts = async () => {
    //get posts from DB
    const postsList = await getPosts();
    setPosts(postsList);

    if (posts.length > 0) {
      //create html based on posts and comments
      const nodes = posts.map((post) => {
        return (
          <div key={post["_id"]}>
            {post.isPublic ? (
              <div>
                <p>Published</p>
                <button
                  type="button"
                  value={post["_id"]}
                  onClick={(event) => unpublishPost(event.target.value)}
                >
                  Unpublish
                </button>
              </div>
            ) : (
              <div>
                <p>Not published yet</p>
                <button
                  type="button"
                  value={post["_id"]}
                  onClick={(event) => publishPost(event.target.value)}
                >
                  Publish
                </button>
              </div>
            )}
            <h3>{post.title}</h3>
            <p>{post.text}</p>
            <button
              type="button"
              value={post["_id"]}
              onClick={(event) => editPost(event.target.value)}
            >
              Edit Post
            </button>
            <button
              type="button"
              value={post["_id"]}
              onClick={(event) => deletePost(event.target.value)}
            >
              Delete Post
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

  return !isEditPost && !isEditComment ? (
    <div>
      <h2>Adminpanel</h2>
      {adminPostnodes}
      <button type="button">
        <a href="/postForm">New Post</a>
      </button>
    </div>
  ) : isEditPost ? (
    <PostForm userID={props.userID} formAction="" />
  ) : (
    <CommentForm userID={props.userID} formAction="" />
  );
};

export default Adminpanel;
