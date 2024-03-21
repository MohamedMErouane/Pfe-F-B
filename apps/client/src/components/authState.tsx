// src/components/AuthState.jsx (or similar)

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // For client-side session management

export default function AuthState() {
  const { data: session, status } = useSession(); // Retrieve session data
  const [user, setUser] = useState(session?.user || null);

  useEffect(() => {
    setUser(session?.user || null);
  }, [session]);

  return user; // Return the user object
}
