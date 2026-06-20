import api from '../../../api/axiosConfig';

export const serviceAPI = {
  createService: (formData: FormData) => api.post('/csmp/services', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getMyServices: () => api.get('/csmp/services/mine'),
  updateService: (id: string, formData: FormData) => api.put(`/csmp/services/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

export default serviceAPI;
