import axios from '../axiosInstance';

const endpoint = '/requestProposals';

export default {
    createRequestProposal(requestData) {
        return axios.post(endpoint, requestData,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },
    updateRequestProposal(requestData, id) {
        return axios.put(endpoint + `${'/'+id}`, requestData,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },
    fetchAllRequestProposals() {
        return axios.get(endpoint,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    deleteRequestProposals(id) {
        return axios.delete(`${endpoint}/${id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    acceptRequestProposalProf(id){
        return axios.put(`${endpoint}/bySupervisor/accept/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    rejectRequestProposalProf(id){
        return axios.put(`${endpoint}/bySupervisor/reject/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    }
};