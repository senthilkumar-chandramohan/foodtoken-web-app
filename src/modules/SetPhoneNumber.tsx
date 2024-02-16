import { useState } from 'react';

const SetPhoneNumber = () => {
    const [status, setStatus] = useState('');
    const [phone, setPhone] = useState('');

    const updatePhone = (e) => {
        setPhone(e.target.value);
    };

    const setPhoneNumber = () => {
//        localStorage.setItem('userId', userId);
        window.localStorage.setItem('userId', phone);
        setStatus('Phone number set');
    }

    return (
        <div className='set-phone-no'>
            <br/><br/>
            <label htmlFor="phoneNumber">Phone Number</label>
            <br/>
            <input id="phoneNumber" type="number" value={phone} onChange={updatePhone} />
            <br/><br/>
            <button onClick={setPhoneNumber}>Set</button>
            <div id="status">{status}</div>
        </div>
    )
};

export default SetPhoneNumber;
