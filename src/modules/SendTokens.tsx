import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PaymentSuccess from "./PaymentSuccess";
import { SERVER_URL } from "../utils/constants";

const SendTokens = (props) => {
    const [success, setSuccess] = useState(false);
    const [note, setNote] = useState('');
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();
    const {
        accountID,
        sellerName,
    } = props;

    setAmount(props.amount);

    const updateNote = (e) => {
        setNote(e.target.value);
    }

    const updateAmount = (e) => {
        setAmount(e.target.value);
    }

    const paySeller = () => {
        fetch(`${SERVER_URL}/api/consumer/send-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fromAccountID: window.localStorage.getItem('accountID'),
                toAccountID: accountID,
                amount,
                note,
            }),
        }).then((response) => {
            console.log(response);
            setSuccess(true);
        }).catch((err) => {
            setSuccess(false);
            console.log(err);
        });
    }

    if (success) {
        return (<PaymentSuccess sellerName={sellerName} amount={amount} />)
    }

    return (
        <div id="send-tokens" className="send-tokens">
            {
                success===false
                ?<div className="error">Error while paying seller, please try again</div>
                :<></>
            }
            <h3>Paying {sellerName}</h3>
            <span className="token-logo">₹</span><input type="number" id="amount" className="amount" value={amount} onChange={updateAmount} />
            <input type="text" className="note" id="note" placeholder="Add a note" value={note} onChange={updateNote} />
            <button id="sendTokens" className="pay" onClick={paySeller}>Pay</button>
            <a className="cancel" onClick={()=>{
                navigate("/");
            }}>Cancel</a>
        </div>
    )
};

export default SendTokens;
