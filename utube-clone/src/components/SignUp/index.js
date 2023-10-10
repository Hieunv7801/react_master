import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import { useEffect } from "react";

const SignUp = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    firstName: "",
    lastName: "",
    password: "",
    password2: "",
    email: "",
  });
  const onAccountChange = (event) => {
    setAccount({ ...account, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  });
  const handleRegister = (e) => {
    e.preventDefault();
    if (account.password !== account.password2) {
      alert("Passwords do not match!");
    } else {
      const result = axios
        .post("http://localhost:5001/api/users/n-a/register", account)
        .then((response) => {
          if (response.data.success === true) {
            navigate("/login");
          }
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <form onSubmit={handleRegister}>
              <div className="grid grid-cols-12">
                <input
                  value={account.firstName}
                  onChange={onAccountChange}
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4 col-span-6"
                  name="firstName"
                  placeholder="First Name"
                  required
                />
                <input
                  value={account.lastName}
                  onChange={onAccountChange}
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4 col-span-6"
                  name="lastName"
                  placeholder="Last Name"
                  required
                />
              </div>
              <input
                value={account.email}
                onChange={onAccountChange}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                required
              />
              <input
                value={account.password}
                onChange={onAccountChange}
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                required
              />
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password2"
                value={account.password2}
                onChange={onAccountChange}
                placeholder="Confirm Password"
                required
              />
              <div>
                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-red-100 my-1"
                >
                  Create Account
                </button>
                <Link className="text-sm italic" to="/login">
                  Back to login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
