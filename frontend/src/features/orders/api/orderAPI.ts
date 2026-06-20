import api from '../../../api/axiosConfig';

export const orderAPI = {
  getMyActiveOrders: () => api.get('/csmp/orders/mine'),
};

export default orderAPI;
