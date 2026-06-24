import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { GoogleOAuthProvider }
from "@react-oauth/google";

import { AuthProvider }
from "./context/AuthContext";

const GOOGLE_CLIENT_ID =
import.meta.env.VITE_GOOGLE_CLIENT_ID;

import posthog from './lib/posthog'

// Track first page load
posthog.capture('$pageview')

ReactDOM.createRoot(
document.getElementById("root")
).render(
<React.StrictMode>

<GoogleOAuthProvider
  clientId={GOOGLE_CLIENT_ID}
>

    <AuthProvider>

      <App />

    </AuthProvider>

</GoogleOAuthProvider>

</React.StrictMode>
);