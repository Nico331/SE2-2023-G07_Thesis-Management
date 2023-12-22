import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import ClockService from "../services/ClockService";
import {VirtualClockContext} from "../contexts/VirtualClockContext";
import dayjs from "dayjs";

// type VirtualClockProps = {
//     refresh: boolean;
//     setRefresh: Dispatch<SetStateAction<boolean>>;
// };

const VC = () => {
    const [timerId, setTimerId] = useState(null);
    const [date, setDate] = useState("");
    const [dateOnForm, setDateOnForm] = useState("");

    const {refresh, setRefresh} = useContext(VirtualClockContext);

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
        await ClockService.getClock()
            .then((res) => {
                setDate(res.data.split(".")[0]);
                setDateOnForm(res.data.split(".")[0]);
            })
            .catch((error) => console.log(error));
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
        await ClockService.setClock(dateOnForm).catch((error) => console.log(error));
        setRefresh(!refresh);
    };

    const handleReset = async () => {
        await ClockService.resetClock().catch((error) => console.log(error));
        await getClock();
        setRefresh(!refresh);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Form.Group className="d-flex flex-row" controlId="expiration">
                <Form.Control
                    type="datetime-local"
                    placeholder="Enter date"
                    value={dateOnForm}
                    style={{maxWidth:"30vh"}}
                    onChange={(e) => handleDateChange(e.target.value)}
                    onKeyDown={(e) => e.preventDefault()}
                />
                <Button variant={"secondary"} className="ms-3" disabled={date === dateOnForm} onClick={setNewDate}>Set</Button>
                <Button className="ms-2" variant="danger" onClick={handleReset}>Reset</Button>
            </Form.Group>
        </Container>
    );
}

export default VC;
