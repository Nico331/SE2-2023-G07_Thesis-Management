import axios from '../axiosInstance';

const endpoint = '/proposals';

export default {
    fetchProposal(id) {
        return axios.get(`${endpoint}/${id}`);
    },

    fetchAllProposals() {
        return axios.get(endpoint);
    },

    createProposal(proposalData) {
        return axios.post(endpoint, proposalData);
    },
};
