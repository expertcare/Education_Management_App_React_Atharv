// api.js
import axios from "axios";

const API_URL = "http://localhost:3000"; // Replace with your JSON Server URL

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/usersData`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/usersData`, userData);
  return response.data;
  Data;
};

export const updateUser = async (userId, userData) => {
  const response = await axios.put(`${API_URL}/usersData/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/usersData/${userId}`);
  return response.data;
};
