import React from "react";
import { getPosts } from "../utils";

const Posts = () => {
  const [posts, setPosts] = React.useState([]);
  const [postNodes, setPostNodes] = React.useState([]);

  const renderPosts = async () => {
    //get posts from DB
    const postsList = await getPosts();
    setPosts(postsList);
    //create html based on posts and comments
    if (posts.length > 0) {
      const nodes = posts.map((post) => {
        if (post.isPublic) {
          return (
            <div key={post["_id"]}>
              <h3>{post.title}</h3>
              <p>{post.text}</p>
              <hr />
              {post.comments.length > 0 &&
                post.comments.map((comment) => {
                  return (
                    <div key={comment["_id"]}>
                      <p>User: {comment.user}</p>
                      <p>Comment: {comment.text}</p>
                    </div>
                  );
                })}
            </div>
          );
        }
      });
      setPostNodes(nodes);
    }
  };

  React.useEffect(() => {
    renderPosts();
  }, [posts.length]);

  return (
    <div>
      <h2>Posts</h2>
      <div className="postContainer">{postNodes}</div>
    </div>
  );
};

export default Posts;
