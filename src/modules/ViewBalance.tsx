import { useState, useEffect } from "react";
import TransactionHistory from "./TransactionHistory";
import { SERVER_URL } from "../utils/constants";

const ViewBalance = () => {
    const [balance, setBalance] = useState('...');

    useEffect(() => {
        const fetchData = ()=> {
            const accountID = window.localStorage.getItem('accountID');
            console.log(window.localStorage);

            fetch(`${SERVER_URL}/api/common/get-balance?accountID=${accountID}`, {
                method: 'GET',
            }).then((response) => {
                response.json().then(parsedJson => {
                    // code that can access both here
                    console.log(parsedJson);
                    setBalance(parsedJson.balance);
                })
                
            }).catch((err) => {
                setBalance('Error fetching balance');
                console.log(err);
            });
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    Your Balance: <span className="token-logo">₹ {balance}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <TransactionHistory />
                </div>
            </div>
        </div>
    )
};

export default ViewBalance;
