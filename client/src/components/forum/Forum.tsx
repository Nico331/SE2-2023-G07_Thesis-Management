// HomePage.tsx
import React, { useState, useEffect } from 'react';
import ForumTopic from './ForumTopic';
import { Topic } from '../../types/Forum';
import {getTopics} from "../../services/ForumService";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Forum: React.FC = () => {
    const [forums, setForums] = useState<Topic[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const topics = getTopics();
        topics.then(topics=>{
            setForums(topics)
        }).catch(e=>{
            console.log(e);
        })
    },[])

    return (
        <div>
            <h1 style={{paddingTop: 100}}>Forum Topics</h1>
            {forums.map(forum => <ForumTopic key={forum.id} topic={forum} />)}
            <div style={{paddingTop: 40}}>
                <Button onClick={()=>{
                    navigate("/forum/new")
                }}>
                    Create new topic
                </Button>
            </div>
        </div>
    );
};

export default Forum;
