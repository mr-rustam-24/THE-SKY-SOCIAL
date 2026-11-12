const API_BASE = import.meta.env.VITE_API_URL || 'https://the-sky-social.onrender.com/api/v1';

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers }
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error?.message || 'The server could not complete this request.');
  return payload.data;
}

export const getMenuItems = () => apiRequest('/menu');
export const createReservation = (reservation) => apiRequest('/reservations', {
  method: 'POST',
  body: JSON.stringify(reservation)
});
