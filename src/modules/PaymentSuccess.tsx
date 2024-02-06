const PaymentSuccess = ({sellerName, amount}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    <h3>Payment of ₹{amount} to {sellerName} is successful!</h3>
                </div>
            </div>
        </div>
    )
};

export default PaymentSuccess;