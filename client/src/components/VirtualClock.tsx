import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsCalendar } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';

function VirtualClock(props) {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [timerId, setTimerId] = useState(null);
    let currentDate = new Date();


    useEffect(() => {


        let id;

        if (!showDatePicker) {
            id = setInterval(() => {
                setDate((currentDate) => {
                    const newDate = new Date(currentDate); // Clona la data corrente
                    newDate.setSeconds(newDate.getSeconds() + 1); // Aggiunge un secondo al clone della data
                    return newDate; // Restituisce la nuova data aggiornata
                });
            }, 1000);

            setTimerId(id);
        }

        return function cleanup() {
                clearInterval(id);
            };


    }, [date]);

    const handleDateChange = (newDate) => {
        currentDate = newDate;
        clearInterval(timerId); // Stoppa l'aggiornamento del clock
        setDate(newDate); // Imposta la nuova data
        setShowDatePicker(false); // Nasconde il DatePicker
        props.setRefresh(true)
        //QUA MANCA API
    };

    const handleReset = () => {
        currentDate = new Date();
        clearInterval(timerId); // Stoppa l'aggiornamento del clock
        setDate(currentDate); // Imposta la nuova data
        props.setRefresh(true);
        //QUA MANCA API
    }

    return (
        <>
            <Row>
                {date.toLocaleTimeString()} {date.toLocaleDateString()}
                {showDatePicker ? (
                    <Col className="p-0" sm={7}>
                        <DatePicker selected={date} onChange={handleDateChange} showTimeSelect dateFormat="Pp" />
                    </Col>
                ) : (
                    <>
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
                    </>
            )}
            </Row>
        </>
    );
}

export default VirtualClock;