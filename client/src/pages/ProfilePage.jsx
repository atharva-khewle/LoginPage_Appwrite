import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAge, setIsEditingAge] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');

  const navigate =useNavigate()

  useEffect(() => {

    const token = Cookies.get('token');
    const docId = Cookies.get('userID');

    if (!token || !docId) {
      navigate('/');
      return;
    }


    axios.get(`http://localhost:3001/getDatabyId?docId=${docId}`)
      .then(response => {
        setName(response.data.username);
        setLocation(response.data.location);



        if (response.data.DOB) {
          const dobDate = new Date(response.data.DOB);
          const ageDiff = Date.now() - dobDate.getTime();
          const ageDate = new Date(ageDiff);
          const age = Math.abs(ageDate.getUTCFullYear() - 1970);
          setAge(age);
          console.log(age)
        } else {
          setAge(0); 
          console.log(age)

        }
  

        console.log('User data:', response.data);
      })

      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  
  
  

  const handleEditName = () => {
    setIsEditing(true);
    setIsEditingName(true);
  };

  const handleEditAge = () => {
    setIsEditing(true);
    setIsEditingAge(true);
  };

  const handleEditLocation = () => {
    setIsEditing(true);
    setIsEditingLocation(true);
  };

  
const handleLogout = () => {
  Cookies.remove('token');
  Cookies.remove('userID');

};

  const handleCloseEditing = () => {
    setIsEditing(false);
    setIsEditingName(false);
    setIsEditingAge(false);
    setIsEditingLocation(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    const docId = Cookies.get('userID');
    const newData = {
      username: name?name:"",
      DOB: age?age:"",
      location: location?location:"",
    };
    try {
      const response = await axios.post('http://localhost:3001/updateDoc', {
        token,
        docId,
        newData,
      });
      console.log('Document updated successfully:', response.data);
      handleCloseEditing(); 
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <div className='profilepage'>
      <div className="circle2"></div>
      <div className="edit"></div>
      <img src="https://picsum.photos/400/400" alt="" className="pfp"  />

      {isEditingName ? (
        <input type="text" className="name text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
      ) : (
        <div className="name text" onClick={handleEditName}>{name?name:"name"}</div>
      )}
      
      {isEditingAge ? (
        <input type="date" className="age text" value={age} onChange={(e) => setAge(e.target.value)} />
      ) : (
        <div className="age text" onClick={handleEditAge}>Age : {age?age:"click to set age"}</div>
      )}

      {isEditingLocation ? (
        <input type="text" className="location text" placeholder="Enter location" value={location} onChange={(e) => setLocation(e.target.value)} />
      ) : (
        <div className="location text" onClick={handleEditLocation}>Location : {location?location:"click to set location"}</div>
      )}

      {isEditing && (
        <div className='buttonss'>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          <button className="btn btn-secondary" onClick={handleCloseEditing}>Close</button>

        </div>
      )}

<button className="btn btn-dark" onClick={handleLogout}>Logout</button>

    </div>
  );
};
