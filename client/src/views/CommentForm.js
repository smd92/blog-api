import React from "react";
import { useParams } from "react-router-dom";

const CommentForm = (props) => {
  const { postid } = useParams();
  const [post, setPost] = React.useState("");
  const [user, setUser] = React.useState("");
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    setUser("Anon");
    if (props.commentToEdit) {
      setPost(props.commentToEdit.post);
      setUser(props.commentToEdit.user);
      setText(props.commentToEdit.text);
    } else {
      setPost(postid);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch(props.path, {
        method: props.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post,
          user,
          text,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>{props.formTitle}</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input id="post" name="post" type="hidden" value={post} />
        <input id="user" name="user" type="hidden" value={user} />
        <div>
          <label htmlFor="text">Text</label>
          <input
            id="text"
            name="text"
            type="textarea"
            maxLength="180"
            onChange={(event) => setText(event.target.value)}
            value={text}
            required
          />
        </div>
        <button type="submit">{props.buttonText}</button>
      </form>
    </div>
  );
};

export default CommentForm;
