import axios from '../axiosInstance';

const endpoint = '/appliedProposal';

export default {

    getApplicationByStudentId(studentId) {
        return axios.get(`${endpoint}/bystudent/${studentId}`);
    },

    fetchAllApplications() {
        return axios.get(endpoint);
    },

    createApplication(application, fileDTO){

        console.log(fileDTO)
        return axios.post(`${endpoint}/apply/${application.proposalId}/${application.studentId}`, fileDTO, {
            headers: {
                'Content-Type': 'application/json',
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
