import { useNavigate } from "react-router-dom";

const PaymentSuccess = ({sellerName, amount}) => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12 center">
                    <h3>Payment of ${amount} to {sellerName} is successful!</h3>
                    <br />
                    <a href="#" className="cancel" onClick={()=>{
                        navigate("/");
                    }}>
                        Go Home
                    </a>
                </div>
            </div>
        </div>
    )
};

export default PaymentSuccess;