class PostService {
//This example uses fetch(). In these requests, we always need to transform the data to JSON by using json(). See the  

    getAllPosts = async () => {
        // API code to get all posts
        return await fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
    }

    getSinglePost = async (id) => {
        return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
    }

}

export default PostService;