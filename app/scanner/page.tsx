"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
} from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import { Loader, Wine, Upload } from "lucide-react";
import Image from "next/image";

import { ProtectedRoute } from "@/utils/authcontext";

interface Dish {
  name: string;
  price: number | null;
}

interface Category {
  dishes: Dish[];
}

interface ApiResponse {
  restaurant?: string;
  categories?: Record<string, Category>;
}

interface MenuItem {
  name: string;
  price: number | null;
}

interface WinePairing {
  wine_recommendation: string;
  relevance: number;
  type: string;
  country: string;
  color: string;
}

interface RecommendationWrapper {
  original_dish: string;
  translated_dish: string;
  recommendations: {
    top_wine_pairings: WinePairing[];
  };
}

export default function MenuScanner() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dishes, setDishes] = useState<MenuItem[]>([]);
  const [manualDishes, setManualDishes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<
    RecommendationWrapper[]
  >([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("image", selectedFile);

      const res = await fetch("https://api.vinair.tech/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data: ApiResponse = await res.json();

        console.log("API Response:", data);

        if (data.restaurant && data.categories) {
          const allDishes = Object.values(data.categories).flatMap(
            (category) => category.dishes,
          );

          setDishes(allDishes);
        } else {
          console.error("Unexpected response structure:", data);
        }
      } else {
        console.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualDishesAdd = () => {
    if (manualDishes.trim()) {
      const newDishes = manualDishes
        .split("\n")
        .filter((dish) => dish.trim() !== "")
        .map((dish) => ({ name: dish.trim(), price: null }));

      setDishes([...dishes, ...newDishes]);
      setManualDishes("");
    }
  };

  const handleGetRecommendations = async () => {
    if (dishes.length === 0) return;

    setIsLoading(true);
    try {
      const response = await fetch("https://api.vinair.tech/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dishes: dishes.map((dish) => dish.name) }),
      });

      if (!response.ok) {
        throw new Error("Failed to get recommendation");
      }

      const data: RecommendationWrapper[] = await response.json();

      console.log("Recommendations response:", data);
      setRecommendations(data);
    } catch (error) {
      console.error("Error getting recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-36 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-milo text-gray-900 mb-4">
              Menuscanner
            </h1>
            <p className="text-xl text-gray-600">
              Discover the perfect wine pairings for your menu
            </p>
          </header>

          <Card className="mb-8">
            <CardBody>
              <Tabs aria-label="Menu Input Options">
                <Tab key="scan" title="Scan Menu">
                  <div className="py-4">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Input
                          accept="image/*"
                          className="hidden"
                          id="menu-image"
                          type="file"
                          onChange={handleFileChange}
                        />
                        <label className="cursor-pointer" htmlFor="menu-image">
                          {selectedFile ? (
                            <Image
                              alt="Selected menu"
                              className="mx-auto rounded-lg"
                              height={300}
                              src={URL.createObjectURL(selectedFile)}
                              width={300}
                            />
                          ) : (
                            <div className="flex flex-col items-center">
                              <Upload className="w-12 h-12 text-gray-400" />
                              <span className="mt-2 text-sm text-gray-500">
                                Click to upload or drag and drop
                              </span>
                            </div>
                          )}
                        </label>
                      </div>
                      <Button
                        className="w-full text-white"
                        color="primary"
                        disabled={isLoading || !selectedFile}
                        type="submit"
                      >
                        {isLoading ? (
                          <>
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          "Analyze Menu"
                        )}
                      </Button>
                    </form>
                  </div>
                </Tab>
                <Tab key="manual" title="Manual Entry">
                  <div className="py-4 space-y-4">
                    <Textarea
                      minRows={6}
                      placeholder="Enter dishes, one per line"
                      value={manualDishes}
                      onValueChange={setManualDishes}
                    />
                    <Button
                      className="w-full text-white"
                      color="primary"
                      onPress={handleManualDishesAdd}
                    >
                      Add Dishes
                    </Button>
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>

          {dishes.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <h2 className="text-2xl font-semibold">Your Menu</h2>
              </CardHeader>
              <CardBody>
                <ul className="space-y-2">
                  {dishes.map((dish, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span>{dish.name}</span>
                      {dish.price && (
                        <span className="text-gray-500">
                          ${dish.price.toFixed(2)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-4"
                  color="primary"
                  disabled={isLoading}
                  onPress={handleGetRecommendations}
                >
                  {isLoading ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Getting Recommendations...
                    </>
                  ) : (
                    "Get Wine Recommendations"
                  )}
                </Button>
              </CardBody>
            </Card>
          )}

          {recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">Wine Recommendations</h2>
              </CardHeader>
              <CardBody>
                {recommendations.map((rec, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <h3 className="text-xl font-medium mb-2">
                      {rec.original_dish}
                    </h3>
                    <div className="space-y-4">
                      {rec.recommendations.top_wine_pairings.map(
                        (wine, wineIndex) => (
                          <div
                            key={wineIndex}
                            className="flex items-center space-x-4"
                          >
                            <Wine className="text-purple-600" />
                            <div>
                              <p className="font-medium">
                                {wine.wine_recommendation}
                              </p>
                              <p className="text-sm text-gray-500">
                                {wine.type} • {wine.color} • {wine.country}
                              </p>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
