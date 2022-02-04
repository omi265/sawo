import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "./App.css";
import L from "leaflet";
import Sawo from "sawo";

const api_key = "at_uSCpMmWvjI0jO8GWetMeSe5HtBwHI";
function GetIcon() {
  return L.icon({
    iconUrl: require("./icon-location.png"),
    iconSize: 50,
  });
}

function App() {
  const [input, setInput] = useState("");
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [time, setTime] = useState("");
  const [postal, setPostal] = useState("");
  const [isp, setIsp] = useState("");
  const [ip, setIp] = useState();
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function def_loc(inp) {
    setError("");
    fetch(
      "https://geo.ipify.org/api/v2/country,city?apiKey=" +
        api_key +
        "&ipAddress=" +
        inp
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.code === 422) {
          setError(json.messages);
        } else {
          setLatitude(json.location.lat);
          setLongitude(json.location.lng);
          setCity(json.location.city);
          setRegion(json.location.region);
          setTime(json.location.timezone);
          setPostal(json.location.postalCode);
          setIsp(json.isp);
          setIp(json.ip);
        }
      });
  }

  function handleClick() {
    if (input !== "") {
      def_loc(input);
    } else {
      def_loc("");
    }
  }

  useEffect(() => {
    const config = {
      // should be same as the id of the container created on 3rd step
      containerID: "sawo-container",
      // can be one of 'email' or 'phone_number_sms'
      identifierType: "phone_number_sms",
      // Add the API key copied from 2nd step
      apiKey: "727d5a5e-8938-44a1-9a4f-86f0c7db4d4e",
      // Add a callback here to handle the payload sent by sdk
      onSuccess: (payload) => {
        setIsLoggedIn(true);
      },
    };
    let sawo = new Sawo(config);
    sawo.showForm();
    def_loc("");
  }, []);

  console.log(error);

  return (
    <div className="App">
      
      {/* // Login not working, therefore only container exists and the application is still running */}

      {/* {isLoggedIn ? <h4 className="alert">LOGGED IN</h4> 
      : <div>
        <div
          id="sawo-container"
          style={{ height: "300px", width: "400px" }}
        ></div>
      </div>
      } */}

      <div>
        <div
          id="sawo-container"
          style={{ height: "300px", width: "400px" }}
        ></div>
      </div>

      <div>
        <div className="banner">
          <h1 class="title">IP Address Tracker</h1>
          <div className="searchbox">
            <input
              className="input_box"
              type="text"
              placeholder="Search for any IP address or domain"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            ></input>
            <button className="search_arrow" onClick={handleClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
                <path
                  fill="none"
                  stroke="#FFF"
                  stroke-width="3"
                  d="M2 1l6 6-6 6"
                />
              </svg>
            </button>
            {error ? <h4 className="alert">{error}</h4> : <h4></h4>}
          </div>
        </div>
        <div className="desc_box">
          <div class="description">
            <h4 class="desc_title">IP Address</h4>
            <span>{ip}</span>
          </div>
          <div class="description">
            <h4 class="desc_title">Location</h4>
            <span>
              {city}, {region}, {postal}
            </span>
          </div>
          <div class="description">
            <h4 class="desc_title">Timezone</h4>
            <span>UTC {time}</span>
          </div>
          <div class="description description_last">
            <h4 class="desc_title">ISP</h4>
            <span>{isp}</span>
          </div>
        </div>
        <MapContainer
          key={JSON.stringify([latitude, longitude])}
          center={[latitude, longitude]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]} icon={GetIcon()}></Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
