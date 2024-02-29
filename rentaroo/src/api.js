import axios from 'axios';
import { BASE_URL } from './constants';

const api = axios.create({
  baseURL: BASE_URL,
});

// GET all vehicles
const getAllVehicles = async () => {
  try {
    const response = await api.get('/vehicles');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// GET a single vehicle by ID
const getVehicle = async (id) => {
  try {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// CREATE a new vehicle
const createVehicle = async (id, vehicleData) => {
  try {
    const response = await api.post(`/vehicles/${id}`, vehicleData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// DELETE a vehicle by ID
const deleteVehicle = async (id) => {
  try {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getAllVehicles, getVehicle, createVehicle, deleteVehicle };