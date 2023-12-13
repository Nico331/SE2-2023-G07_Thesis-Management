import axios from '../axiosInstance';

const endpoint = '/requestProposals';

export default {

    fetchAllRequestProposals() {
        return axios.get(`${endpoint}`,{
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    acceptRquestedProposalbySecretary(RPID) {
        return axios.put(`${endpoint}/bySecretary/accept/${RPID}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    rejectRquestedProposalbySecretary(RPID) {
        return axios.put(`${endpoint}/bySecretary/reject/${RPID}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    } 
}