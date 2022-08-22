import React from "react";
import { getPosts, deletePostByID, deleteCommentByID } from "../utils";

const Adminpanel = () => {
  const [posts, setPosts] = React.useState([]);
  const [adminPostnodes, setAdminPostnodes] = React.useState([]);

  const deletePost = (postID) => {
    deletePostByID(postID);
  };

  const publishPost = (postID) => {
    fetch(`/posts/publish/${postID}`, {
      method: "PUT",
    });
  };

  const unpublishPost = (postID) => {
    fetch(`/posts/unpublish/${postID}`, {
      method: "PUT",
    });
  };

  const deleteComment = (commentID) => {
    deleteCommentByID(commentID);
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
