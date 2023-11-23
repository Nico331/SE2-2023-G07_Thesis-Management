import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { BsCalendar } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import dayjs from 'dayjs';

function VC(props) {
    const [date, setDate] = useState(dayjs());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [timerId, setTimerId] = useState(null);

    useEffect(() => {
        let id;
        if (!showDatePicker) {
            id = setInterval(() => {
                setDate((currentDate) => currentDate.add(1, 'second'));
            }, 1000);
            setTimerId(id);
        }
        return () => clearInterval(id);
    }, [showDatePicker]);

    const handleDateChange = (newDate) => {
        setDate(dayjs(newDate));
        setShowDatePicker(false);
        props.setRefresh(true);
        // Qui potresti effettuare le chiamate API necessarie
    };

    const handleReset = () => {
        setDate(dayjs());
        props.setRefresh(true);
        // Qui potresti effettuare le chiamate API necessarie
    };

    return (
        <Row>
            <Col className="p-0 ms-3" sm={1}>
                <BsCalendar
                    onClick={() => setShowDatePicker(true)}
                    style={{ cursor: 'pointer', marginLeft: '10px', fontSize: '20px', marginBottom: '30px' }}
                />
            </Col>
            <Col className="p-0" sm={1}>
                <FaTrash
                    onClick={handleReset}
                    style={{ cursor: 'pointer', marginLeft: '10px', fontSize: '20px', marginBottom: '30px' }}
                />
            </Col>
            {showDatePicker ? (
                <Col className="p-0" sm={7}>
                    <Form.Group controlId="expiration">
                        <Form.Label className="h3">Date:</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            placeholder="Enter date"
                            value={date.format('YYYY-MM-DDTHH:mm')}
                            onChange={(e) => handleDateChange(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            ) : (
                <span>{date.format('HH:mm:ss')} {date.format('YYYY-MM-DD')}</span>
            )}
        </Row>
    );
}

export default VC;
