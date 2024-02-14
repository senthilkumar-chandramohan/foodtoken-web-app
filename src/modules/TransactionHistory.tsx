import { useState, useEffect } from "react";
import moment from "moment";
import { SERVER_URL } from "../utils/constants";
import { useAuth } from '../contexts/AuthContext';

const TransactionHistory = () => {
    const [history, setHistory] = useState([]);
    const { currentUser } = useAuth();
    const { accessToken } = currentUser;

    useEffect(() => {
        const fetchData = ()=> {
            if (history.length === 0) {
                fetch(`${SERVER_URL}/api/common/get-txn-history`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                }).then((response) => {
                    response.json().then(parsedJson => {
                        // code that can access both here
                        console.log("parsedJson", parsedJson);
                        setHistory(parsedJson.txnHistory);
                    })
                    
                }).catch((err) => {
                    // setHistory('Error fetching transaction history');
                    console.log(err);
                });
            }
        };

        fetchData();

        console.log("history", history);
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    {
                        history.length === 0 ?
                        <p>Loading Transaction History...</p> :
                        <>
                            <h2>Transaction History</h2>
                            <table>
                                <tr>
                                    <th>Date/Time</th>
                                    <th>Type</th>
                                    <th>Credit From/Payment to</th>
                                    <th>Amount</th>
                                    <th>Txn Details</th>
                                </tr>
                                {
                                    history.map((transaction) => {
                                        const {
                                            timeStamp,
                                            txnType,
                                            to,
                                            value,
                                            hash,
                                        } = transaction;

                                        return (
                                            <tr>
                                                <td>{moment(parseInt(timeStamp)*1000).format("DD-MM-YYYY h:mm:ss A")}</td>
                                                <td>{txnType}</td>
                                                <td>{txnType === 'debit' ? to : 'EMPLOYER'}</td>
                                                <td>{value}</td>
                                                <td><a href={`https://mumbai.polygonscan.com/tx/${hash}`} target="_blank">Link</a></td>
                                            </tr>
                                        )
                                    })
                                }
                            </table>
                        </>
                    }
                </div>
            </div>
        </div>
    )
};

export default TransactionHistory;
