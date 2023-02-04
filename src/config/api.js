import axios from "axios";


const config = (accessToken) => {
  return {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }
}

export const api = {
  usersCreate: (data) => axios.post('/users/', data),
  getToken: (data) => axios.post('/token/', data),
  getUser: (access, id) => axios.get(`/users/${id}`, config(access)),
  editUser: (access, id, data) => axios.patch(`/users/${id}/`, data, config(access)),
  getAllUser: () => axios.get(`/users/`),
  refreshToken: (refresh) => axios.post('/token/refresh/', refresh),
  getSingleUser: (id) => axios.get(`/users/${id}`),
  postFollow: (access, data) => axios.post('/follow/', data, config(access)),
  removeFollow: (access, id) => axios.delete(`/follow/${id}/`, config(access)),
  getSubscriptions: (id) => axios.get(`/users/${id}/subscriptions/`),
  getSubscribers: (id) => axios.get(`/users/${id}/subscribers/`),
  getUsersPost: (id) => axios.get(`/users/${id}/posts/`),
  getPosts: () => axios.get('/posts/'),
  deletePost: (access, id) => axios.delete(`/posts/${id}/`, config(access)),
  getSinglePost: (id) => axios.get(`/posts/${id}/`),
  setLike: (access, data) => axios.post('/likes/', data, config(access)),
  removeLike: (access, id) => axios.delete(`/likes/${id}`, config(access)),
  setSave: (access, data) => axios.post('/saves/', data, config(access)),
  removeSave: (access, id) => axios.delete(`/saves/${id}/`, config(access)),
  createPost: (access, data) => axios.post('/posts/', data, config(access)),
  createPostImage: (access, data) => axios.post('/images/', data, config(access)),
  removePost: (access, id) => axios.delete(`/images/${id}/`, config(access)),
  getStories: (access) => axios.get('/stories/', config(access)),
  getSingleStories: (access, id) => axios.get(`/stories/${id}/`, config(access)),
  createStories: (access, data) => axios.post('/stories/', data, config(access)),
  createComment: (access, data) => axios.post('/comments/', data, config(access)),
  getComments: (id) => axios.get(`/posts/${id}/comments`),
  getSaved: (access, id) => axios.get(`/users/${id}/saves/`, config(access)),
}