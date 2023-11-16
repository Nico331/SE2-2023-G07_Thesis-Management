import axios from '../axiosInstance';

const endpoint = '/appliedProposal';

export default {

    getApplicationByStudentId(studentId) {
        return axios.get(`${endpoint}/${studentId}`);
    },

    fetchAllApplications() {
        return axios.get(endpoint);
    },

    createApplication(application){
        return axios.post(`${endpoint}/apply/${application.proposalId}/${application.studentId}`);
    }
};
