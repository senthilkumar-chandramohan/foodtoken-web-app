import { useEffect, useState } from 'react';
import QrcReader from 'react-qr-scanner';
import SendTokens from './SendTokens';

function ScanQRC() {
    // const qrReader = useRef(null);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [scanData, setScanData] = useState(null);

    function handleScan(result) {
        console.log('result', result);
        if (result) {
            setScanData(JSON.parse(result?.text));
        }
    }

    function handleError(err){
        console.error(err);
    }

    const detectCamera = async () => {
        await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
        await navigator.mediaDevices.enumerateDevices();
    
        setPermissionGranted(true);
    };

    useEffect(() => {
        (async function effectDetectCamera() {
          await detectCamera();
        })();
    }, []);

    // const openImageDialog = () => {
    //     console.log(qrReader);
    //     qrReader.current.openImageDialog();
    // }

    const previewStyle = {
        width: '100%'
    }

    if (scanData) {
        const {
            accountID,
            sellerName,
            amount,
        } = scanData;
    
        if (accountID?.length) {
            return (
                <SendTokens accountID={accountID} sellerName={sellerName} amount={amount} />
            )
        }
    }

    return permissionGranted ? (
        <div>
            <QrcReader
                onError={handleError}
                onScan={handleScan}
                style={previewStyle}
                facingMode="rear"
                // constraints={ {facingMode: 'environment'} }
                // constraints={{
                //     facingMode: {
                //         exact: 'environment'
                //     }
                // }}
                // key="environment"
            />
            {/* <button id="uploadFromGallery" onClick={openImageDialog}>Upload QR Image</button> */}
        </div>
    )
    : 
    <div>Initializing camera...</div>
}

export default ScanQRC;
