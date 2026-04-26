const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Mock data
let users = [
  {
    _id: "user123",
    username: "testuser",
    email: "testuser@example.com",
    password: bcrypt.hashSync("Test@1234", 10),
    favourites: []
  }
];

let homes = [
  {
    _id: "home1",
    name: "My Home",
    userId: "user123",
    location: "Chennai"
  }
];

let rooms = [
  {
    _id: "room1",
    name: "Living Room",
    home: "home1",
    userId: "user123",
    devices: [],
    isAllOn: false,
    onDevicesCount: 2,
    offDevicesCount: 3,
    sensors: false
  },
  {
    _id: "room2",
    name: "Bedroom",
    home: "home1",
    userId: "user123",
    devices: [],
    isAllOn: false,
    onDevicesCount: 1,
    offDevicesCount: 3,
    sensors: false
  },
  {
    _id: "room3",
    name: "Kitchen",
    home: "home1",
    userId: "user123",
    devices: [],
    isAllOn: false,
    onDevicesCount: 2,
    offDevicesCount: 2,
    sensors: false
  }
];

let devices = [
  {
    _id: "device1",
    name: "Crompton Light",
    category: "SWITCH",
    state: false,
    room: "room1",
    home: "home1",
    userId: "user123"
  },
  {
    _id: "device2",
    name: "Ceiling Fan",
    category: "FAN",
    state: true,
    room: "room1",
    home: "home1",
    userId: "user123"
  },
  {
    _id: "device3",
    name: "Bedroom Light",
    category: "SWITCH",
    state: true,
    room: "room2",
    home: "home1",
    userId: "user123"
  },
  {
    _id: "device4",
    name: "Kitchen Light",
    category: "SWITCH",
    state: false,
    room: "room3",
    home: "home1",
    userId: "user123"
  }
];

let automations = [];
let boards = [];
let boardTraits = [];
let chipCapabilities = [];

// Middleware
app.use(cors());
app.use(express.json());

// JWT secret
const JWT_SECRET = 'mock-secret-key';

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const token = authHeader;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Routes

// Authentication
app.post('/signUp', async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    _id: `user${Date.now()}`,
    username,
    email,
    password: hashedPassword,
    favourites: []
  };

  users.push(newUser);
  res.status(200).json({ success: true });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json("Not Registered");
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json("Incorrect Password");
  }

  const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

  res.json({
    access_token: accessToken,
    refresh_token: refreshToken,
    _id: user._id,
    username: user.username,
    email: user.email,
    favourites: user.favourites
  });
});

app.post('/logout', (req, res) => {
  // In a real implementation, you might blacklist the token
  res.json("ok  success");
});

app.post('/refresh', (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const accessToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      access_token: accessToken,
      refresh_token: refreshToken
    });
  } catch (error) {
    res.status(401).json("You are not authenticated!");
  }
});

app.put('/changePassword', (req, res) => {
  const { email, newPassword } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  user.password = bcrypt.hashSync(newPassword, 10);
  res.json({ success: "Password changed successfully." });
});

// Home Management
app.get('/home', verifyToken, (req, res) => {
  const userHomes = homes.filter(h => h.userId === req.user.id);
  res.json(userHomes);
});

app.post('/home', verifyToken, (req, res) => {
  const { name, location } = req.body;
  const newHome = {
    _id: `home${Date.now()}`,
    name,
    userId: req.user.id,
    location
  };
  homes.push(newHome);
  res.json(newHome);
});

app.patch('/home/:homeId', verifyToken, (req, res) => {
  const { homeId } = req.params;
  const { name, location } = req.body;

  const home = homes.find(h => h._id === homeId && h.userId === req.user.id);
  if (!home) {
    return res.status(404).json({ error: 'Home not found' });
  }

  if (name) home.name = name;
  if (location) home.location = location;

  res.json({ data: home, success: true });
});

app.delete('/homes/:homeId', (req, res) => {
  const { homeId } = req.params;
  homes = homes.filter(h => h._id !== homeId);
  // Also delete associated rooms and devices
  rooms = rooms.filter(r => r.home !== homeId);
  devices = devices.filter(d => d.home !== homeId);
  res.sendStatus(200);
});

app.post('/home/boards', verifyToken, (req, res) => {
  // Mock board data
  const mockBoards = [
    { _id: "board1", name: "ESP32 Board 1", room: req.body.room, home: req.body.home }
  ];
  res.json({ success: true, data: mockBoards });
});

