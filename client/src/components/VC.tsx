import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import {Row, Col, Form, Container} from 'react-bootstrap';
import { BsCalendar } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import dayjs from 'dayjs';

type VirtualClockProps = {
    refresh: boolean;
    setRefresh: Dispatch<SetStateAction<boolean>>;
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
};

const VC: React.FC<VirtualClockProps> = ({refresh, setRefresh, date, setDate}) => {
    // const [date, setDate] = useState(dayjs());
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
        if(newDate === "") setDate(dayjs);
        else{
            setDate(dayjs(newDate));
            setShowDatePicker(false);
            setRefresh(true);
        }
        //QUI MANCA API
    };

    const handleReset = () => {
        setDate(dayjs());
        setRefresh(true);

        //QUI MANCA API
    };

    return (
        <Container className="d-flex flex-row align-items-center">
            {/*{showDatePicker ? (*/}
                <Container>
                    <Form.Group controlId="expiration">
                        {/*<Form.Label className="h3">Date:</Form.Label>*/}
                        <Form.Control
                            type="datetime-local"
                            placeholder="Enter date"
                            value={date.format('YYYY-MM-DDTHH:mm')}
                            onChange={(e) => handleDateChange(e.target.value)}
                        />
                    </Form.Group>
                </Container>
            {/*) */}
            {/*: (*/}
            {/*    <span>{date.format('HH:mm:ss')} {date.format('YYYY-MM-DD')}</span>*/}
            {/*)}*/}
            {/*<Container className="p-0 mx-0 d-flex justify-content-end" style={{maxWidth:"7vh"}}>*/}
            {/*    <BsCalendar*/}
            {/*        onClick={() => setShowDatePicker(true)}*/}
            {/*        style={{ cursor: 'pointer', fontSize: '20px'}}*/}
            {/*    />*/}
            {/*</Container>*/}
            <Container className="p-0 ms-3 d-flex justify-content-between"  style={{maxWidth:"7vh"}}>
                <FaTrash
                    onClick={handleReset}
                    style={{ cursor: 'pointer', fontSize: '20px' }}
                />
            </Container>
        </Container>
    );
}

export default VC;
