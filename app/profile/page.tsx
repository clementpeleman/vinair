"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { subtitle } from "@/components/primitives";

const FinishProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    address: "",
    phone: "",
    birthdate: "",
  });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData?.user) {
        alert("You need to log in first!");
        return;
      }

      setUserId(userData.user.id);

      const { data: profileData, error: profileError } = await supabase
        .from("profile")
        .select("*")
        .eq("user_id", userData.user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        console.error("Error fetching profile:", profileError.message);
        return;
      }

      if (profileData) {
        setProfile({
          name: profileData.name || "",
          bio: profileData.bio || "",
          address: profileData.address || "",
          phone: profileData.phone || "",
          birthdate: profileData.birthdate || "",
        });
      }
    };

    fetchUserAndProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!userId) {
        alert("You need to log in first!");
        return;
      }

      const { error } = await supabase.from("profile").upsert({
        user_id: userId,
        ...profile,
        updated_at: new Date(),
      });

      if (error) {
        console.error("Error saving profile:", error.message);
        alert("Error saving profile.");
      } else {
        alert("Profile saved successfully!");
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error saving profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-16">
      <Card className="w-full max-w-lg shadow-md">
        <CardHeader>
          <h2 className={subtitle({ size: "md", class: "text-black" })}>
            {isEditing ? "Edit Your Profile" : "Your Profile"}
          </h2>
        </CardHeader>
        <CardContent className="">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  required
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={profile.name}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Write a short bio"
                  value={profile.bio}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  value={profile.address}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  type="tel"
                  value={profile.phone}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="birthdate">Birthdate</Label>
                <Input
                  id="birthdate"
                  name="birthdate"
                  type="date"
                  value={profile.birthdate}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          {isEditing ? (
            <>
              <Button
                variant="ghost"
                className="text-gray-500"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                className="text-white"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Saving..." : "Save Profile"}
              </Button>
            </>
          ) : (
            <Button
              className="text-white"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default FinishProfile;
