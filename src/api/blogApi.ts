import axios from 'axios';



export const fetchBlog = async (id: string) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/blog/${id}`);
    return response.data.blog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw new Error("Failed to fetch blog");
  }
};


export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
    return response.data.blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Failed to fetch blogs");
  }
};


export const fetchComments = async (id: string) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${id}`);
    return response.data.comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Failed to fetch comments");
  }
};

export const addComment = async (blogId: string, comment: string) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/comments`, { blogId, comment });
    console.log("Comment posted successfully");
  } catch (error) {
    console.error("Error posting comment:", error);
    throw new Error("Failed to post comment");
  }
};
