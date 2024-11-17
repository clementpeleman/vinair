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
    <div className="flex flex-col h-screen justify-center items-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-2xl text-center">Inloggen</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="space-y-2">
            <Input
              required
              id="email"
              name="email"
              placeholder="m@example.com"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Input
              required
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
        </CardBody>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" disabled={loading} onClick={handleLogin}>
            {loading ? "Inloggen..." : "Inloggen"}
          </Button>
        </CardFooter>
      </Card>
      <div className="mt-4">
        <span className="text-sm">Heb je geen account? </span>
        <Link className="text-sm text-blue-500" href="#">
          Aanmelden
        </Link>
      </div>
    </div>
  );
}