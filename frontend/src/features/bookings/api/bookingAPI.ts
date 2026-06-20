import api from '../../../api/axiosConfig';

export const bookingAPI = {
  createBooking: (payload: FormData | Record<string, any>) => api.post('/csmp/bookings', payload),
  getProviderPending: () => api.get('/csmp/bookings/provider/pending'),
  updateBooking: (id: string, payload: any) => api.put(`/csmp/bookings/${id}`, payload),
};

export default bookingAPI;
