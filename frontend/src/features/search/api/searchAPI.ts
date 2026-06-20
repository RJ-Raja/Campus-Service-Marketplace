import api from '../../../api/axiosConfig';

export const searchAPI = {
  searchServices: (params: Record<string, any>) => api.get('/csmp/search', { params }),
  getService: (id: string) => api.get(`/csmp/search/${id}`),
};

export default searchAPI;
