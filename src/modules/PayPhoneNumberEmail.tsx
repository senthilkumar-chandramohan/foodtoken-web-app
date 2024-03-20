import { useState, useEffect } from 'react';
import codes from 'country-calling-code';
import { useAuth } from '../contexts/AuthContext';
import { SERVER_URL } from "../utils/constants";
import SendTokens from './SendTokens';
import CountryDropdown from './CountryDropdown';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;

interface Seller {
  id: string,
  firstName: string,
}

const PayPhoneNumberEmail = () => {
  
  const {
    user: { 
      country,
    }
  } = window;

  const [showPhone, setShowPhone] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [status, setStatus] = useState('');
  const [phoneSellers, setPhoneSellers] = useState([]);
  const [emailSellers, setEmailSellers] = useState([]);
  const [countryCode, setCountryCode] = useState(country || 'US');
  const [callingCode, setCallingCode] = useState(codes.find(code=>code.isoCode2 === country)?.countryCodes[0] || '');
  const [selectedSeller, setSelectedSeller] = useState({sellerId: '', sellerName: ''});
  const { currentUser } = useAuth();
  const { accessToken } = currentUser;
  
  const loadSellers = (e?) => {
    console.log(e);
    const value = e ? e.target.value : phoneNumber;
    let targetType;
    console.log(callingCode + phoneNumber);

    if (e) {
      targetType = e.target.getAttribute('type');

      if (targetType === 'email') {
        setEmailAddress(value);
      } else {
        setPhoneNumber(value);
      }  
    }

    if (value.length < 2) {
      setPhoneSellers([]);
      return; // Too short for suggestions
    }

    fetch(`${SERVER_URL}/api/consumer/sellers?value=${e && targetType === 'email' ? value : callingCode + value}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
      },
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        response.json().then((data) => {
          console.log(data);
          if (targetType === 'email') {
            setEmailSellers(data);
          } else {
            setPhoneSellers(data);
          }
          setStatus('');
        });
      }
    }).catch((err) => {
      setStatus('Error loading sellers list!');
      console.log(err);
    });
  }
  useEffect(() => {
    loadSellers();
  }, [callingCode]);

  const openSeller = () => {

  }

  const cancelAction = () => {
    setSelectedSeller({...selectedSeller, sellerId: '', sellerName: ''});
  }

  const paySeller = (e) => {
    const sellerId = e.target.getAttribute('data-seller-id');
    const sellerName = e.target.getAttribute('data-seller-name');

    setSelectedSeller({...selectedSeller, sellerId, sellerName});
  }

  if (selectedSeller) {
    const {
      sellerId,
      sellerName,
    } = selectedSeller;

    if (sellerId) {
      return (
        <SendTokens toUserId={sellerId} sellerName={sellerName} amount="" cancelAction={cancelAction} />
      )
    }
  }

  return (
    <div className="pay-phone-number-email">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <button className={`tab ${showPhone?'active':''}`} onClick={()=>setShowPhone(true)}>Phone</button>
          </div>
          <div className="col-6">
            <button className={`tab ${!showPhone?'active':''}`} onClick={()=>setShowPhone(false)}>Email</button>
          </div>
        </div>
      </div>

      {
        showPhone &&
          <div className="phone container">
            <div className="row">
              <div className="col-4">
                <CountryDropdown countryCode={countryCode} callingCode={callingCode} setCountryCode={setCountryCode} setCallingCode={setCallingCode} />
              </div>
              <div className="col-8">
                <input className="phone" maxLength={10} type="tel" onKeyUp={loadSellers} value={phoneNumber} onChange={loadSellers} placeholder="Start typing..." />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <ul className='sellers'>
                  {
                    phoneSellers.map((seller: Seller) => {
                      return (
                        <li key={seller.id} onClick={openSeller}>
                          <p>{seller.firstName}</p>
                          <button data-seller-id={seller.id} data-seller-name={seller.firstName} onClick={paySeller}>Pay</button>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
      }

      {
        !showPhone &&
          <div className="email container">
            <div className="row">
              <div className="col-12">
                <input type="email" className='email' onKeyUp={loadSellers} placeholder='Start typing email address...' value={emailAddress} onChange={loadSellers} />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <ul className='sellers'>
                  {
                    emailSellers.map((seller: Seller) => {
                      return (
                        <li key={seller.id} onClick={openSeller}>
                          <p>{seller.firstName}</p>
                          <button data-seller-id={seller.id} data-seller-name={seller.firstName} onClick={paySeller}>Pay</button>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
      }
      <div id="status">{status}</div>
    </div>
  );
};

export default PayPhoneNumberEmail;
