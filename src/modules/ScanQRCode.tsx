import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import SendTokens from './SendTokens';

function ScanQRCode() {
    // const [errorMessage, setErrorMessage] = useState('');
    const [scanData, setScanData] = useState({
        userId: '',
        sellerName: '',
        amount: ''
    });

    useEffect(() => {
        let html5QrcodeScanner;
        
        function onScanSuccess(decodedText, decodedResult) {
            let lastResult;

            if (decodedText !== lastResult) {
                lastResult = decodedText;
                // Handle on success condition with the decoded message.
                console.log(`Scan result ${decodedText}`, decodedResult);
                html5QrcodeScanner.clear();
                html5QrcodeScanner = null;
                setScanData(JSON.parse(decodedResult?.result?.text));
            }
        }

        try {
            html5QrcodeScanner = new Html5QrcodeScanner(
                "qr-reader",
                {
                    fps: 10,
                    qrbox: 250,
                    videoConstraints: {
                        facingMode: { exact: "environment" },
                    }
                },
                false
            );

            html5QrcodeScanner.render(onScanSuccess,() => {
                console.log("Error scanning QR Code!");
            });
        } catch (err) {
            console.log(err);
        }
    }, []);

    if (scanData) {
        const {
            userId,
            sellerName,
            amount,
        } = scanData;

        if (userId?.length) {
            return (
                <SendTokens toUserId={userId} sellerName={sellerName} amount={amount} cancelAction={null} />
            )
        }
    }

    return (
        <div className="container">
            <div className="col-12">
                <div id="qr-reader" style={{minWidth:"320px", width: "100%"}}></div>
                <div id="qr-reader-results"></div>
                {/* { errorMessage && 
                    <p className="center error">{errorMessage}</p>
                } */}
            </div>
        </div>
    );
}

export default ScanQRCode;