// Room Management
app.get('/room/:homeId', verifyToken, (req, res) => {
  const { homeId } = req.params;
  const homeRooms = rooms.filter(r => r.home === homeId && r.userId === req.user.id);
  res.json(homeRooms);
});

app.post('/room', verifyToken, (req, res) => {
  const { name, home } = req.body;
  const newRoom = {
    _id: `room${Date.now()}`,
    name,
    home,
    userId: req.user.id,
    devices: [],
    isAllOn: false,
    onDevicesCount: 0,
    offDevicesCount: 0,
    sensors: false
  };
  rooms.push(newRoom);
  res.json(newRoom);
});

app.post('/room/:roomId', verifyToken, (req, res) => {
  const { roomId } = req.params;
  const { home } = req.body;

  const room = rooms.find(r => r._id === roomId && r.home === home && r.userId === req.user.id);
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }

  // Return room with devices
  const roomDevices = devices.filter(d => d.room === roomId);
  res.json({
    ...room,
    devices: roomDevices
  });
});

app.patch('/room/:roomId', verifyToken, (req, res) => {
  const { roomId } = req.params;
  const { name } = req.body;

  const room = rooms.find(r => r._id === roomId && r.userId === req.user.id);
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }

  if (name) room.name = name;
  res.json({ success: true });
});

app.delete('/room/:roomId', verifyToken, (req, res) => {
  const { roomId } = req.params;
  rooms = rooms.filter(r => r._id !== roomId);
  devices = devices.filter(d => d.room !== roomId);
  res.sendStatus(200);
});

app.post('/room/boards', verifyToken, (req, res) => {
  const mockBoards = [
    { _id: "board1", name: "Room Board", room: req.body.room, home: req.body.home }
  ];
  res.json({ success: true, data: mockBoards });
});

app.post('/room/device/all', verifyToken, (req, res) => {
  const { roomId, state } = req.body;
  devices.forEach(d => {
    if (d.room === roomId) {
      d.state = state;
    }
  });
  res.json({ success: true });
});

// Device Management
app.get('/devices', verifyToken, (req, res) => {
  const userDevices = devices.filter(d => d.userId === req.user.id);
  res.json({ success: true, devices: userDevices });
});

app.post('/devices', verifyToken, (req, res) => {
  const { name, home, boardId, room, category } = req.body;
  const newDevice = {
    _id: `device${Date.now()}`,
    name,
    category,
    state: false,
    room,
    home,
    userId: req.user.id
  };
  devices.push(newDevice);
  res.json(newDevice);
});

app.post('/devices/add', verifyToken, (req, res) => {
  const { boardId, room, house, names } = req.body;

  const newDevices = names.map(name => {
    const [category, ...nameParts] = name.split(' ');
    return {
      _id: `device${Date.now()}${Math.random()}`,
      name: nameParts.join(' '),
      category,
      state: false,
      room,
      home: house,
      userId: req.user.id
    };
  });

  devices.push(...newDevices);
  res.json({ success: true });
});

app.post('/devices/:roomId', verifyToken, (req, res) => {
  const { roomId } = req.params;
  const { home } = req.body;

  const roomDevices = devices.filter(d => d.room === roomId && d.home === home && d.userId === req.user.id);
  res.json({ success: true, devices: roomDevices });
});

app.patch('/devices/:deviceId', verifyToken, (req, res) => {
  const { deviceId } = req.params;
  const { name } = req.body;

  const device = devices.find(d => d._id === deviceId && d.userId === req.user.id);
  if (!device) {
    return res.status(404).json({ error: 'Device not found' });
  }

  if (name) device.name = name;
  res.json({ success: true });
});

app.patch('/device', verifyToken, (req, res) => {
  const { deviceId, state } = req.body;

  const device = devices.find(d => d._id === deviceId && d.userId === req.user.id);
  if (!device) {
    return res.json({ success: false, data: ["Offline", -1] });
  }

  device.state = state;
  res.json({ success: true, data: [devices] });
});

app.post('/devices/edit', verifyToken, (req, res) => {
  const { type, ids, boardId, roomId, del_boardId } = req.body;

  if (type === 'DELETE_DEVICE') {
    devices = devices.filter(d => !ids.includes(d._id));
  } else if (type === 'MOVE_BOARD') {
    devices.forEach(d => {
      if (d.boardId === boardId) {
        d.room = roomId;
      }
    });
  } else if (type === 'DELETE_BOARD') {
    devices = devices.filter(d => d.boardId !== del_boardId);
  }

  res.json({ success: true });
});

