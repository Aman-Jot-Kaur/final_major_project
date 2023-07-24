import React, { useState, useEffect } from 'react';
import './vendorlist.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ProfileList = () => {

  const [profiles, setProfiles] = useState([]);
  const [disabling,setdisable]=useState();
  const handleDisable = (_id) => {
    // Implement the logic to disable the profile on the backend
    // You can use this function to call the backend API to disable the profile
    axios.post("http://localhost:3001/updateuserdisable", { disable: "true",_id }).then(
      (res) => {
        console.log(res)
      })
      setdisable(_id)
    alert(`Disabling profile with ID: ${_id}`);
 
  };
  const navigate = useNavigate();
  useEffect(() => {

    axios
      .get(`http://localhost:3001/getvendors`).then((res) => {
        console.log(res.data)
        setProfiles(res.data)
      }).catch(error => {
        console.log(error)
      })
  }, [disabling]);
  useEffect(() => {

    axios
      .get(`http://localhost:3001/getvendors`).then((res) => {
        console.log(res.data)
        setProfiles(res.data)
      }).catch(error => {
        console.log(error)
      })
  }, []);
  return (
    <div className="profile-list-container">
      <h2>Profile List</h2>
      <button
        onClick={() => {
          navigate(-1);
        }}
        style={{ marginBottom: "10px", width: "50px" }}
        className="outofstock"
      >
        Back
      </button>
      <ul className="profile-list">
        {profiles.map((profile) => (
          <li key={profile._id} className="profile-item">
            <p> {profile.email}{' '}
              {profile.number}{' '}
              {profile.
                displayName}</p>
            {profile.disable == "false" && <button onClick={() => handleDisable(profile._id)}>Disable</button>}
            {profile.disable == "true" && <button style={{ backgroundColor: "gray" }}>Disabled</button>}
            {profile.disable == undefined && <button onClick={() => handleDisable(profile._id)}>Disable</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;