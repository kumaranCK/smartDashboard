# Smart Home Dashboard

A modern React-based smart home dashboard with API integration for the CheminIntelliGB Server.

## Features

- User authentication with JWT tokens
- Responsive dashboard layout with real-time data
- Device management with API integration
- Room overview with device counts
- Sidebar navigation with logout functionality
- One-touch device controls
- Fallback to mock data when API is unavailable

## API Integration

The dashboard integrates with the CheminIntelliGB Server API endpoints:

- **Base URL:** `https://localhost:3000`
- **Authentication:** JWT tokens stored in localStorage
- **Endpoints:** Authentication, Home Management, Room Management, Device Management, etc.

### Authentication Flow

1. User logs in via the login form
2. Access and refresh tokens are stored in localStorage
3. API requests automatically include the Authorization header
4. Tokens are refreshed automatically when needed
5. Logout clears tokens and returns to login

### Data Fetching

- Homes are fetched on dashboard load
- Rooms are loaded for the first home
- Devices are retrieved for the selected room
- Device state changes are sent to the API
- Fallback to mock data if API calls fail

## Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx      # Main dashboard with API data fetching
│   ├── Login.jsx          # Authentication form
│   ├── Sidebar.jsx        # Navigation with logout
│   ├── TopBar.jsx         # Header bar
│   ├── MainContent.jsx    # Room stats and device section
│   ├── DeviceGrid.jsx     # Device cards grid
│   ├── RoomPanel.jsx      # Right panel with rooms
│   ├── Toggle.jsx         # Reusable toggle component
│   └── icons.jsx          # SVG icon components
├── services/
│   └── api.js             # API client with all endpoints
├── constants.js           # Fallback mock data
├── mock/
│   └── mockData.js        # Additional mock data
├── App.jsx                # Main app with auth routing
├── main.jsx
└── styles.css
```

## Getting Started

1. **Start the CheminIntelliGB Server** on `https://localhost:3000`

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5174](http://localhost:5174) in your browser.

5. **Accept the self-signed certificate** when the browser prompts for HTTPS connection to localhost:3000

6. Login with your credentials from the server.

## API Endpoints Used

The dashboard uses the following API endpoints:

- `POST /login` - User authentication
- `GET /home` - Fetch user homes
- `GET /room/:homeId` - Get rooms for a home
- `POST /devices/:roomId` - Get devices for a room
- `PATCH /device` - Toggle device state
- `POST /logout` - User logout

## Component Architecture

- **App**: Handles authentication state and routing
- **Login**: JWT-based login form
- **Dashboard**: Main layout with data fetching
- **Sidebar**: Navigation and logout
- **MainContent**: Room display with stats
- **DeviceGrid**: Interactive device controls
- **RoomPanel**: Room selection interface

## State Management

- Authentication state managed in App component
- Dashboard data fetched via useEffect hooks
- Device states updated optimistically with API sync
- Error handling with fallback to mock data

## Security

- JWT tokens stored securely in localStorage
- Automatic token refresh
- HTTPS with self-signed certificate support
- Authorization headers on protected routes

## Development

- Hot reload with Vite
- ESLint for code quality
- Component-based architecture
- API-first development approach

## Future Enhancements

- Real-time updates with WebSockets
- Advanced device controls
- Automation management
- Weather integration
- Multi-home support
- Offline mode with local storage</content>
<parameter name="filePath">c:\Users\Chandru\Downloads\smarthome-dashboard\smarthome-dashboard\README.md