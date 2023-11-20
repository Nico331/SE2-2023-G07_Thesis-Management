import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function VirtualClock() {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [timerId, setTimerId] = useState(null);

    useEffect(() => {
        const id = setInterval(() => {
            setDate(new Date()); // Aggiorna il clock solo se il DatePicker non è visibile
        }, 1000);

        setTimerId(id);

        return function cleanup() {
            clearInterval(timerId);
        };
    }, [showDatePicker]);

    const handleDateChange = (newDate) => {
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