import axios from '../axiosInstance';

const endpoint = '/students';

export default {
    fetchStudent(id) {
        return axios.get(`${endpoint}/${id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    createStudent(studentData) {
        return axios.post(endpoint, studentData,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    updateStudent(id, studentData) {
        return axios.put(`${endpoint}/${id}`, studentData,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    deleteStudent(id) {
        return axios.delete(`${endpoint}/${id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },
    fetchAllStudents() {
        return axios.get(endpoint,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },
};
