import { useState } from 'react';

const SetPhoneNumber = () => {
    const [status, setStatus] = useState('');

    const setPhoneNumber = () => {
        const accountID = document?.getElementById('phoneNumber')?.value;
        localStorage.setItem('accountID', accountID);
        window.localStorage.setItem('accountID', accountID);
        setStatus('Phone number set');
    }

    return (
        <div className='set-phone-no'>
            <br/><br/>
            <label htmlFor="phoneNumber">Phone Number</label>
            <br/>
            <input id="phoneNumber" type="number" />
            <br/><br/>
            <button onClick={setPhoneNumber}>Set</button>
            <div id="status">{status}</div>
        </div>
    )
};

export default SetPhoneNumber;
