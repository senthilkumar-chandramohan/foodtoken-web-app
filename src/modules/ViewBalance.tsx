import { useState, useEffect } from "react";
import TransactionHistory from "./TransactionHistory";
import { SERVER_URL } from "../utils/constants";

import { useAuth } from '../contexts/AuthContext';

const ViewBalance = () => {
    const [ balance, setBalance ] = useState('');
    const [ showTransactions, setShowTransactions ] = useState(false);
    const { currentUser } = useAuth();
    const { accessToken } = currentUser;

    useEffect(() => {
        if (accessToken) {
            fetchData(accessToken);
        }
    }, [accessToken]);

    const fetchData = (accessToken) => {
        console.log(accessToken);

        fetch(`${SERVER_URL}/api/common/get-balance`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        }).then((response) => {
            response.json().then(parsedJson => {
                console.log(parsedJson);
                setBalance(parsedJson.balance);
            })
        }).catch((err) => {
            setBalance('Error fetching balance');
            console.log(err);
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    Your Balance: <span className="token-logo">$ {balance}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    {
                        !showTransactions ?
                        <button onClick={()=>{setShowTransactions(true)}}>Show Transactions</button>:
                        <TransactionHistory />
                    }
                </div>
            </div>
        </div>
    )
};

export default ViewBalance;
