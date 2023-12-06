import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import {Row, Col, Form, Container, Button} from 'react-bootstrap';
import { BsCalendar } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import dayjs from 'dayjs';
import ClockService from "../services/ClockService";

type VirtualClockProps = {
    refresh: boolean;
    setRefresh: Dispatch<SetStateAction<boolean>>;
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
};

const VC: React.FC<VirtualClockProps> = ({refresh, setRefresh, date, setDate}) => {
    const [timerId, setTimerId] = useState(null);

    useEffect(() => {
        let id = setInterval(() => {
            setDate((currentDate) => currentDate.add(1, 'second'));
        }, 1000);
        setTimerId(id);
        return () => clearInterval(id);
    }, []);

    const handleDateChange = async (newDate) => {
        if(newDate === "") {
            // setDate(dayjs);
            await ClockService.setClock(date.format('YYYY-MM-DDTHH:mm:ss'));
        }
        else{
            setDate(dayjs(newDate));
            await ClockService.setClock(newDate);
        }
        setRefresh(!refresh);
    };

    const handleReset = async () => {
        setDate(dayjs());
        await ClockService.resetClock();
        setRefresh(!refresh);
    };

    return (
        <Container className="d-flex flex-row align-items-center">
            <Container>
                <Form.Group controlId="expiration">
                    <Form.Control
                        type="datetime-local"
                        placeholder="Enter date"
                        value={date.format('YYYY-MM-DDTHH:mm:ss')}
                        onChange={(e) => handleDateChange(e.target.value)}
                    />
                </Form.Group>
            </Container>
            <Container className="p-0 ms-3 d-flex justify-content-between"  style={{maxWidth:"7vh"}}>
                {/*<FaTrash*/}
                {/*    onClick={handleReset}*/}
                {/*    style={{ cursor: 'pointer', fontSize: '20px' }}*/}
                {/*/>*/}
                <Button variant="danger" onClick={handleReset}>Reset</Button>
            </Container>
        </Container>
    );
}

export default VC;
