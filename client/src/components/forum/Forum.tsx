// HomePage.tsx
import React, {useState, useEffect, useContext} from 'react';
import ForumTopic from './ForumTopic';
import { Topic } from '../../types/Forum';
import {getTopics} from "../../services/ForumService";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {RoleContext} from "../../contexts/UserContexts";

const Forum: React.FC = () => {
    const [forums, setForums] = useState<Topic[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            const topics = getTopics();
            topics.then(topics=>{
                setForums(topics)
            }).catch(e=>{
                console.log(e);
            })
        })
    },[50])
    const { role } = useContext(RoleContext)

    return (
        <div>
            <h1 style={{paddingTop: 100}}>Forum Topics</h1>
            {forums.map(forum => <ForumTopic key={forum.id} topic={forum} />)}
            <div style={{paddingTop: 40}}>
                {
                    role!=="STUDENT" ?
                        <Button onClick={()=>{
                            navigate("/forum/new")
                        }}
                                id="new-topic-btn">
                            Create new topic
                        </Button> :
                        <></>
                }
            </div>
        </div>
    );
};

export default Forum;
