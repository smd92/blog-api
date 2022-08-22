import React from "react";

const PostForm = (props) => {
  return (
    <div>
      <h2>Post Form</h2>
      <form action="/posts" method="POST">
        <input id="user" name="user" type="hidden" value={props.userID} />
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" maxLength="100" required />
        </div>
        <div>
          <label htmlFor="text">Text</label>
          <input
            id="text"
            name="text"
            type="textarea"
            maxLength="180"
            required
          />
        </div>
        <input id="isPublic" name="isPublic" type="hidden" value="false" />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default PostForm;
