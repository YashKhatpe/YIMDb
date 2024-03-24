import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import { useAuth } from "./Context/AuthContext";
import { storeAuth } from '../features/loginDetails/loginAuth';
import { useSelector, useDispatch } from 'react-redux'
import Cookies from "js-cookie";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

ReactModal.setAppElement("#root");

const Login = () => {
  const authChecker = useSelector((state) => state.loginCreds.value)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [pwdState, setPwdState] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clipboardBtn, setClipboardBtn] = useState("Copy to clipboard");
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    authtoken: "",
  });
  const { login } = useAuth();
  const [token, setToken] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const authtoken = Cookies.get('authtoken');
    console.log('Cookie: ',authtoken);
    console.log("Modal State: ", isModalOpen);
    console.log("Auth-Token State: ", token);
  }, [isModalOpen, token]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log('Login AuthChecker: ',authChecker);
  }, [authChecker]);

  const showPwd = () => {
    var pwdInp = document.getElementById("password");
    if (pwdInp.type === "password") {
      setPwdState(true);
      pwdInp.type = "text";
    } else {
      setPwdState(false);
      pwdInp.type = "password";
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      // Make an Axios request to the backend
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Check if login was successful
      let successResponse = await response.data.success;
      let userid = response.data.id;
      localStorage.setItem("user-id", userid);
      // console.log(response.data);
      if (successResponse) {
        setIsModalOpen(true);
        const authtoken = await response.data.authtoken;
        dispatch(storeAuth(authtoken));
        setToken(authtoken);
        localStorage.setItem("token", authtoken);
        console.log("Token State: ", token);
        setModalContent({
          title: "Success",
          message: "You logged in successfully",
          authtoken: authtoken,
        });
        // After a successful login
        Cookies.set("authtoken", authtoken); 

        console.log(response.data.message);
        const username = await document.getElementById("email").value;
        await login(username);
        alert('Successfully logged in');
        navigate("/myacc");
        // await setUser(username);

        //     Fetch additional data from the backend using Axios
        //   const userDataResponse = await axios.get('http://localhost:5000/api/auth/getuser', {
        //     headers: {
        //       'auth-token': response.data.authtoken, // Assuming the backend sends a token on successful login
        //     },
        //   });

        //   console.log(userDataResponse.data);
        //   return userDataResponse.data
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMsg = await error.response.data.error;
      setModalContent({
        title: "Error",
        message: errorMsg,
        authtoken: null,
      });
      alert(`Login unsuccessful: ${errorMsg}`);
      console.log("Login unsuccessful", errorMsg);
    }
  };

  const copyAuthToken = async () => {
    let copyOfAuthToeken = modalContent.authtoken;
    setClipboardBtn("Copied to clipboard");
    setTimeout(() => {
      setClipboardBtn("Copy to clipboard");
    }, 2000);
    await navigator.clipboard.writeText(copyOfAuthToeken);
    console.log("copied to clipboard");
  };

  return (
    <>
      <section className="bg-light p-3 p-md-4 p-xl-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xxl-11">
              <div className="card border-light-subtle shadow-sm">
                <div className="row g-0">
                  <div
                    className="col-12 col-md-6"
                    style={{
                      backgroundColor: "#03213b",
                      width: "50%",
                    }} 
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        padding: "0px 150px 0px 150px",
                      }}
                      loading="lazy"
                      src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                      alt="Welcome back you've been missed!"
                    />
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <div className="col-12 col-lg-11 col-xl-10">
                      <div className="card-body p-3 p-md-4 p-xl-5">
                        <div className="row">
                          <div className="col-12">
                            <div className="mb-5">
                              <div className="text-center mb-4">
                                <Link to="/">
                                  <img
                                    src="https://bootstrapbrain.com/demo/components/logins/login-8/assets/img/bsb-logo.svg"
                                    alt="BootstrapBrain Logo"
                                    width="175"
                                    height="57"
                                  />
                                </Link>
                              </div>
                              <h4 className="text-center">
                                Welcome back you've been missed!
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="d-flex gap-3 flex-column">
                              <Link
                                to="/loginPage"
                                className="btn btn-lg btn-outline-dark"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-google"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                </svg>
                                <span className="ms-2 fs-6">
                                  Log in with Google
                                </span>
                              </Link>
                            </div>
                            <p className="text-center mt-4 mb-5">
                              Or sign in with
                            </p>
                          </div>
                        </div>
                        <form onSubmit={submitForm} method="post">
                          <div className="row gy-3 overflow-hidden">
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  id="email"
                                  placeholder="name@example.com"
                                  onChange={handleInputChange}
                                  minLength="3"
                                  required
                                />
                                <label
                                  htmlFor="email"
                                  className="form-label"
                                  style={{ zIndex: 0 }}
                                >
                                  Email
                                </label>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  type="password"
                                  className="form-control"
                                  name="password"
                                  id="password"
                                  placeholder="Password"
                                  onChange={handleInputChange}
                                  minLength="5"
                                  required
                                />
                                <i
                                  className={`fa-sharp fa-regular fa-eye${
                                    pwdState ? "" : "-slash"
                                  }`}
                                  onClick={showPwd}
                                  style={{
                                    position: "relative",
                                    left: "330px",
                                    bottom: "42px",
                                  }}
                                />
                                <label
                                  htmlFor="password"
                                  className="form-label"
                                  style={{ zIndex: 0 }}
                                >
                                  Password
                                </label>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  name="remember_me"
                                  id="remember_me"
                                />
                                <label
                                  className="form-check-label text-secondary"
                                  htmlFor="remember_me"
                                >
                                  Keep me logged in
                                </label>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="d-grid">
                                <button
                                  className="btn btn-dark btn-lg"
                                  type="submit"
                                >
                                  Log in now
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                        <ReactModal
                          isOpen={isModalOpen}
                          style={customStyles}
                          onRequestClose={() => setIsModalOpen(false)}
                        >
                          <h2>{modalContent.title}</h2>
                          <p>{modalContent.message}</p>
                          {modalContent.authtoken && (
                            <>
                              <p>Your Authentication Token: </p>
                              <code>{modalContent.authtoken}</code>
                              <br />
                              <button
                                className="btn-clipboard my-2"
                                style={{ width: "230px" }}
                                onClick={copyAuthToken}
                              >
                                <i className="fa-solid fa-clone mx-2"></i>
                                {clipboardBtn}
                              </button>
                              <br />
                            </>
                          )}
                          <button
                            className="my-2"
                            style={{
                              position: "relative",
                              left: "43%",
                            }}
                            onClick={() => {
                              setIsModalOpen(false);
                              navigate("/myacc");
                            }}
                          >
                            Close Modal
                          </button>
                        </ReactModal>
                        <div className="row">
                          <div className="col-12">
                            <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                              <Link
                                to="/signupPage"
                                className="link-secondary text-decoration-none"
                              >
                                Create new account
                              </Link>
                              <Link
                                to="/loginPage"
                                className="link-secondary text-decoration-none"
                              >
                                Forgot password
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
