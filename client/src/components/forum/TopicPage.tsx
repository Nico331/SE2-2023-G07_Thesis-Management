import React, {useState, useEffect, useRef, useContext} from 'react';
import {ForumUser, Topic} from "../../types/Forum";
import {UserContext} from "../../contexts/UserContexts";
import {useParams} from "react-router-dom";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import dayjs from "dayjs";
import MessageText from "./MessageText";
import {getTopic, getTopics} from "../../services/ForumService";

interface Message {
    id: string;
    forumId: string;
    date: string;
    text: string;
    author: ForumUser;
    viewedBy: Array<ForumUser> | null;
    attachments: Array<string> | null;
}
interface MessagePayload {
    forumId: string;
    text: string;
    author: ForumUser;
    attachments: Array<string> | null;
}

const TopicPage: React.FC = (  ) => {
    const [messages, setMessages] = useState<Message[]>([]);
    // const [firstMessage, setFirstMessage] = useState<Message | null>(null);
    const [text, setText] = useState<string>('');
    const webSocket = useRef<WebSocket | null>(null);
    const {user, setUser} = useContext(UserContext)
    const { forumId } = useParams()
    const audio = new Audio('../iphone_sound.mp3');
    const [soundEnabled, setSoundEnabled] = useState("false");
    const [topic, setTopic] = useState<Topic | null>(null)
    const [n, setN] = useState<number>(0);
    useEffect(() => {
        const savedSoundPreference = localStorage.getItem("sound") === "true";
        setSoundEnabled(savedSoundPreference);
    }, []);
    useEffect(()=>{
       if(forumId){
           getTopic(forumId)
               .then(topic=>{
                   setTopic(topic);
               }).catch( e=> {
                   console.log(e);
               }
           );
       }
    },[forumId])
    const toggleSound = () => {
        const newSoundEnabled = ! soundEnabled;
        localStorage.setItem("sound", newSoundEnabled ? "true" : "false");
        setSoundEnabled(newSoundEnabled);
    };
    useEffect(() => {
        if(topic){
            if(!webSocket.current){
                // eslint-disable-next-line no-template-curly-in-string
                const socket = new WebSocket("ws://localhost:8081/ws?forumId="+forumId+"&user="+JSON.parse(user).id);
                webSocket.current = socket
            }
            webSocket.current.onmessage = (event) => {
                const receivedMessage:{type: string, message: Message} = JSON.parse(event.data);
                if(receivedMessage.type==="message"){
                    setMessages((prevMessages) => [receivedMessage.message, ...prevMessages]);
                } else if(receivedMessage.type==="newMessage"){
                    setMessages((prevMessages) => [...prevMessages, receivedMessage.message]);
                    setTopic({...topic, responseCount: topic.responseCount+1})
                    if(soundEnabled && receivedMessage.message.author.id!==JSON.parse(user).id){
                        audio.play()
                            .then(p=>{
                                console.log(p)
                            })
                            .catch(e=>
                            console.log(e)
                        );
                    }
                }
            };

            // return () => {
            //     if (webSocket.current) {
            //         webSocket.current.close();
            //         webSocket.current = null;
            //     }
            // };
        }
    }, [topic, soundEnabled]);

    const handleSendMessage = () => {
        if(text.trim()!==""){
            const payload: MessagePayload = {
                forumId: forumId,
                text: text,
                author: {
                    id: JSON.parse(user).id,
                    name: JSON.parse(user).name,
                    surname: JSON.parse(user).surname
                },
                attachments: null
            };
            if (webSocket.current) {
                webSocket.current.send(JSON.stringify(payload));
            }

            setText('');
        }
    };
    const GetPrevAndswers= () => {
        if(webSocket.current){
            webSocket.current.send(JSON.stringify({
                type: "getMessages",
                n: n+1,
            }))
            setN(prevState => prevState+1)
        }
    }

    return (
        <Container style={{ paddingTop: 100 }}>
            <Row className="align-items-center">
                <Col md={{ span: 6, offset: 3 }} className="text-center">
                    <h2>Forum topic</h2>
                </Col>
                <Col md={3} className="d-flex justify-content-end">
                    <button onClick={toggleSound}>
                        {soundEnabled ? '🔊' : '🔇'}
                    </button>
                </Col>
            </Row>
            {(messages && topic) ?
                <>
                    <Card key={topic.id} className="mb-3" style={{background: "#eeeeee"}}>
                        <Card.Title>
                            <div>
                                {topic.name}
                            </div>
                        </Card.Title>
                        <Card.Body>
                            <Row>
                                <Col xs={3} md={2} className="message-author-info divider-line" >
                                    <div className="author-info-box">
                                        <strong>{`${topic.author!!.name}${topic.author!!.surname}`}</strong>
                                        {/*<div>{"ruolo da aggiungere"}</div>*/}
                                        <div style={{fontSize:10}}>{dayjs(topic.creationDate).format('ddd, D MMM YYYY HH:mm:ss')}</div>
                                        <div>Answers: {topic.responseCount}</div>
                                    </div>
                                </Col>

                                <Col xs={9} md={10} className="message-text">
                                    <span style={{ whiteSpace: 'pre-wrap'}}>{topic!!.description}</span>
                                {/*<MessageText text={topic!!.description}/>*/}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Button onClick={GetPrevAndswers}> Get previous answers </Button>
                    <div style={{paddingTop:10}}>
                    {messages.map((message) => (
                        <div style={{margin: 16}}>
                            <Card key={message.id} className="mb-3">
                                <Card.Body>
                                    <Row>
                                        <Col xs={3} md={2} className="message-author-info divider-line" >
                                            <div className="author-info-box">
                                                <strong>{`${message.author.name}${message.author.surname}`}</strong>
                                                {/*<div>{"ruolo da aggiungere"}</div>*/}
                                                <div style={{fontSize:10}}>{dayjs(message.date).format('ddd, D MMM YYYY HH:mm:ss')}</div>
                                            </div>
                                        </Col>

                                        <Col xs={9} md={10} className="message-text">
                                            {/*<span style={{ whiteSpace: 'pre-wrap' }}>{message.text}</span>*/}
                                            <MessageText text={message.text}/>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                    </div>
                    <div className="message-input">
                        <Form.Group id="description" style={{paddingBottom:10}}>
                            <Form.Label className="h5">New forum message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="enter forum message"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </Form.Group>
                        <Button onClick={handleSendMessage}>Send Message</Button>
                    </div>
                </> :
                <div>Loading</div>
            }
        </Container>

    );
};

export default TopicPage;
