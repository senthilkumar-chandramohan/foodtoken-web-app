import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PaymentSuccess from "./PaymentSuccess";
import { SERVER_URL } from "../utils/constants";
import { useAuth } from '../contexts/AuthContext';

const SendTokens = ({
    toUserId,
    sellerName = '',
    amount,
    cancelAction,
}) => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [note, setNote] = useState('');
    const [payAmount, setPayAmount] = useState(amount);
    const { currentUser } = useAuth();
    const { accessToken } = currentUser;

    const navigate = useNavigate();

    const updateNote = (e) => {
        setNote(e.target.value);
    }

    const updatePayAmount = (e) => {
        setPayAmount(e.target.value);
    }

    const paySeller = () => {
        fetch(`${SERVER_URL}/api/consumer/send-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                toUserId,
                amount,
                note,
            }),
        }).then(() => {
            setSuccess(true);
        }).catch((err) => {
            setError(true);
            console.log(err);
        });
    }

    if (success) {
        return (<PaymentSuccess sellerName={sellerName} amount={payAmount} />)
    }

    return (
        <div id="send-tokens" className="send-tokens">
            {
                error
                ?<div className="error">Error while paying seller, please try again</div>
                :<></>
            }
            <h3>Paying {sellerName}</h3>
            <span className="token-logo">$</span>
            <input type="number" className="amount" defaultValue={amount} onChange={updatePayAmount} />
            <input type="text" className="note" placeholder="Add a note" defaultValue={note} onChange={updateNote} />
            <button className="pay" onClick={paySeller}>Pay</button>
            <a href="#" className="cancel" onClick={()=>{
                if (cancelAction) {
                    cancelAction();
                } else {
                    navigate("/");
                }
            }}>Cancel</a>
        </div>
    )
};

export default SendTokens;
