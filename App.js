import "./App.css";
import FormControl from "./components/FormControl";
import Header from "./components/Header";
import * as axios from "axios";
import React, { useEffect, useState } from "react";
import Map from "react-map-gl";
import mapboxgl from "mapbox-gl";

function App() {
  const [usersData, setUsersData] = useState([]);
  const [showForm, setShowForm] = useState(null);
  const accessToken =
    "pk.eyJ1IjoiYWhtYWQwMDEiLCJhIjoiY2wxbml5OWhxMHVwdDNjbzNsMHV0djNvYiJ9.ubLi-2-V7U7-kecNH_kPEw";

  const getUsersApiKey = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    axios.get(getUsersApiKey).then((res) => {
      console.log(res.data);
      setUsersData(res.data);
    });
  }, []);

  function handleFormControl(id) {
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(null);
  }

  return (
    <>
      <Header />

      {usersData.map((user) => {
        return (
          <div key={user.id} className="user">
            {showForm && <FormControl id={user.id} closeForm={closeForm} />}
            <div className="holder">
              <div className="map"></div>
              <div className="list">
                <div className="userName">
                  <h2>Name: {user.name}</h2>
                </div>
                <div className="userAddress">
                  <h2>
                    Address:{" "}
                    <a
                      href={`https://www.google.co.in/maps/place/${user.address.city}`}
                      target="__blank"
                    >
                      {" "}
                      {user.address.suite} -{user.address.street} -{" "}
                      {user.address.city} - {user.address.zipcode}
                    </a>
                    <div>
                      <button
                        style={{
                          color: "black",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                        onClick={() => handleFormControl(user.id)}
                      >
                        Add User Validation
                      </button>
                    </div>
                  </h2>
                </div>
                {
                  <Map
                    mapboxAccessToken={accessToken}
                    style={{ width: 600, height: 400 }}
                    mapStyle="mapbox://styles/mapbox/basic-v9"
                    latitude={user.address.geo.lat}
                    longitude={user.address.geo.lng}
                    zoom={2}
                  />
                }
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default App;
