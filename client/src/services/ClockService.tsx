import axios from '../axiosInstance';

const endpoint = '/virtualclock';

export default {

    setClock(date){
        return axios.put(`${endpoint}/set/${date}`);
    },

    resetClock(){
        return axios.put(`${endpoint}/reset`);
    },

    getClock() {
        return axios.get(`${endpoint}/getServerClock`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    }
};