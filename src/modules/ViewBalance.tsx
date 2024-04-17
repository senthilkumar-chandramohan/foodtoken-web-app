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

        fetch(`${SERVER_URL}/api/common/token-balance`, {
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
                <div className="col-xs-12 center">
                    <h3>Wallet Balance</h3>
                    <p className="wallet-balance">$ {Math.round(parseFloat(balance)*100)/100}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 center txn-history">
                    {
                        !showTransactions ?
                        <button className="center-div" onClick={()=>{setShowTransactions(true)}}>Show Transactions</button>:
                        <TransactionHistory />
                    }
                </div>
            </div>
        </div>
    )
};

export default ViewBalance;
