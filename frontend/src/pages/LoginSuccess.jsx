import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoginSuccess() {

  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {

    const token = params.get("token");

    if (token) {

      // SAVE TOKEN
      localStorage.setItem("token", token);

      // OPTIONAL: FETCH USER INFO LATER
      console.log("Login Success Token:", token);

      // REDIRECT TO DASHBOARD
      navigate("/dashboard");

    } else {

      // IF NO TOKEN → BACK TO LOGIN
      navigate("/login");
    }

  }, [params, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-cyan-400">
          Logging you in...
        </h1>

        <p className="text-gray-400 mt-3">
          Please wait while we set up your account
        </p>
      </div>
    </div>
  );
}