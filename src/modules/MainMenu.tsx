import { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { doSignOut } from "../firebase/auth";

declare global {
    interface Window {
        user: {
            displayName: string,
            email: string,
            photoURL: string,
        };
    }
}

function MainMenu() {
    const navigate = useNavigate();
    const [sidebarVisible, setSidebarVisibility] = useState(false);

    const toggleSidebarVisibility = () => {
        setSidebarVisibility(!sidebarVisible);
    }

    const {
        displayName,
        email,
        photoURL,
    } = window.user;

    return (
      <>
        <div id="burgerMenu" className="burger-menu" onClick={toggleSidebarVisibility}></div>
        <div id="sidebar" className={`sidebar ${sidebarVisible?'show':''}`}>
            <div className="close" onClick={toggleSidebarVisibility}>x</div>
            <div className="container center">
                <div className="row">
                    <div className="col-12">
                        <img className="dp" src={photoURL} alt="Display Picture" />
                        <h3>{displayName}</h3>
                        <p>{email}</p>
                        <a href="#" onClick={doSignOut}>Sign Out</a>
                    </div>
                </div>
            </div>
        </div>
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
                          <p className="icon phone">Pay Phone<br />or Email</p>
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
      </>
    );
  }
  
  export default MainMenu;
  