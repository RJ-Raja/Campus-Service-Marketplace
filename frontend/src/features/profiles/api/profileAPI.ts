import api from '../../../api/axiosConfig';

export const profileAPI = {
  getMyProfile: () => api.get('/csmp/profile/me'),
  updateMyProfile: (payload: { bio?: string; skills?: string }) => api.put('/csmp/profile/me', payload),
};

export type ProfilePayload = { bio?: string; skills?: string };

export default profileAPI;
