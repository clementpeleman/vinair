"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase"; // Zorg ervoor dat je de juiste import hebt voor Supabase

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user found. Please log in.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Profile Page</h1>
      <div className="mt-4">
        <h2 className="text-xl">User Information</h2>
        <p>
          <strong>Name:</strong> {user.user_metadata?.name || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Joined:</strong>{" "}
          {new Date(user.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
