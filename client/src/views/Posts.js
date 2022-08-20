import React from "react";

const Posts = () => {
  const [posts, setPosts] = React.useState([]);
  const [postNodes, setPostNodes] = React.useState([]);

  const getPosts = () => {
    //get posts from DB
    fetch("/posts")
      .then((res) => res.json())
      .then((postList) => setPosts(postList))
      .catch((err) => console.log(err));

    //create html based on posts and comments
    if (posts.length > 0) {
      const nodes = posts.map((post) => {
        return (
          <div key={post["_id"]}>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
            <hr />
            {post.comments.map((comment) => {
              return (
                <div key={comment["_id"]}>
                  <p>User: {comment.user}</p>
                  <p>Comment: {comment.text}</p>
                </div>
              );
            })}
          </div>
        );
      });
      setPostNodes(nodes);
    }
  };

  React.useEffect(() => {
    getPosts();
  }, [posts.length]);

  return (
    <div>
      <h2>Posts</h2>
      <div className="postContainer">{postNodes}</div>
    </div>
  );
};

export default Posts;