// Board Management
app.get('/board/trait', verifyToken, (req, res) => {
  res.json(boardTraits);
});

app.post('/board/trait', verifyToken, (req, res) => {
  const newTrait = { _id: `trait${Date.now()}`, ...req.body };
  boardTraits.push(newTrait);
  res.json(newTrait);
});

app.post('/board/getTraitDetails', verifyToken, (req, res) => {
  const { boardId } = req.body;
  // Mock response
  res.json({ ins: [2, 4, 5], outs: [12, 13, 14] });
});

// Chip Capability
app.post('/chipCapability', verifyToken, (req, res) => {
  const newCapability = { _id: `chip${Date.now()}`, ...req.body };
  chipCapabilities.push(newCapability);
  res.json(newCapability);
});

// Favourites
app.post('/favourites/list', verifyToken, (req, res) => {
  const user = users.find(u => u._id === req.user.id);
  res.json({ success: true, data: { favourites: user.favourites } });
});

app.post('/favourites', verifyToken, (req, res) => {
  const { deviceId } = req.body;
  const user = users.find(u => u._id === req.user.id);
  if (!user.favourites.includes(deviceId)) {
    user.favourites.push(deviceId);
  }
  res.json({ success: true });
});

app.post('/favourites/sync', verifyToken, (req, res) => {
  const { idsToAdd, idsToRemove } = req.body;
  const user = users.find(u => u._id === req.user.id);

  user.favourites = user.favourites.filter(id => !idsToRemove.includes(id));
  idsToAdd.forEach(id => {
    if (!user.favourites.includes(id)) {
      user.favourites.push(id);
    }
  });

  res.json({ success: true });
});

// Automations
app.get('/automations/:homeId', verifyToken, (req, res) => {
  const { homeId } = req.params;
  const homeAutomations = automations.filter(a => a.home === homeId);
  res.json(homeAutomations);
});

app.post('/automations', verifyToken, (req, res) => {
  const newAutomation = {
    _id: `auto${Date.now()}`,
    ...req.body,
    userId: req.user.id
  };
  automations.push(newAutomation);
  res.status(201).json(newAutomation);
});

app.put('/automations/:automationId', verifyToken, (req, res) => {
  const { automationId } = req.params;
  const updates = req.body;

  const automation = automations.find(a => a._id === automationId);
  if (!automation) {
    return res.status(404).json({ error: 'Automation not found' });
  }

  Object.assign(automation, updates);
  res.json(automation);
});

app.delete('/automations/:automationId', verifyToken, (req, res) => {
  const { automationId } = req.params;
  automations = automations.filter(a => a._id !== automationId);
  res.json({ success: true, message: "Automation deleted successfully" });
});

// Weather
app.post('/weather', verifyToken, (req, res) => {
  // Mock weather data
  res.json({
    success: true,
    data: {
      main: { temp: 28 },
      weather: [{ description: "clear sky" }],
      name: "Chennai"
    }
  });
});

// Mail & OTP
app.post('/sendMail', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ error: "Email not found" });
  }
  res.json(true);
});

app.post('/validateOtp', (req, res) => {
  const { email, code } = req.body;
  // Mock OTP validation - accept any 4-digit code
  if (code.length === 4 && /^\d+$/.test(code)) {
    res.json(true);
  } else {
    res.json(false);
  }
});

// Code Generation
app.post('/genCode', verifyToken, (req, res) => {
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  res.json(code);
});

// Create self-signed certificate if it doesn't exist
if (!fs.existsSync('key.pem') || !fs.existsSync('cert.pem')) {
  console.log('Self-signed certificates not found. Running on HTTP...');
  app.listen(PORT, () => {
    console.log(`Mock CheminIntelliGB Server running on http://localhost:${PORT}`);
    console.log('Test credentials:');
    console.log('Email: testuser@example.com');
    console.log('Password: Test@1234');
  });
} else {
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
  };
  https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`Mock CheminIntelliGB Server running on https://localhost:${PORT}`);
    console.log('Test credentials:');
    console.log('Email: testuser@example.com');
    console.log('Password: Test@1234');
  });
}