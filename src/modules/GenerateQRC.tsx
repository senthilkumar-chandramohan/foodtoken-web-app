import { useRef, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useScreenshot } from 'use-react-screenshot';

function ShareButtons({ message, url }) {
    const shareViaWhatsApp = () => {
      window.open(`whatsapp://send?text=${encodeURIComponent(message)}&‌url=${encodeURIComponent(url)}`);
    };
  
    return (
      <div>
        <button className="icon whatsapp" onClick={shareViaWhatsApp}>Share QR Code</button>
      </div>
    );
}

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
                    <ShareButtons message={`Pay ${sellerName} using this QR Code`} url={image} />
                }
            </div>
        </>
    )
};

export default GenerateQRC;
