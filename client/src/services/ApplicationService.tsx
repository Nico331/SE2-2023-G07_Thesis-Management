import axios from '../axiosInstance';

const endpoint = '/applications';

export default {
    fetchApplication(id) {
        return axios.get(`${endpoint}/${id}`);
    },

    fetchAllApplications() {
        return axios.get(endpoint);
    },
};
