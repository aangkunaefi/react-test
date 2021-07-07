import axios from "axios";

const httpClient = axios.create({
  baseURL: 'https://60e58d1e5bcbca001749ed72.mockapi.io/api',
  timeout: 15000,
  headers: {'X-Custom-Header': 'foobar'}
});

const getUsers = () => {
  return httpClient.get('v1/user');
}

const getUser = (userId) => {
  return httpClient.get(`v1/user/${userId}`);
}

const deleteUser = (userId) => {
  return httpClient.delete(`v1/user/${userId}`);
}

const saveUser = (data) => {
  return httpClient({
    url: `v1/user/${data.user_id || ''}`,
    method: data.user_id ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

export {
  getUsers,
  saveUser,
  getUser,
  deleteUser
}