import axios from '../axiosInstance';

const endpoint = '/degrees';

export default {
    fetchDegree(codDegree) {
        return axios.get(`${endpoint}/${codDegree}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    fetchAllDegrees() {
        return axios.get(endpoint,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },
};
