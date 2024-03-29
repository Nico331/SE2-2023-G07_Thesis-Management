import axios from '../axiosInstance';

const endpoint = '/appliedProposal';

export default {

    getApplicationByStudentId(studentId) {
        return axios.get(`${endpoint}/bystudent/${studentId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    fetchAllApplications() {
        return axios.get(endpoint,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    createApplicationWithFile(application, fileDTO){

        return axios.post(`${endpoint}/apply/${application.proposalId}/${application.studentId}`, fileDTO,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    createApplication(proposalId, studentId){

        return axios.post(`${endpoint}/apply/${proposalId}/${studentId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    acceptApplication(applicationId){
        return axios.put(`${endpoint}/accept/${applicationId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });

    },

    rejectApplication(applicationId){
        return axios.put(`${endpoint}/reject/${applicationId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });

    },

    withdrawApplication(applicationId){
        return axios.put(`${endpoint}/withdraw/${applicationId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });

    },



    getByProfessorId(professorId){
        return axios.get(`${endpoint}/active/${professorId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },
    getByCosupervisorId(cosupervisorId){
        return axios.get(`${endpoint}/active/cosupervisor/${cosupervisorId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    getByProfessorIdArchived(professorId){
        return axios.get(`${endpoint}/archived/${professorId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },

    getByCosupervisorIdArchived(professorId){
        return axios.get(`${endpoint}/archived/cosupervisor/${professorId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    }

};
