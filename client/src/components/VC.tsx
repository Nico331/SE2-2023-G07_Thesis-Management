import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import ClockService from "../services/ClockService";
import dayjs from "dayjs";

type VirtualClockProps = {
    refresh: boolean;
    setRefresh: Dispatch<SetStateAction<boolean>>;
};

const VC: React.FC<VirtualClockProps> = ({refresh, setRefresh}) => {
    const [timerId, setTimerId] = useState(null);
    const [date, setDate] = useState("");
    const [dateOnForm, setDateOnForm] = useState("");

    useEffect(() => {
        let id = setInterval(() => {
            setDateOnForm((current) => dayjs(current).add(1, 'second').format("YYYY-MM-DDTHH:mm:ss"));
            setDate((current) => dayjs(current).add(1, 'second').format("YYYY-MM-DDTHH:mm:ss"));
        }, 1000);
        setTimerId(id);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        getClock();
    }, [])

    const getClock = async () => {
        const response = await ClockService.getClock();
        setDate(response.data.split(".")[0]);
        setDateOnForm(response.data.split(".")[0]);
    };

    const handleDateChange = async (newDate) => {
        if(newDate === "") {
            setDateOnForm(date);
        }
        else{
            setDateOnForm(newDate);
        }
    };

    const setNewDate = async () => {
        setDate(dateOnForm);
        await ClockService.setClock(dateOnForm);
        setRefresh(!refresh);
    };

    const handleReset = async () => {
        await ClockService.resetClock();
        await getClock();
        setRefresh(!refresh);
    };

    return (
        <Container className="ms-3 mt-4 border" style={{borderRadius:"20px", padding: "10px", maxWidth:"42vh"}}>
            <Container className="d-flex flex-row align-items-center">
                <Form.Group className="d-flex flex-row" controlId="expiration">
                    <Form.Control
                        type="datetime-local"
                        placeholder="Enter date"
                        value={dateOnForm}
                        onChange={(e) => handleDateChange(e.target.value)}
                        onKeyDown={(e) => e.preventDefault()}
                    />
                    <Button className="ms-3" disabled={date === dateOnForm} onClick={setNewDate}>Set</Button>
                    <Button className="ms-2" variant="danger" onClick={handleReset}>Reset</Button>
                </Form.Group>
            </Container>
        </Container>
    );
}

export default VC;
