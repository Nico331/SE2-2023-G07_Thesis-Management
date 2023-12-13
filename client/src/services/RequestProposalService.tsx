import axios from '../axiosInstance';

const endpoint = '/requestProposals';

export default {
    createRequestProposal(requestData) {
        return axios.post(endpoint, requestData,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
    },
};