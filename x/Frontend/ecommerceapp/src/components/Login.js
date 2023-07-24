import React, { useState } from "react";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { AuthCredential } from "firebase/auth";

// Initialize Firebase with your project's configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlM7dACgX8QSRPU8PsZe7UVtvTqD4saeY",
  authDomain: "ecommerce-e81ca.firebaseapp.com",
  projectId: "ecommerce-e81ca",
  storageBucket: "ecommerce-e81ca.appspot.com",
  messagingSenderId: "518888859936",
  appId: "1:518888859936:web:39d1cacdc4abbbf37e0f45",
  measurementId: "G-QS80JQYRL6",
};

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;

    if (value.length === 0 || (value.length <= 10 && /^\d*$/.test(value))) {
      setPhoneNumber(value);
    }
  };

  const handleSignUpWithEmail = (e) => {
    e.preventDefault();
    localStorage.setItem("mail", email);

    localStorage.setItem("loggedin", true);
    axios
      .post("http://localhost:3001/userlogin", { email, password })
      .then((res) => {
        const checkrole = res.data.role;
        console.log(res.data);
        if (res.data == "password not correct") {
          alert(res.data);
          navigate("/login");
        } else if (res.data.disable == "true")
          alert("sorry account is dis-abled");
        else if (checkrole == "vendor") navigate("/vendor");
        else if (checkrole == "customer") navigate("/customer");
        else if (checkrole == "admin") navigate("/admin");
        else {
          alert("account not found");
        }
      })
      .catch((error) => {
        // Handle sign up errors
        alert(error);
      });
  };

  const handleSignUpWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    localStorage.setItem("mail", email);

    localStorage.setItem("loggedin", "true");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((userCredential) => {
        // Sign up successful, access the user data with: userCredential.user
        axios
          .post("http://localhost:3001/userloginwithgoogle", {
            email: userCredential.user.email,
          })
          .then((res) => {
            const checkrole = res.data.role;
            if (checkrole == "vendor") navigate("/vendor");
            else if (checkrole == "customer") navigate("/customer");
            else alert("account not found");
          })
          .catch((error) => {
            // Handle sign up errors
            alert("Error signing in Google:", error);
          });
      })
      .catch((error) => {
        // Handle sign up errors
        alert("Error signing up with Google:", error);
      });
  };

  const handleSignUpWithPhoneNumber = (e) => {
    e.preventDefault();
    localStorage.setItem("mail", email);

    localStorage.setItem("loggedin", "true");
    const phoneNumberWithCountryCode = `+91${phoneNumber}`;

    // Check if the reCAPTCHA container is already populated
    const recaptchaContainer = document.getElementById("recaptcha-container");
    if (recaptchaContainer.innerHTML !== "") {
      // reCAPTCHA has already been rendered, do nothing
      return;
    }

    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      recaptchaContainer,
      {
        size: "invisible",
      }
    );

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumberWithCountryCode, recaptchaVerifier)
      .then((confirmationResult) => {
        // SMS verification code sent successfully
        const verificationCode = window.prompt(
          "Please enter the verification code sent to your phone:"
        );

        confirmationResult
          .confirm(verificationCode)
          .then((userCredential) => {
            // Sign up successful, access the user data with: userCredential.user
            console.log(
              "Signing up with phone number:",
              userCredential.user,
              "Role:",
              role
            );
            // Clear the input field
            console.log(userCredential.user.phoneNumber);
            axios
              .post("http://localhost:3001/userloginwithgoogle", {
                email: userCredential.user.phoneNumber,
              })
              .then((res) => {
                const checkrole = res.data.role;
                if (checkrole == "vendor") navigate("/vendor");
                else if (checkrole == "customer") navigate("/customer");
                else alert("account not found");
              })
              .catch((error) => {
                // Handle sign up errors
                alert("Error signing in Google:", error);
              });
            setPhoneNumber("");
          })
          .catch((error) => {
            // Handle sign up errors
            alert(error);
          });
      })
      .catch((error) => {
        // Handle phone number sign-in errors
        console.log("Error signing in with phone number:", error);
        alert(error);
      });
  };

  return (
    <div className="page-container">
      <div className="login-container">
        <div className="form-container-form">
          <form>
            <div className="pass-input">
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                required
                placeholder="Email/number"
              />
            </div>
            <div>
              <div className="pass-input">
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Password"
                />
              </div>
            </div>

            <button className="sign-button" onClick={handleSignUpWithEmail}>
              Login
            </button>

            <button className="google-log-button" onClick={handleSignUpWithGoogle}>
              Login with Google
            </button>

            <p>OR</p>
            <div>
              <input
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Enter your phone Number"
                min={1000000000}
                max={9999999999}
              />
            </div>
            <div>
              <button className="phone-button" onClick={handleSignUpWithPhoneNumber}>
                Login with Otp
              </button>
            </div>
            <div>
              <button
                className="signup-link-button"
                style={{ backgroundColor: "gray" }}
                onClick={() => {
                  navigate("/");
                }}
              >
                Sign up instead?
              </button>
            </div>
          </form>
          <div id="recaptcha-container"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
