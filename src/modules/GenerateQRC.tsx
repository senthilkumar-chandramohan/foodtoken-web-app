import QRCode from 'react-qr-code';

const GenerateQRC = ({ sellerName, accountID, amount}) => {
    const payload = JSON.stringify({
        sellerName,
        accountID,
        amount,
    });

    return (
        <div style={{ background: 'white', padding: '16px' }}>
            <QRCode value={payload} />
        </div>
    )
};

export default GenerateQRC;
