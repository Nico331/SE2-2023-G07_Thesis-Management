import axios from '../axiosInstance';

const endpoint = '/proposals';

export default {
    getProposalById(id) {
        return axios.get(`${endpoint}/${id}`);
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
};
