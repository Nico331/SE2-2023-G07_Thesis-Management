import axios from '../axiosInstance';

const endpoint = '/appliedProposal';

export default {

    getApplicationByStudentId(studentId) {
        return axios.get(`${endpoint}/bystudent/${studentId}`);
    },

    fetchAllApplications() {
        return axios.get(endpoint);
    },

    createApplication(application, formData){
        return axios.post(`${endpoint}/apply/${application.proposalId}/${application.studentId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    acceptApplication(applicationId){
        return axios.put(`${endpoint}/accept/${applicationId}`);

    },

    rejectApplication(applicationId){
        return axios.put(`${endpoint}/reject/${applicationId}`);

    },



    getByProfessorId(professorId){
        return axios.get(`${endpoint}/${professorId}`);
    }

};
