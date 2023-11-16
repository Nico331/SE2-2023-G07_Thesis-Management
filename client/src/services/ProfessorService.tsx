import axios from '../axiosInstance';

const endpoint = '/professors';

export default {
    fetchProfessor(id) {
        return axios.get(`${endpoint}/${id}`);
    },

    createProfessor(studentData) {
        return axios.post(endpoint, studentData);
    },

    updateProfessor(id, studentData) {
        return axios.put(`${endpoint}/${id}`, studentData);
    },

    deleteProfessor(id) {
        return axios.delete(`${endpoint}/${id}`);
    },
    fetchAllProfessors() {
        return axios.get(endpoint);
    },
};
