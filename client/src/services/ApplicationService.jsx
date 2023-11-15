import axios from '../axiosInstance';

const endpoint = '/API/appliedProposal';

export default {
    fetchApplication(id) {
        return axios.get(`${endpoint}/${id}`);
    },

    fetchAllApplications() {
        return axios.get(endpoint);
    },

    createApplication(application){
        return axios.post(`${endpoint}/apply/${application.proposalId}/${application.studentId}`);
    }
};
