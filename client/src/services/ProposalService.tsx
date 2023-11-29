import axios from '../axiosInstance';

const endpoint = '/proposals';

export default {
    getProposalById(id) {
        return axios.get(`${endpoint}/${id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    getAllByStudent(studentId) {
        return axios.get(`${endpoint}/student/${studentId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
    },

    fetchAllProposals() {
        return axios.get(endpoint,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    createProposal(proposalData) {
        return axios.post(endpoint, proposalData,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    deleteProposal(id) {
        return axios.delete(`${endpoint}/${id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    updateProposal(id, updatedprop){
        return axios.put(`${endpoint}/${id}`, updatedprop,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    }
};
