import React, { useState } from 'react';
import './Signup.css';
import signup_gif from '../../images/Signup gif.webm';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { baseUrl, localUrl } from '../../API/api';
// require('dotenv').config("../../../.env");
import ErrorModel from '../UI/ErrorModel/ErrorModel';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [errosMade, setErrosMade] = useState(); //undefined

  const getName = e => {
    setName(e.target.value);
  };

  const getEmail = e => {
    setEmail(e.target.value);
  };

  const getPassword = e => {
    setPassword(e.target.value);
  };

  const getConfirmPassword = e => {
    setConfirmPassword(e.target.value);
  };

  const getReferralCode = e => {
    setReferralCode(e.target.value);
  };

  const onSubmitBtnClick = async e => {
    e.preventDefault();
    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      name.trim().length === 0
    ) {
      setErrosMade({
        title: 'Error',
        message: 'Field should not be empty',
      });
      return;
    }
    if (!email.trim().includes('@')) {
      setErrosMade({
        title: 'Error',
        message: 'Invalid mail!',
      });
      return;
    }

    if (name.trim().length < 5) {
      setErrosMade({
        title: 'Error',
        message: 'Name should be 5 character long!',
      });
    }

    const data = {
      name: name,
      email: email,
      password: password,
      referralCode: referralCode,
      confirmPassword: confirmPassword,
    };

    console.log(data);
    await axios
      .post(`${localUrl}/signUp`, data)
      .then(result => {
        console.log(result);
        if (
          result.status !== 200 ||
          (result.status !== 201 && result.data.isError)
        ) {
          setErrosMade({
            title: 'Error',
            message: result.data.message,
          });
          return;
        }
      })
      .catch(err => {
        console.log(err);
      });

    // let routes ()= <Navigate to="/login" />;
  };

  const onErrosMadeHandle = () => {
    setErrosMade(null);
  };
  return (
    <div>
      {errosMade && (
        <ErrorModel
          title={errosMade.title}
          message={errosMade.message}
          onErrosClick={onErrosMadeHandle}
        />
      )}
      <div className="signUpBody ">
        <div className="SignUp  d-flex ">
          <div className="SignUp__Gif mt-5">
            <video loop={true} autoPlay={true} muted={true}>
              <source
                style={{ width: '600px', height: '400px' }}
                src={signup_gif}
                type="video/webm"
              />
            </video>
          </div>
          <div className="SignUp__inputs pt-5 mt-5 ">
            <form
              onsubmit=" return myFormValidation()"
              name="signupForm"
              action=""
              className="p-2"
            >
              <h1 className="text-light signupValidation" href="#">
                SignUp
              </h1>
              <label className="mt-3">
                <input
                  name="Fullname"
                  value={name}
                  onChange={getName}
                  required
                  autocomplete="off"
                  type="text"
                  placeholder=" "
                />
                <span>Full Name</span>
              </label>{' '}
              <br />
              <label>
                <input
                  name="emailId"
                  value={email}
                  onChange={getEmail}
                  required
                  autocomplete="off"
                  type="email"
                  placeholder=" "
                />
                <span>Email</span>
              </label>{' '}
              <br />
              <label>
                <input
                  name="password"
                  value={password}
                  onChange={getPassword}
                  required
                  autocomplete="off"
                  type="password"
                  placeholder=" "
                />
                <span>Password</span>
                <p className="text-danger" id="pass"></p>
              </label>{' '}
              <br />
              <label>
                <input
                  name="cnfPassword"
                  value={confirmPassword}
                  onChange={getConfirmPassword}
                  required
                  autocomplete="off"
                  type="text"
                  placeholder=" "
                />
                <span>Confirm Password</span>
                <p className="text-danger" id="cnfPass"></p>
              </label>
              <br />
              <label>
                <input
                  name="referal"
                  type="text"
                  value={referralCode}
                  onChange={getReferralCode}
                  required
                  autocomplete="off"
                  placeholder=" "
                />
                <span>Refral Code</span>
              </label>{' '}
              <br />
              <button
                type="button"
                onClick={onSubmitBtnClick}
                className="btn__color mb-3"
              >
                Submit
              </button>
            </form>
            <p className="text-light mt-3 Signin__inputs__haveAcount">
              Already have an account?{' '}
              <NavLink
                className=" text-decoration-none text-light font-weight-bold "
                activeClassName="active"
                exact
                to="/signin"
              >
                {' '}
                <b>Sign In</b>
              </NavLink>{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
