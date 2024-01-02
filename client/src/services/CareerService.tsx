import axios from '../axiosInstance';

const endpoint = '/Career';

export default {
    fetchCareer(id) {
        return axios.get(`${endpoint}/${id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    fetchAllCareers() {
        return axios.get(`${endpoint}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },
};
