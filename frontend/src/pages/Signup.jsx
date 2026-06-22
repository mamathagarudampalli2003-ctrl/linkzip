import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function Signup() {

  const navigate =
    useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ================= SIGNUP =================

  const handleSignup =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await axios.post(

            "http://localhost:8000/api/auth/signup",

            {
              username,
              email,
              password,
            }
          );

        console.log(
          res.data
        );

        alert(
          "Signup Successful ✅"
        );

        navigate("/login");

      } catch (error) {

        console.log(
          error
        );

        alert(
          error.response?.data
            ?.message ||
          "Signup Failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-black
      text-white
      px-4
    ">

      <form
        onSubmit={
          handleSignup
        }
        className="
          bg-gray-900
          p-8
          rounded-3xl
          border
          border-gray-800
          w-full
          max-w-md
          space-y-5
        "
      >

        <div>

          <h1 className="
            text-3xl
            font-bold
          ">
            Create Account
          </h1>

          <p className="
            text-gray-400
            mt-2
          ">
            Start using LinkZip
          </p>

        </div>

        {/* USERNAME */}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          className="
            w-full
            bg-gray-800
            border
            border-gray-700
            rounded-xl
            p-3
            outline-none
          "
          required
        />

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="
            w-full
            bg-gray-800
            border
            border-gray-700
            rounded-xl
            p-3
            outline-none
          "
          required
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="
            w-full
            bg-gray-800
            border
            border-gray-700
            rounded-xl
            p-3
            outline-none
          "
          required
        />

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-blue-500
            hover:bg-blue-600
            p-3
            rounded-xl
            font-bold
            transition-all
          "
        >

          {loading
            ? "Creating..."
            : "Create Account"}

        </button>

      </form>

    </div>
  );
}