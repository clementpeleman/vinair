"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import { register } from "@/lib/authService";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    setError(null);

    const result = await register({ email, password });

    if (result.success) {
      router.push("/login");
    } else {
      setError(result.error || "An unknown error occurred.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] mt-[-5vh] md:mt-0 p-4">
      <div className="shadow-custom rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-2xl text-center mb-4">Register</h1>
        <div className="w-full max-w-sm space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            radius="sm"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            radius="sm"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button
            className="w-full text-white"
            disabled={loading}
            onClick={handleRegister}
            color="primary"
            radius="sm"
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </div>
      </div>
    </div>
  );
}
