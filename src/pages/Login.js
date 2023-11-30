import { useState } from "react";
import BackgroundImage from "../assets/-4-ans_frontend_assets.webp";
import Logo from "../assets/icons/Logo";
import Input from "../components/AuthComponents/Input";
import SubmitButton from "../components/AuthComponents/SubmitButton";
import { Link } from "react-router-dom";

const Login = () => {
  const [updatePassword, setUpdatePassword] = useState(false);

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
          <form className="mx-auto max-w-[300px]">
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
                <Input label={"Name"} type={"text"} placeholder={"Your name"} />
              </div>
            )}

            <div className="mb-4">
              <Input
                label={"Email"}
                type={"email"}
                placeholder={"Your email"}
              />
            </div>
            <div className="mb-4">
              <Input
                label={updatePassword ? "Current Password" : "Password"}
                type={"password"}
                placeholder={
                  updatePassword ? "Current Password" : "Your password"
                }
              />
            </div>

            {updatePassword && (
              <div className="mb-4">
                <Input
                  label={"New Password"}
                  type={"password"}
                  placeholder={"New Password"}
                />
              </div>
            )}

            <div className="flex justify-between items-center pb-6">
              <div
                onClick={() => setUpdatePassword(!updatePassword)}
                className="text-xs text-[#939598] cursor-pointer hover:underline"
              >
                {updatePassword ? "Go Back" : "Update Password"}
              </div>
              <SubmitButton
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