import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function VirtualClock() {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [timerId, setTimerId] = useState(null);
    let currentDate = new Date();

    useEffect(() => {


            const id = setInterval(() => {
                setDate((currentDate) => {
                    const newDate = new Date(currentDate); // Clona la data corrente
                    newDate.setSeconds(newDate.getSeconds() + 1); // Aggiunge un secondo al clone della data
                    return newDate; // Restituisce la nuova data aggiornata

                }); // Aggiorna il clock solo se il DatePicker non è visibile
            }, 1000);

            setTimerId(id);

            return function cleanup() {
                clearInterval(timerId);
            };


    }, []);

    const handleDateChange = (newDate) => {
        currentDate = newDate;
        clearInterval(timerId); // Stoppa l'aggiornamento del clock
        setDate(newDate); // Imposta la nuova data
        setShowDatePicker(false); // Nasconde il DatePicker
    };

    return (
        <>
            <span>
                {date.toLocaleTimeString()} {date.toLocaleDateString()}
                {showDatePicker ? (
                    <DatePicker selected={date} onChange={handleDateChange} showTimeSelect dateFormat="Pp" />
                ) : (
                    <Button
                        variant="primary"
                        type="button"
                        onClick={() => setShowDatePicker(true)}
                        style={{ marginRight: '20px' }}
                    >
                        Change clock
                    </Button>
                )}
            </span>
        </>
    );
}

export default VirtualClock;