import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ProtectedLinkPage() {

  const { shortId } =
    useParams();

  const [password, setPassword] =
    useState("");

  const submitPassword = () => {

    window.location.href =
      `http://localhost:8000/${shortId}?password=${password}`;
  };

  return (

    <div
      className="
        min-h-screen
        flex
        justify-center
        items-center
        bg-black
      "
    >

      <div
        className="
          bg-gray-900
          p-8
          rounded-2xl
          w-[400px]
        "
      >

        <h1
          className="
            text-white
            text-2xl
            mb-5
          "
        >
          Protected Link
        </h1>

        <input
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          placeholder="Enter Password"
          className="
            w-full
            p-3
            rounded-xl
            bg-gray-800
            text-white
          "
        />

        <button
          onClick={submitPassword}
          className="
            mt-4
            w-full
            bg-blue-600
            p-3
            rounded-xl
          "
        >
          Continue
        </button>

      </div>

    </div>
  );
}