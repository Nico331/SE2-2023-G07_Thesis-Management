import axios from '../axiosInstance';

const endpoint = '/appliedProposal';

export default {

    getApplicationByStudentId(studentId) {
        return axios.get(`${endpoint}/bystudent/${studentId}`);
    },

    fetchAllApplications() {
        return axios.get(endpoint);
    },

    createApplication(application){
        return axios.post(`${endpoint}/apply/${application.proposalId}/${application.studentId}`);
    },

    acceptApplication(applicationId){
        return axios.put(`${endpoint}/accept/${applicationId}`);

    },

    rejectApplication(applicationId){
        return axios.put(`${endpoint}/reject/${applicationId}`);

    },


};
