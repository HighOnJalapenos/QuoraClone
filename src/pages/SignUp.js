import BackgroundImage from "../assets/-4-ans_frontend_assets.webp";
import Logo from "../assets/icons/Logo";
import Input from "../components/AuthComponents/Input";
import SubmitButton from "../components/AuthComponents/SubmitButton";
import { Link } from "react-router-dom";

export default function SignUp() {
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
              <div>Sign Up</div>
              <Link to="/login">
                <button className="text-sm px-2 opacity-50 hover:opacity-100 border border-white hover:border-[rgb(185,43,39)] rounded">
                  Log In
                </button>
              </Link>
            </div>

            <div className="mb-4">
              <Input label={"Name"} type={"text"} placeholder={"Your name"} />
            </div>

            <div className="mb-4">
              <Input
                label={"Email"}
                type={"email"}
                placeholder={"Your email"}
              />
            </div>
            <div className="mb-4">
              <Input
                label={"Password"}
                type={"password"}
                placeholder={"Your password"}
              />
            </div>

            <div className="flex justify-end pb-6">
              <SubmitButton text={"Sign up"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
