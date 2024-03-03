import { useNavigate } from "react-router-dom";

function MainMenu() {
    const navigate = useNavigate();

    return (
      <div className="main-menu">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <img className="header" src="/favicon.svg" height={128} />                    
                </div>
            </div>
            <div className="row">
                <div className="col-6 tile">
                    <a onClick={()=>{
                        navigate("/scan-qrc");
                    }}>
                        <p className="icon scan">Scan & Pay</p>
                    </a>
                </div>
                <div className="col-6 tile">
                    <a onClick={()=>{
                        navigate("/pay-phone-number-email");
                    }}>
                        <p className="icon phone">Pay Phone Number / Email</p>
                    </a>
                </div>
                <div className="col-6 tile">
                    <a onClick={()=>{
                        navigate("/generate-qrc");
                    }}>
                        <p className="icon qrc">Generate QRC</p>
                    </a>
                </div>
                <div className="col-6 tile">
                    <a onClick={()=>{
                        navigate("/view-balance");
                    }}>
                        <p className="icon wallet">Wallet</p>
                    </a>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default MainMenu;
  