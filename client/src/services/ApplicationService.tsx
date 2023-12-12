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

    createApplication(application, fileDTO){

        console.log(fileDTO)
        return axios.post(`${endpoint}/apply/${application.proposalId}/${application.studentId}`, fileDTO,{
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



    getByProfessorId(professorId){
        return axios.get(`${endpoint}/active/${professorId}`,{
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
    }

};
