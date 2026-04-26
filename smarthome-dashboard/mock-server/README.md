# Mock CheminIntelliGB Server

A mock implementation of the CheminIntelliGB API server for testing the smart home dashboard.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the mock server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3000` and provide all the API endpoints listed in the documentation.

## Test Credentials

- **Email:** `testuser@example.com`
- **Password:** `Test@1234`

## Mock Data

The server includes pre-populated mock data:

- **1 User:** testuser@example.com
- **1 Home:** "My Home" in Chennai
- **3 Rooms:** Living Room, Bedroom, Kitchen
- **4 Devices:** Various lights and fans across rooms

## API Endpoints

All endpoints from the CheminIntelliGB API documentation are implemented with mock responses.

### Authentication
- `POST /signUp` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /refresh` - Refresh access token
- `PUT /changePassword` - Change password

### Home Management
- `GET /home` - Get user homes
- `POST /home` - Create new home
- `PATCH /home/:homeId` - Update home
- `DELETE /homes/:homeId` - Delete home

### Room Management
- `GET /room/:homeId` - Get rooms for home
- `POST /room` - Create new room
- `POST /room/:roomId` - Get room details
- `PATCH /room/:roomId` - Update room
- `DELETE /room/:roomId` - Delete room

### Device Management
- `GET /devices` - Get all user devices
- `POST /devices` - Create single device
- `POST /devices/add` - Add multiple devices
- `POST /devices/:roomId` - Get devices by room
- `PATCH /devices/:deviceId` - Update device name
- `PATCH /device` - Toggle device state
- `POST /devices/edit` - Edit devices (delete/move)

### Other Features
- Board management
- Automations
- Favourites
- Weather
- OTP/Mail
- Code generation

## Data Persistence

All data is stored in memory and will reset when the server restarts. This is perfect for testing and development.

## HTTPS Support

The server can run with HTTPS if you generate self-signed certificates:

```bash
node generate-cert.js
```

Then restart the server. The dashboard will need to accept the self-signed certificate in the browser.