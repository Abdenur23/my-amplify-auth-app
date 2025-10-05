import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

function AfterSignIn() {
  const { user } = useAuthenticator((context) => [context.user]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function saveUser() {
      if (!user || !user.attributes) return;
      try {
        const token = (await Auth.currentSession()).getIdToken().getJwtToken();
        const email = user.attributes.email;
        // call backend API to create user record
        await fetch(`${process.env.REACT_APP_API_URL || ""}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          },
          body: JSON.stringify({ email })
        });
        setSaved(true);
      } catch (e) {
        console.error("saveUser error", e);
      }
    }
    saveUser();
  }, [user]);

  if (!user) return null;
  return (
    <div>
      <p>Signed in as {user.attributes?.email}</p>
      <p>{saved ? "Saved to DB" : "Saving..."}</p>
    </div>
  );
}

export default function App() {
  const [accepted, setAccepted] = useState(false);

  if (!accepted) {
    return (
      <div style={{ padding: 24 }}>
        <h1>Terms of Service</h1>
        <div style={{ height: 200, overflow: "auto", border: "1px solid #ddd", padding: 12 }}>
          <p>Put your terms here (short summary + link to full terms)</p>
        </div>
        <label style={{ display: "block", marginTop: 12 }}>
          <input type="checkbox" onChange={(e) => setAccepted(e.target.checked)} /> I accept the terms
        </label>
        <button style={{ marginTop: 12 }} disabled={!accepted} onClick={() => setAccepted(true)}>
          Continue to Sign up / Sign in
        </button>
      </div>
    );
  }

  return (
    <Authenticator>
      <div style={{ padding: 24 }}>
        <h1>Welcome to My App</h1>
        <AfterSignIn />
        <Authenticator.SignOut />
      </div>
    </Authenticator>
  );
}
