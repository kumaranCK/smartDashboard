import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = token;
  return config;
});

// Authentication
export const signUp = (data) => api.post('/signUp', data);
export const login = (data) => api.post('/login', data);
export const logout = (data) => api.post('/logout', data);
export const refresh = (data) => api.post('/refresh', data);
export const changePassword = (data) => api.put('/changePassword', data);

// Home Management
export const getHomes = () => api.get('/home');
export const createHome = (data) => api.post('/home', data);
export const updateHome = (homeId, data) => api.patch(`/home/${homeId}`, data);
export const deleteHome = (homeId) => api.delete(`/homes/${homeId}`);
export const getHomeBoards = (data) => api.post('/home/boards', data);

// Room Management
export const getRooms = (homeId) => api.get(`/room/${homeId}`);
export const createRoom = (data) => api.post('/room', data);
export const getRoom = (roomId, data) => api.post(`/room/${roomId}`, data);
export const updateRoom = (roomId, data) => api.patch(`/room/${roomId}`, data);
export const deleteRoom = (roomId) => api.delete(`/room/${roomId}`);
export const getRoomBoards = (data) => api.post('/room/boards', data);
export const toggleAllRoomDevices = (data) => api.post('/room/device/all', data);

// Device Management
export const getDevices = () => api.get('/devices');
export const createDevice = (data) => api.post('/devices', data);
export const addMultipleDevices = (data) => api.post('/devices/add', data);
export const getDevicesByRoom = (roomId, data) => api.post(`/devices/${roomId}`, data);
export const updateDeviceName = (deviceId, data) => api.patch(`/devices/${deviceId}`, data);
export const toggleDevice = (data) => api.patch('/device', data);
export const editDevices = (data) => api.post('/devices/edit', data);

// Board Management
export const getBoardTraits = () => api.get('/board/trait');
export const createBoardTrait = (data) => api.post('/board/trait', data);
export const getBoardTraitDetails = (data) => api.post('/board/getTraitDetails', data);

// Chip Capability
export const createChipCapability = (data) => api.post('/chipCapability', data);

// Favourites
export const getFavourites = (data) => api.post('/favourites/list', data);
export const addFavourite = (data) => api.post('/favourites', data);
export const syncFavourites = (data) => api.post('/favourites/sync', data);

// Automations
export const getAutomations = (homeId) => api.get(`/automations/${homeId}`);
export const createAutomation = (data) => api.post('/automations', data);
export const updateAutomation = (automationId, data) => api.put(`/automations/${automationId}`, data);
export const deleteAutomation = (automationId) => api.delete(`/automations/${automationId}`);

// Weather
export const getWeather = (data) => api.post('/weather', data);

// Mail & OTP
export const sendMail = (data) => api.post('/sendMail', data);
export const validateOtp = (data) => api.post('/validateOtp', data);

// Code Generation
export const generateCode = () => api.post('/genCode');

export default api;