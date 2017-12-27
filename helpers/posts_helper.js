

const PostsHelper = {};


PostsHelper.postsPath = () => '/posts';
PostsHelper.postPath = (id) => `/posts/${id}`;
PostsHelper.shortPostBody = (postBody) => postBody.substr(0, 100);


module.exports = PostsHelper;
