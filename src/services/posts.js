import instance from "./instance";

const getPosts = async () => {
    try {
        console.log('fetching posts...');
        const response = await instance.protectedInstance.get('/posts');

        console.log('posts: ', response.data);

        if(response.data.posts) {
            return response.data.posts;
        }
        return null;
    } catch (error) {
        console.log('Error fetching posts: ', error);
    }
}

// service to create a new post
const createPost = async (post) => {
    try {
        console.log('creating post...');
        const response = await instance.protectedInstance.post('/posts', post);

        console.log('post: ', response.data);

        if(response.data.post) {
            return response.data.post;
        }
        return null;
    } catch (error) {
        console.log('Error creating post: ', error);
    }
}

export default {
    getPosts,
};