import { useState } from "react";
import BackgroundImage from "../assets/-4-ans_frontend_assets.webp";
import Logo from "../assets/icons/Logo";
import Input from "../components/AuthComponents/Input";
import SubmitButton from "../components/AuthComponents/SubmitButton";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { login } from "../redux/Slices/authSlice";

const Login = () => {
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const data = {
    email: "",
    password: "",
    appType: "quora",
  };

  const [updatePassword, setUpdatePassword] = useState(false);
  const [formData, setFormData] = useState(data);
  const [emailErrorVisible, setEmailErrorVisible] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const notify = (message) => {
    toast(`${message}`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const changeUpdatePassword = () => {
    if (!updatePassword) {
      setFormData(() => ({
        ...data,
        passwordCurrent: "",
        name: "",
      }));
      setUpdatePassword(true);
    } else {
      setFormData(data);
      setUpdatePassword(false);
    }
  };

  const inputFormData = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      const res = EMAIL_REGEX.test(value);
      setEmailErrorVisible(!res);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitFormData = (e) => {
    e.preventDefault();
    setLoginButtonDisabled(true);
    dispatch(login(formData))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        notify(error);
        setFormData(data);
      })
      .finally(() => {
        setLoginButtonDisabled(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div
      style={{ backgroundImage: `url(${BackgroundImage})` }}
      className="h-screen flex justify-center"
    >
      <div className="md:my-auto md:w-[700px] w-full h-full md:h-max bg-white rounded">
        <div className="pb-6">
          <div className="flex justify-center">
            <Logo fill={"rgb(185, 43, 39)"} height={100} width={175} />
          </div>
          <div className="font-bold text-center text-[#636466]">
            A place to share knowledge and better understand the world
          </div>
        </div>

        <div className="px-6">
          <form onSubmit={submitFormData} className="mx-auto max-w-[300px]">
            <div className="pb-2 mb-4 border-b border-[#dee0e1] flex justify-between">
              <div>Login</div>
              <Link to="/signup">
                <button className="text-sm px-2 opacity-50 hover:opacity-100 border border-white hover:border-[rgb(185,43,39)] rounded">
                  Sign Up
                </button>
              </Link>
            </div>

            {updatePassword && (
              <div className="mb-4">
                <Input
                  label={"Name"}
                  type={"text"}
                  placeholder={"Your name"}
                  name={"name"}
                  onChange={inputFormData}
                  value={formData.name}
                />
              </div>
            )}

            <div className="mb-4">
              <Input
                label={"Email"}
                type={"email"}
                placeholder={"Your email"}
                name={"email"}
                onChange={inputFormData}
                value={formData.email}
                isError={emailErrorVisible}
              />
              {emailErrorVisible && (
                <div className="py-2 text-red-500 text-xs">
                  Email is invalid
                </div>
              )}
            </div>

            <div className="mb-4">
              <Input
                label={updatePassword ? "Current Password" : "Password"}
                type={"password"}
                placeholder={
                  updatePassword ? "Current Password" : "Your password"
                }
                name={updatePassword ? "passwordCurrent" : "password"}
                onChange={inputFormData}
                value={
                  updatePassword ? formData.passwordCurrent : formData.password
                }
              />
            </div>

            {updatePassword && (
              <div className="mb-4">
                <Input
                  label={"New Password"}
                  type={"password"}
                  placeholder={"New Password"}
                  name={"password"}
                  onChange={inputFormData}
                  value={formData.password}
                />
              </div>
            )}

            <div className="flex justify-end items-center pb-6">
              {/* <div
                onClick={changeUpdatePassword}
                className="text-xs text-[#939598] cursor-pointer hover:underline"
              >
                {updatePassword ? "Go Back" : "Update Password"}
              </div> */}
              <SubmitButton
                buttonDisabled={loginButtonDisabled}
                text={updatePassword ? "Update Password" : "Login"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
