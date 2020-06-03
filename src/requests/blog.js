import axiosClient from '../utils/axiosClient';

export const postBlog = async (userId, blogData) => {
  console.log('post action called', blogData);
  try {
    const res = await axiosClient.post(
      `http://localhost:8080/post/new/${userId}`,
      blogData
    );
    return { data: res.data };
  } catch (error) {
    const {
      response: { data, status },
    } = error;
    return {
      error: {
        status,
        data,
      },
    };
    // console.log(error);
  }
};

export const editBlog = async (blogId, blogData) => {
  console.log('post (editBlog) action called', blogData);
  try {
    const res = await axiosClient.put(
      `http://localhost:8080/post/${blogId}`,
      blogData
    );
    // console.log(res.data);
    return { data: res.data };
  } catch (error) {
    const {
      response: { data, status },
    } = error;
    return {
      error: {
        status,
        data,
      },
    };
    // console.log(error);
  }
};

export const deleteBlog = async blogId => {
  console.log('post (deleteBlog) action called', blogId);
  try {
    const res = await axiosClient.delete(
      `http://localhost:8080/post/${blogId}`
    );
    console.log(res);
    return { data: res.data };
  } catch (error) {
    const {
      response: { data, status },
    } = error;
    return {
      error: {
        status,
        data,
      },
    };
    // console.log(error);
  }
};

export const getBlogs = async () => {
  console.log('get (getBlogs) action called');
  try {
    const res = await axiosClient.get(`http://localhost:8080/posts`);
    return { data: res.data };
  } catch (error) {
    const {
      response: { data, status },
    } = error;
    return {
      error: {
        status,
        data,
      },
    };
    // console.log(error);
  }
};

export const getBlogsByUserId = async userId => {
  console.log('get (getBlogsByUserId) action called');
  try {
    const res = await axiosClient.get(
      `http://localhost:8080/posts/by/${userId}`
    );
    console.log(res.data);
    return { data: res.data };
  } catch (error) {
    const {
      response: { data, status },
    } = error;
    return {
      error: {
        status,
        data,
      },
    };
    // console.log(error);
  }
};

export const getBlogById = async blogId => {
  console.log('get (getBlogById) action called');
  try {
    const res = await axiosClient.get(`http://localhost:8080/post/${blogId}`);
    return { data: res.data };
  } catch (error) {
    const {
      response: { data, status },
    } = error;
    return {
      error: {
        status,
        data,
      },
    };
  }
};

export const addComment = async (userId, blogId, comment) => {
  console.log('add comment action called');
  try {
    const res = await axiosClient.put(`http://localhost:8080/post/comment`, {
      userId,
      blogId,
      comment,
    });
    console.log(res);
    return { data: res.data };
  } catch (error) {
    const {
      response: { data, status },
    } = error;
    return {
      error: {
        status,
        data,
      },
    };
    // console.log(error);
  }
};

export const deleteComment = async (userId, blogId, comment) => {
  console.log('delete comment action called');
  try {
    const res = await axiosClient.put(`http://localhost:8080/post/uncomment`, {
      userId,
      blogId,
      comment,
    });
    console.log(res);
    return { data: res.data };
  } catch (error) {
    const {
      response: { data, status },
    } = error;
    return {
      error: {
        status,
        data,
      },
    };
    // console.log(error);
  }
};

export const like = async (userId, postId) => {
  console.log('like action called');
  try {
    const res = await axiosClient.put(`http://localhost:8080/post/like`, {
      userId,
      postId,
    });
    console.log('LIKE-', res.data.likes);
    return { likes: res.data.likes };
  } catch (error) {
    const {
      response: { data, status },
    } = error;
    return {
      error: {
        status,
        data,
      },
    };
    // console.log(error);
  }
};

export const unlike = async (userId, postId) => {
  console.log('unlike action called');
  try {
    const res = await axiosClient.put(`http://localhost:8080/post/unlike`, {
      userId,
      postId,
    });
    console.log('UNLIKE', res.data);
    return { likes: res.data.likes };
  } catch (error) {
    const {
      response: { data, status },
    } = error;
    return {
      error: {
        status,
        data,
      },
    };
    // console.log(error);
  }
};
