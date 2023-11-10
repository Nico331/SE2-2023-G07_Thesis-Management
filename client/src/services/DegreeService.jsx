import axios from '../axiosInstance';

const endpoint = '/degrees';

export default {
    fetchDegree(codDegree) {
        return axios.get(`${endpoint}/${codDegree}`);
    },

    fetchAllDegrees() {
        return axios.get(endpoint);
    },
};