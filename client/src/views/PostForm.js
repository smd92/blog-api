import React from "react";

const PostForm = (props) => {
  const [user, setUser] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [isPublic, setIsPublic] = React.useState(false);

  React.useEffect(() => {
    if (props.postToEdit) {
      setUser(props.postToEdit.user);
      setTitle(props.postToEdit.title);
      setText(props.postToEdit.text);
      setIsPublic(props.postToEdit.isPublic);
    } else {
      setUser(props.userID);
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
          user,
          title,
          text,
          isPublic,
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
        <input id="user" name="user" type="hidden" value={user} />
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            maxLength="100"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            required
          />
        </div>
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
        <input id="isPublic" name="isPublic" type="hidden" value={isPublic} />
        <button type="submit">{props.buttonText}</button>
      </form>
    </div>
  );
};

export default PostForm;
