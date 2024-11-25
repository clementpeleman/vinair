/* eslint-disable prettier/prettier */
"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { useRouter } from "next/navigation";
import { Link } from "@nextui-org/link";

import { login } from "@/lib/authService";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const result = await login({ email, password });

    if (result.success) {
      router.push("/");
    } else {
      setError(result.error || "Er is een onbekende fout opgetreden.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[-5vh] md:mt-0 min-h-[65vh] p-4">
    <div className="shadow-custom rounded-lg p-6 w-full max-w-sm">
      <h1 className="text-2xl text-center mb-4">Login</h1>
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
          onClick={handleLogin}
          color="primary"
          radius="sm"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </div>
  </div>
  );
}