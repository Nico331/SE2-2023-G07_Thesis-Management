import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import {Form, Container, Button} from 'react-bootstrap';
import dayjs from 'dayjs';
import ClockService from "../services/ClockService";

type VirtualClockProps = {
    refresh: boolean;
    setRefresh: Dispatch<SetStateAction<boolean>>;
};

const VC: React.FC<VirtualClockProps> = ({refresh, setRefresh}) => {
    const [timerId, setTimerId] = useState(null);
    const [date, setDate] = useState(dayjs);

    useEffect(() => {
        let id = setInterval(() => {
            setDate((currentDate) => currentDate.add(1, 'second'));
        }, 1000);
        setTimerId(id);
        return () => clearInterval(id);
    }, []);

    const handleDateChange = async (newDate) => {
        if(newDate === "") {
            setDate(dayjs());
            await ClockService.setClock(dayjs().format('YYYY-MM-DDTHH:mm:ss'));
            // await ClockService.setClock(date.format('YYYY-MM-DDTHH:mm:ss'));
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
        <Container className="ms-3 mt-4 border" style={{borderRadius:"20px", padding: "10px", maxWidth:"52vh"}}>
            <Container className="d-flex flex-row align-items-center">
                <Form.Group className="d-flex flex-row" controlId="expiration">
                    <Form.Control
                        type="datetime-local"
                        placeholder="Enter date"
                        value={date.format('YYYY-MM-DDTHH:mm:ss')}
                        onChange={(e) => handleDateChange(e.target.value)}
                    />
                    <Button className="ms-3" type="submit">Set</Button>
                    <Button className="ms-2" variant="danger" onClick={handleReset}>Reset</Button>
                </Form.Group>
            </Container>
        </Container>
    );
}

export default VC;
