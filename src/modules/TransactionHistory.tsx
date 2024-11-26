import { useState, useEffect } from "react";
import moment from "moment";
import { SERVER_URL } from "../utils/constants";
import { useAuth } from '../contexts/AuthContext';

const TransactionHistory = () => {
    const [history, setHistory] = useState([]);
    const { currentUser } = useAuth();
    const { accessToken } = currentUser;

    const defaultDP = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI1NnYyNTZIMHoiPjwvcGF0aD48cGF0aCBkPSJNMTI4IDMyYTk2IDk2IDAgMCAwLTY0LjIgMTY3LjRBNzIgNzIgMCAwIDEgMTI4IDE2MGE0MCA0MCAwIDEgMSA0MC00MCA0MCA0MCAwIDAgMS00MCA0MCA3MiA3MiAwIDAgMSA2NC4yIDM5LjRBOTYgOTYgMCAwIDAgMTI4IDMyWiIgb3BhY2l0eT0iLjIiIGZpbGw9IiNmNWY1ZjUiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjxjaXJjbGUgY3g9IjEyOCIgY3k9IjEyOCIgZmlsbD0ibm9uZSIgcj0iOTYiIHN0cm9rZT0iI2Y1ZjVmNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjE2IiBjbGFzcz0ic3Ryb2tlLTAwMDAwMCI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTI4IiBjeT0iMTIwIiBmaWxsPSJub25lIiByPSI0MCIgc3Ryb2tlPSIjZjVmNWY1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMTYiIGNsYXNzPSJzdHJva2UtMDAwMDAwIj48L2NpcmNsZT48cGF0aCBkPSJNNjMuOCAxOTkuNGE3MiA3MiAwIDAgMSAxMjguNCAwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmNWY1ZjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxNiIgY2xhc3M9InN0cm9rZS0wMDAwMDAiPjwvcGF0aD48L3N2Zz4=";

    useEffect(() => {
        const fetchData = ()=> {
            if (history.length === 0) {
                fetch(`${SERVER_URL}/api/common/txn-history`, {
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

    let lastTxnDate = moment(Date.now()+100000000).format("MMM DD, YYYY"); // Future date
    console.log("last txn date", lastTxnDate);

    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    {
                        history.length === 0 ?
                        <p>Loading Transaction History...</p> :
                        <>
                            <h3>Transaction History</h3>
                            <table>
                                {
                                    history.map((transaction) => {
                                        const {
                                            timeStamp,
                                            txnType,
                                            secondParty: {
                                                name,
                                                picture,
                                            },
                                            value,
                                            hash,
                                        } = transaction;

                                        let dateHeader;

                                        if (lastTxnDate !== moment(parseInt(timeStamp)*1000).format("MMM DD, YYYY")) {
                                            lastTxnDate = moment(parseInt(timeStamp)*1000).format("MMM DD, YYYY");
                                            dateHeader = <tr><td className="date-header" colSpan={3}>{lastTxnDate}</td></tr>;
                                        } else {
                                            dateHeader = <></>;
                                        }

                                        return (
                                            <>
                                                <>{dateHeader}</>
                                                <tr>
                                                    <td>
                                                        <a href={`https://sepolia.etherscan.io/tx/${hash}`} target="_blank">
                                                            <img className="dp" src={picture || defaultDP} />
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <p className="name">{name}</p>
                                                        <p className="date-time">{moment(parseInt(timeStamp)*1000).format("h:mm A")}</p>
                                                    </td>
                                                    <td>
                                                        <p className={`bold ${txnType}`}>${Math.round(parseFloat(value)*100)/100}</p>
                                                    </td>
                                                </tr>
                                            </>
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
