import axios from '../axiosInstance';

const endpoint = '/professors';

export default {
    fetchProfessor(id) {
        return axios.get(`${endpoint}/${id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    createProfessor(studentData) {
        return axios.post(endpoint, studentData,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    updateProfessor(id, studentData) {
        return axios.put(`${endpoint}/${id}`, studentData,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    deleteProfessor(id) {
        return axios.delete(`${endpoint}/${id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },
    fetchAllProfessors() {
        return axios.get(endpoint,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },
};
