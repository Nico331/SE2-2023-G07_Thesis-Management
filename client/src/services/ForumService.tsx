import axios from "axios";
import {Topic} from "../types/Forum";

export const getTopics = async (): Promise<Topic[]> => {
    try {
        const response = await axios.get('http://localhost:8081/API/forums', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
};

export const createTopic = async (topic: any): Promise<any> =>{
    axios.post('http://localhost:8081/API/forums/new', topic, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.error('Error creating forum:', error);
            return error;
        });
}

export const getTheses = async () => {
    const res = await axios.get("http://localhost:8081/API/requestProposals/ongoingRequestProposals",
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
    return res.data
}

export const getTopic = async (forumId: string) => {
    const res = await axios.get(`http://localhost:8081/API/forums/${forumId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
    return res.data
}
