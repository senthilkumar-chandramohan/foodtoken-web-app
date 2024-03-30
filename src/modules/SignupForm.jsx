import { useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { SERVER_URL } from '../utils/constants';

const SignupForm = () => {
    const { currentUser, setUserLoggedIn } = useAuth();
    // const [loading, setLoading] = useState(false);
    const phoneRef = useRef(null);

    const {
        displayName,
        email,
        phoneNumber,
        photoURL,
        accessToken,
    } = currentUser;

    const handleFormSubmit = (e) => {
        e.preventDefault();

        fetch(`${SERVER_URL}/api/common/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                phoneNumber: phoneRef.current.value,
            }),
          }).then((response) => {
            if (response.status === 200) {
              response.json().then((data) => {
                console.log(data);
                const {
                    country
                } = data;

                window.user = {
                    accessToken,
                    country,
                    displayName,
                    email,
                    photoURL,
                };

                setUserLoggedIn(true);
              });
            }
          }).catch((err) => {
            console.log(err);
          });
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <img src={photoURL} alt="display picture" />
                            <h2>{displayName}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h3>{email}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {
                                phoneNumber && (
                                    <p>{phoneNumber}</p>
                                )
                            }
                            {
                                !phoneNumber && (
                                    <input ref={phoneRef} type="tel" maxLength={10} name="phone" placeholder="Provide 10-digit phone number" />
                                )
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <input type="submit" value="Signup for an account" />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SignupForm;
