import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import {Button, Container, Form, OverlayTrigger, Popover, Row} from 'react-bootstrap';
import { FaRegClock } from "react-icons/fa";
import ClockService from "../services/ClockService";
import {VirtualClockContext} from "../contexts/VirtualClockContext";
import dayjs from "dayjs";

export default function VC() {
    const [isScreenSmall, setIsScreenSmall] = useState(window.matchMedia('(max-width: 1240px)').matches);
    const [timerId, setTimerId] = useState(null);
    const [date, setDate] = useState("");
    const [dateOnForm, setDateOnForm] = useState("");
    const {refresh, setRefresh} = useContext(VirtualClockContext);

    useEffect(() => {
        const handleResize = () => {
            setIsScreenSmall(window.innerWidth <= 1240);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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

    const renderVCOverlay = (
        <Popover id="vc-popover">
            <Popover.Body>
                <Container className="d-flex flex-column align-items-center">
                    <Form.Group className="mb-3" controlId="expiration">
                        <Form.Control
                            type="datetime-local"
                            placeholder="Enter date"
                            value={dateOnForm}
                            style={{ maxWidth: "30vh" }}
                            rootClose={true}
                            onChange={(e) => handleDateChange(e.target.value)}
                            onKeyDown={(e) => e.preventDefault()}
                        />
                    </Form.Group>
                    <Container className="d-flex justify-content-between">
                        <Button variant={"secondary"} disabled={date === dateOnForm} onClick={setNewDate}>Set</Button>
                        <Button variant="danger" onClick={handleReset}>Reset</Button>
                    </Container>
                </Container>
            </Popover.Body>
        </Popover>
    );

    return (
        <>
        {isScreenSmall ?
            (
                <OverlayTrigger
                    trigger="click"
                    key="vc-overlay"
                    placement="bottom"
                    overlay={renderVCOverlay}
                    rootClose={true}
                >
                    <Button variant="danger">
                        <FaRegClock className="mb-1 me-1"/>
                        VirtualClock
                    </Button>
                </OverlayTrigger>
            )
            :
            <Container className="d-flex justify-content-center align-items-center">
                <Form.Group className="d-flex flex-row" controlId="expiration">
                    <Form.Control
                        type="datetime-local"
                        placeholder="Enter date"
                        value={dateOnForm}
                        style={{maxWidth:"30vh"}}
                        onChange={(e) => handleDateChange(e.target.value)}
                        onKeyDown={(e) => e.preventDefault()}
                        id="vc-input"
                    />
                    <Button variant={"secondary"} className="ms-3" disabled={date === dateOnForm} onClick={setNewDate} id="set-btn">Set</Button>
                    <Button className="ms-2" variant="danger" onClick={handleReset} id="reset-btn">Reset</Button>
                </Form.Group>
            </Container>
        }
        </>
    );
}