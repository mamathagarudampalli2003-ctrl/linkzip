import {
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

export default function PublicAnalytics() {

  const { shortId } =
    useParams();

  const [data, setData] =
    useState(null);

  useEffect(() => {

    axios
      .get(
        `http://localhost:8000/api/url/public/${shortId}`
      )
      .then((res) =>
        setData(res.data)
      );

  }, []);

  if (!data)
    return (
      <p>Loading...</p>
    );

  return (

    <div
      className="
        min-h-screen
        bg-[#0f172a]
        text-white
        p-10
      "
    >

      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        Public Analytics
      </h1>

      <p>
        Short ID:
        {" "}
        {data.shortId}
      </p>

      <p>
        Clicks:
        {" "}
        {data.clicks}
      </p>

      <p>
        Unique Clicks:
        {" "}
        {data.uniqueClicks}
      </p>

      <p>
        Created:
        {" "}
        {new Date(
          data.createdAt
        ).toLocaleString()}
      </p>

      {data.qrCode && (
        <img
          src={data.qrCode}
          alt="QR"
          className="mt-6 w-52"
        />
      )}

    </div>
  );
}