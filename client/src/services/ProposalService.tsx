import axios from '../axiosInstance';

const endpoint = '/proposals';

export default {
    getProposalById(id) {
        return axios.get(`${endpoint}/${id}`);
    },

    getAllByStudent(studentId) {
        return axios.get(`${endpoint}/student/${studentId}`)
    },

    fetchAllProposals() {
        return axios.get(endpoint);
    },

    createProposal(proposalData) {
        return axios.post(endpoint, proposalData);
    },

    deleteProposal(id) {
        return axios.delete(`${endpoint}/${id}`);
    },

    updateProposal(id, updatedprop){
        return axios.put(`${endpoint}/${id}`, updatedprop);
    }
};
