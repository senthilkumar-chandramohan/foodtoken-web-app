import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import PaymentSuccess from "./PaymentSuccess";
import { SERVER_URL } from "../utils/constants";
import { useAuth } from "../contexts/AuthContext";
import Loader from "./Loader";

const SendTokens = ({
    toUserId,
    sellerName = '',
    amount,
    cancelAction,
}) => {
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        fetch(`${SERVER_URL}/api/consumer/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                toUserId,
                amount: payAmount,
                note,
            }),
        }).then(() => {
            setSuccess(true);
        }).catch((err) => {
            setError(true);
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    }

    if (success) {
        return (<PaymentSuccess sellerName={sellerName} amount={payAmount} />)
    }

    return (
        <div id="send-tokens" className="send-tokens container">
            {
                error
                ?<div className="error">Error while paying seller, please try again</div>
                :<></>
            }
            {
                loading &&
                <Loader />
            }
            <div className="row">
                <div className="col-12">
                    <h3>Paying {sellerName}</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-8" style={{position: "relative"}}>
                    <div className="amount-container" data-currency="$">
                        <input type="number" className="amount" defaultValue={amount} onChange={updatePayAmount} maxLength={5} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <input type="text" className="note" placeholder="Note" defaultValue={note} onChange={updateNote} maxLength={25} />
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <button className="btn-primary pay" onClick={paySeller}>Pay</button>
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <a href="#" className="cancel" onClick={()=>{
                        if (cancelAction) {
                            cancelAction();
                        } else {
                            navigate("/");
                        }
                    }}>
                        Cancel
                    </a>
                </div>
            </div>
        </div>
    )
};

export default SendTokens;
