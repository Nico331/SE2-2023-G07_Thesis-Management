import axios from '../axiosInstance';

const endpoint = '/careers';

export default {
    fetchCareer(id) {
        return axios.get(`${endpoint}/${id}`);
    },

    fetchAllCareers() {
        return axios.get(endpoint);
    },
};
