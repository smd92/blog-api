//get list of all posts from DB
const getPosts = async () => {
    const res = await fetch("/posts");
    const postList = await res.json(); 
    return postList;
};

//get specific post by ID
const getPostbyID = async (postID) => {
    const res = await fetch(`/posts/${postID}`);
    const post = await res.json();
    return post;
}

export {
    getPosts,
    getPostbyID
}
