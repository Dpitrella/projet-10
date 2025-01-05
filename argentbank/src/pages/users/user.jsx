import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setFirstName, setLastName, setUserName } from '../../redux/userSlice';
import './user.css';

function User() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);
  const [isEditing, setIsEditing] = useState(false);
  
  const [editForm, setEditForm] = useState({
    username: '',
    firstName: '',
    lastName: ''
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching user data');
      }

      const data = await response.json();
      dispatch(setUser({
        email: data.body.email,
        firstName: data.body.firstName,
        lastName: data.body.lastName,
        userName: data.body.userName
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEditName = () => {
    setIsEditing(true);
    setEditForm({
      username: userData.userName || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || ''
    });
  };

  const handleSaveName = async () => {
    dispatch(setFirstName(editForm.firstName));
    dispatch(setLastName(editForm.lastName));
    dispatch(setUserName(editForm.username));
    setIsEditing(false);
    
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  if (!userData.email) {
    return <div>Loading...</div>;
  }

  return (
    <div className="body">
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back</h1>
          {isEditing ? (
            <form className="form-edit-name">
              <div className="inpt-form">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editForm.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="inpt-form">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={editForm.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="inpt-form">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={editForm.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="buttons-form">
                <button type="button" onClick={handleSaveName}>Save</button>
                <button type="button" onClick={handleCancelEdit}>Cancel</button>
              </div>
            </form>
          ) : (
           <h2 className="welcome-user-name">{userData.firstName} {userData.lastName}!</h2> 
          )}

          {!isEditing && (
            <button className="edit-button" onClick={handleEditName}>Edit Name</button>
          )}
        </div>

        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default User;
