import PostList from "./components/post/PostList.vue";
import Post from "./components/post/Post.vue";
import PostCreate from "./components/post/PostCreate.vue";

export default [
    { path: '/posts', component: PostList },
    { path: '/posts/create', component: PostCreate },
    { path: '/posts/:postId', component: Post },
]