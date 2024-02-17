import { useRef, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useScreenshot } from 'use-react-screenshot';

const GenerateQRC = ({ sellerName, userId, amount = '' }) => {
    const ref = useRef(null);
    const [image, takeScreenshot] = useScreenshot();
    const getImage = () => takeScreenshot(ref.current);

    const payload = JSON.stringify({
        sellerName,
        userId,
        amount,
    });

    console.log(payload);

    function shareBase64Image(base64Data: string, imageName: string) {
        // Convert base64 to Blob
        const byteCharacters = atob(base64Data);
        const byteArrays: Uint8Array[] = [];
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: 'image/png' }); // Adjust type as needed
      
        // Share
        navigator.share({
          files: [new File([blob], imageName, { type: 'image/png' })],
          title: `Pay ${sellerName} using this QR Code`,
          text: `Pay ${sellerName} using this QR Code`,
        })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Share failed:', error));
      }
      

    const nativeShare = () => {
        shareBase64Image(image.substr(22), 'image.png');
    }

    useEffect(() => {
        getImage();
    });

    return (
        <>
            <div className='center'>
                <h4>QR Code for</h4>
                <h2 className='highlight'>{sellerName}</h2>
                {
                    amount && (<><h4>to receive an amount of</h4><h2 className="highlight token-logo">${amount}</h2></>)
                }

                <div ref={ref} style={{ margin: '30px 0', background: 'white', padding: '15px' }}>
                    <QRCode value={payload} />
                </div>

                {
                    image && 
                    <button className="icon whatsapp" onClick={nativeShare}>Share QR Code</button>
                }
            </div>
        </>
    )
};

export default GenerateQRC;
