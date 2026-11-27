import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

let socket: Socket | null = null;

export interface AttendanceUpdatePayload {
  eventId: number;
  ticketId: string;
  attendeeName: string;
  admittedCount: number;
  totalCapacity: number;
  timestamp: string;
}

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.info('[Socket.IO] Connected to gate server');
    });

    socket.on('disconnect', (reason) => {
      console.warn('[Socket.IO] Disconnected:', reason);
    });

    socket.on('connect_error', (err) => {
      console.warn('[Socket.IO] Connection error (Backend may be offline):', err.message);
    });
  }
  return socket;
};

export const joinGateRoom = (eventId: number) => {
  const s = getSocket();
  if (!s.connected) {
    s.connect();
  }
  s.emit('join_gate_room', { eventId });
};

export const leaveGateRoom = (eventId: number) => {
  if (socket && socket.connected) {
    socket.emit('leave_gate_room', { eventId });
  }
};

export const onAttendanceUpdate = (callback: (data: AttendanceUpdatePayload) => void) => {
  const s = getSocket();
  s.on('attendance_update', callback);
  return () => {
    s.off('attendance_update', callback);
  };
};

export default {
  getSocket,
  joinGateRoom,
  leaveGateRoom,
  onAttendanceUpdate,
};
