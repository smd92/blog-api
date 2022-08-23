import React from "react";
import { getPosts, deletePostByID, deleteCommentByID } from "../utils";
import PostForm from "./PostForm";
import CommentForm from "./CommentForm";

const Adminpanel = (props) => {
  const [posts, setPosts] = React.useState([]);
  const [adminPostnodes, setAdminPostnodes] = React.useState([]);
  const [isEditPost, setIsEditPost] = React.useState(null);
  const [isEditComment, setIsEditComment] = React.useState(null);
  const [postToEditData, setPostToEditData] = React.useState(null);
  const [commentToEditData, setCommentToEditData] = React.useState(null);

  const editPost = (postID, postUser, postTitle, postText, postIsPublic) => {
    setPostToEditData({
      id: postID,
      user: postUser,
      title: postTitle,
      text: postText,
      isPublic: postIsPublic,
    });
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

  const editComment = (commentID, commentPost, commentUser, commentText) => {
    setCommentToEditData({
      id: commentID,
      post: commentPost,
      user: commentUser,
      text: commentText,
    });
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
              post-user={post.user}
              post-title={post.title}
              post-text={post.text}
              post-ispublic={post.isPublic.toString()}
              onClick={(event) =>
                editPost(
                  event.target.value,
                  event.target.getAttribute("post-user"),
                  event.target.getAttribute("post-title"),
                  event.target.getAttribute("post-text"),
                  event.target.getAttribute("post-ispublic")
                )
              }
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
                    comment-post={comment.post}
                    comment-user={comment.user}
                    comment-text={comment.text}
                    onClick={(event) =>
                      editComment(
                        event.target.value,
                        event.target.getAttribute("comment-post"),
                        event.target.getAttribute("comment-user"),
                        event.target.getAttribute("comment-text")
                      )
                    }
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
                  <button type="button">
                    <a href={`/commentForm/${post["_id"]}`}>New Comment</a>
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
    <PostForm
      path={`/posts/editPost/${postToEditData.id}`}
      method="PUT"
      formTitle="Edit Post"
      buttonText="Update Post"
      postToEdit={postToEditData}
    />
  ) : (
    <CommentForm
      path={`/comments/editComment/${commentToEditData.id}`}
      method="PUT"
      formTitle="Edit Comment"
      buttonText="Update Comment"
      commentToEdit={commentToEditData}
    />
  );
};

export default Adminpanel;
