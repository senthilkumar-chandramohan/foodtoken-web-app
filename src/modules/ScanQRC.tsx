import { useEffect, useState, useRef } from 'react';
import QrcReader from 'react-qr-scanner';
import SendTokens from './SendTokens';

function ScanQRC() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const qrReader:any = useRef(null);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [scanData, setScanData] = useState({
        userId: '',
        sellerName: '',
        amount: ''
    });

    function handleScan(result) {
        if (result) {
            console.log('result', result);
            setScanData(JSON.parse(result?.text));
        }
    }

    function handleError(err) {
        console.error(err);
    }

    const detectCamera = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    facingMode: { exact: "user" },
                },
            });
        } catch(err) {
            setErrorMessage("Unable to open rear camera!, using front camera.");
            await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    facingMode: { exact: "environment" },
                },
            });
        }

        await navigator.mediaDevices.enumerateDevices();
    
        setPermissionGranted(true);
    };

    useEffect(() => {
        (async function effectDetectCamera() {
          await detectCamera();
        })();
    }, []);

    const openImageDialog = () => {
        if (qrReader.current) {
            qrReader.current.openImageDialog();
        }
    }

    const previewStyle = {
        width: '100%'
    }

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

    return permissionGranted ? (
        <div>
            <QrcReader
                ref={qrReader}
                onError={handleError}
                onScan={handleScan}
                style={previewStyle}
                legacyMode={true}
                // constraints={{
                //     video: {
                //         facingMode: { exact: "environment" },
                //     }
                // }}
            />
            { errorMessage && 
                <p className="center error">{errorMessage}</p>
            }
            <button id="uploadFromGallery" onClick={openImageDialog}>Upload QR Image</button>
        </div>
    )
    :
    <div>Initializing camera...</div>
}

export default ScanQRC;
