// ForumTopic.tsx
import React from 'react';
import { Topic } from '../../types/Forum';
import {Col, Row} from "react-bootstrap";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";

interface ForumTopicProps {
    topic: Topic;
}

const ForumTopic: React.FC<ForumTopicProps> = ({ topic }) => {
    const navigate = useNavigate();
    return (
        <div className="p-3 border-bottom">
            <Row className="align-items-center">
                <Col xs={2} className="text-center">
                    <h5>{topic.responseCount}</h5>
                    <p>Answers</p>
                </Col>
                <Col xs={7}>
                    <div className="card mb-3">
                        <div className="card-body">
                            <h4 className="card-title">{topic.name}</h4>
                            <p className="card-text">{topic.description}</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate(`${topic.id}`)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        navigate(`${topic.id}`);
                                    }
                                }}
                                tabIndex="0"
                            >
                                Open Discussion
                            </button>
                        </div>
                    </div>
                    {/*<p style={descriptionStyle}>{topic.description}</p>*/}
                </Col>
                <Col xs={3} className="text-end">
                    <div>{`${topic.author?.name} ${topic.author?.surname}`}</div>
                    <div style={{fontSize:10}}>{dayjs(topic.creationDate).format('ddd, D MMM YYYY HH:mm:ss')}</div>
                </Col>
            </Row>
        </div>
    );
};

const descriptionStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    lineHeight: '1.5em',
    maxHeight: '4.5em',
};
export default ForumTopic;
