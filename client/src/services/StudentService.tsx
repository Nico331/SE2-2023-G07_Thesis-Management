import axios from '../axiosInstance';

const endpoint = '/students';

export default {
    fetchStudent(id) {
        return axios.get(`${endpoint}/${id}`);
    },

    createStudent(studentData) {
        return axios.post(endpoint, studentData);
    },

    updateStudent(id, studentData) {
        return axios.put(`${endpoint}/${id}`, studentData);
    },

    deleteStudent(id) {
        return axios.delete(`${endpoint}/${id}`);
    },
    fetchAllStudents() {
        return axios.get(endpoint);
    },
};
