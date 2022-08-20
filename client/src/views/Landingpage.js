import React from "react";

const Landingpage = (props) => {
  return (
    <div>
      <h1>Welcome</h1>
      {props.posts}
    </div>
  );
};

export default Landingpage;
