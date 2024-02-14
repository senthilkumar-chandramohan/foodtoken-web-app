import QRCode from 'react-qr-code';

const GenerateQRC = ({ sellerName, accountID, amount = '' }) => {
    const payload = JSON.stringify({
        sellerName,
        accountID,
        amount,
    });

    console.log(payload);

    return (
        <div className='center'>
            <h4>Scan below code to pay</h4>
            <h2 className='highlight'>{sellerName}</h2>
            {
                amount && (<h4>an amount of<br /><span className="highlight token-logo">₹{amount}</span></h4>)
            }
            <div style={{ marginTop: '30px', background: 'white', padding: '16px' }}>
                <QRCode value={payload} />
            </div>
        </div>
    )
};

export default GenerateQRC;
