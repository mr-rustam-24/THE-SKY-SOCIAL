const API_BASE = '/api/v1';

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('restaurant_auth_token');
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
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

export const createReservationPaymentOrder = (reservation) => apiRequest('/reservations/payment-order', {
  method: 'POST',
  body: JSON.stringify(reservation)
});

export const confirmReservationPayment = (payment) => apiRequest('/reservations/confirm-payment', {
  method: 'POST',
  body: JSON.stringify(payment)
});

export const loginWithPassword = (credentials) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
export const registerAccount = (account) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(account) });
export const sendLoginOtp = (phone) => apiRequest('/auth/otp/send', { method: 'POST', body: JSON.stringify({ phone }) });
export const verifyLoginOtp = (phone, otpCode) => apiRequest('/auth/otp/verify', { method: 'POST', body: JSON.stringify({ phone, otp_code: otpCode }) });
export const getRestaurantInfo = () => apiRequest('/restaurant');
export const getOriginalMenuPages = () => apiRequest('/menu/pages');
export const getCurrentUser = () => apiRequest('/auth/me');
export const getReservationAvailability = ({ date, guests, zone }) => {
  const query = new URLSearchParams({ date, guests: String(guests), zone });
  return apiRequest(`/reservations/availability?${query}`);
};
