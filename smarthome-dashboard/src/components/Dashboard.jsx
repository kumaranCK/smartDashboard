import React, { useState, useEffect } from "react";
import { getHomes, getRooms, getDevicesByRoom, toggleDevice as apiToggleDevice } from "../services/api.js";
import Sidebar from "./Sidebar.jsx";
import TopBar from "./TopBar.jsx";
import MainContent from "./MainContent.jsx";
import RoomPanel from "./RoomPanel.jsx";
import "./Dashboard.css";

export default function SmartHomeDashboard({ onLogout }) {
  const [activeNav, setActiveNav] = useState("Devices");
  const [activeTab, setActiveTab] = useState("Lights");
  const [deviceStates, setDeviceStates] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [homes, setHomes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentHome, setCurrentHome] = useState(null);

  const fetchDevicesForRoom = async (roomIndex) => {
    if (!currentHome || !rooms.length || roomIndex < 0 || roomIndex >= rooms.length) {
      return;
    }

    const room = rooms[roomIndex];
    try {
      const devicesResponse = await getDevicesByRoom(room._id, { home: currentHome._id });
      setDevices(devicesResponse.data.devices);
      setDeviceStates(devicesResponse.data.devices.map(d => ({ ...d, on: d.state, id: d._id, color: "#22c55e" })));
    } catch (error) {
      console.error('Error fetching devices for room:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch homes
        const homesResponse = await getHomes();
        setHomes(homesResponse.data);
        if (homesResponse.data.length > 0) {
          const home = homesResponse.data[0];
          setCurrentHome(home);

          // Fetch rooms for first home
          const roomsResponse = await getRooms(home._id);
          setRooms(roomsResponse.data);

          // Fetch devices for first room if exists
          if (roomsResponse.data.length > 0) {
            const devicesResponse = await getDevicesByRoom(roomsResponse.data[0]._id, { home: home._id });
            setDevices(devicesResponse.data.devices);
            setDeviceStates(devicesResponse.data.devices.map(d => ({ ...d, on: d.state, id: d._id, color: "#22c55e" })));
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to mock data if API fails
        setDeviceStates([
          { id: 1, name: "Crompton light", type: "Lights", on: false, color: "#22c55e" },
          { id: 2, name: "Crompton light", type: "Lights", on: true, color: "#22c55e" },
          { id: 3, name: "Crompton light", type: "Lights", on: false, color: "#22c55e" },
          { id: 4, name: "Crompton light", type: "Lights", on: true, color: "#22c55e" },
        ]);
        setRooms([
          { id: 1, name: "Living Room", devices: 7 },
          { id: 2, name: "Bedroom", devices: 4 },
          { id: 3, name: "Kitchen", devices: 5 },
          { id: 4, name: "Bathroom", devices: 2 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && rooms.length > 0) {
      fetchDevicesForRoom(selectedRoom);
    }
  }, [selectedRoom, rooms, currentHome, loading]);

  const toggleDeviceState = async (id) => {
    const device = deviceStates.find(d => d.id === id || d._id === id);
    if (!device) return;

    const newState = !device.on;
    try {
      await apiToggleDevice({ deviceId: device._id || device.id, state: newState });
      setDeviceStates(ds => ds.map(d => d.id === id || d._id === id ? { ...d, on: newState } : d));
    } catch (error) {
      console.error('Error toggling device:', error);
      // Fallback to local state change
      setDeviceStates(ds => ds.map(d => d.id === id || d._id === id ? { ...d, on: newState } : d));
    }
  };

  if (loading) {
    return <div className="page-loading">Loading...</div>;
  }

  return (
    <div className="dashboard-shell">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} onLogout={onLogout} />

      {/* Main content */}
      <div className="dashboard-main">
        <TopBar />

        <div className="dashboard-content">
          <MainContent activeTab={activeTab} setActiveTab={setActiveTab} deviceStates={deviceStates} toggleDevice={toggleDeviceState} rooms={rooms} currentHome={currentHome} selectedRoom={selectedRoom} />
          <RoomPanel selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} rooms={rooms} />
        </div>
      </div>
    </div>
  );
}
