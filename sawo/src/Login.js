import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sawo from "sawo";
import "./Home.css";

function Login(props) {
  const navigate = useNavigate();
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const config = {
      // should be same as the id of the container created on 3rd step
      containerID: "sawo-container",
      // can be one of 'email' or 'phone_number_sms'
      identifierType: "email",
      // Add the API key copied from 2nd step
      apiKey: "727d5a5e-8938-44a1-9a4f-86f0c7db4d4e",
      // Add a callback here to handle the payload sent by sdk
      onSuccess: (payload) => {
        props.onChange();
        // setIsLoggedIn(true);
        // console.log(isLoggedIn);
        navigate("/home");
      },
    };
    let sawo = new Sawo(config);
    sawo.showForm();
  }, []);
  //   console.log(isLoggedIn)

  return (
    <div>
        <div className="banner">
            <h1 class="title">IP Address Tracker</h1>
        </div>
      <div
        id="sawo-container"
        style={{ height: "500px", width: "800px", margin: "auto" }}
      ></div>
      {/* {isLoggedIn ? <h4>True</h4> : <h4>False</h4>} */}
    </div>
  );
}

export default Login;
