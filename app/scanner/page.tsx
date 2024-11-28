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
import imageCompression from "browser-image-compression";

import { ProtectedRoute } from "@/utils/authcontext";

interface Dish {
  name: string;
  price: number | null;
}

interface Category {
  name: string;
  dishes: Dish[];
}

interface ApiResponse {
  restaurant?: string;
  categories?: Record<string, Dish[]>;
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
  const [dishes, setDishes] = useState<Category[]>([]);
  const [uploadStatus, setUploadStatus] = useState("");
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
      // Stap 1: Compress de afbeelding
      const options = {
        maxSizeMB: 1, // Maximaal 1 MB
        maxWidthOrHeight: 2048, // Max breedte of hoogte
        useWebWorker: true, // Gebruik een web worker voor betere prestaties
      };

      const compressedFile = await imageCompression(selectedFile, options);

      const formData = new FormData();

      formData.append("image", compressedFile); // Gebruik de gecomprimeerde afbeelding

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data: ApiResponse = await res.json();

        // console.log("API Response:", data);

        // Safeguard against undefined 'categories'
        if (data.categories && Object.keys(data.categories).length > 0) {
          const formattedCategories: Category[] = Object.keys(
            data.categories || {},
          ).map((key) => ({
            name: key,
            dishes: data.categories?.[key] || [], // Safely access 'key'
          }));

          setDishes(formattedCategories);
        } else {
          console.warn("No categories found in the API response");
          setDishes([]); // Clear dishes if no categories
        }
      } else {
        console.error("Image upload failed:", await res.text());
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualDishesAdd = () => {
    if (manualDishes.trim()) {
      const newDishEntries = manualDishes
        .split("\n")
        .filter((dish) => dish.trim())
        .map((dish) => ({ name: dish.trim(), price: null }));

      const manualCategoryIndex = dishes.findIndex(
        (category) => category.name === "Manual Entry",
      );

      const updatedDishes = [...dishes];

      if (manualCategoryIndex >= 0) {
        updatedDishes[manualCategoryIndex].dishes.push(...newDishEntries);
      } else {
        updatedDishes.push({
          name: "Manual Entry",
          dishes: newDishEntries,
        });
      }

      setDishes(updatedDishes);
      setManualDishes("");
    }
  };

  const handleGetRecommendations = async () => {
    if (dishes.length === 0) return;

    setIsLoading(true);
    try {
      const allDishNames = dishes.flatMap((category) =>
        category.dishes.map((dish) => dish.name),
      );

      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dishes: allDishNames }),
      });

      if (!response.ok) {
        throw new Error("Failed to get recommendation");
      }

      const data: RecommendationWrapper[] = await response.json();

      // console.log("Recommendations response:", data);
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
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
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
                <ul className="space-y-4">
                  {dishes.map((category, categoryIndex) => (
                    <li key={categoryIndex} className="mb-4">
                      <h3 className="font-semibold">{category.name}</h3>
                      {category.dishes.length > 0 ? (
                        <ul className="space-y-2">
                          {category.dishes.map((dish, dishIndex) => (
                            <li
                              key={`${categoryIndex}-${dishIndex}`}
                              className="flex justify-between items-center"
                            >
                              <span>{dish.name}</span>
                              {dish.price !== null && (
                                <span className="text-gray-500">
                                  ${dish.price.toFixed(2)}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500">No dishes available</p>
                      )}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-4 text-white"
                  color="primary"
                  disabled={isLoading}
                  onPress={handleGetRecommendations}
                >
                  {isLoading ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
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
                        (wine, wineIndex) => {
                          const wineColorClass =
                            wine.color === "Red"
                              ? "text-red-600"
                              : wine.color === "White"
                                ? "text-yellow-600"
                                : wine.color === "Rose"
                                  ? "text-pink-600"
                                  : "text-gray-600";

                          return (
                            <div
                              key={wineIndex}
                              className="flex items-center space-x-4"
                            >
                              <Wine className={wineColorClass} />
                              <div>
                                <p className="font-medium">
                                  {wine.wine_recommendation}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {wine.type} • {wine.color} • {wine.country}
                                </p>
                              </div>
                            </div>
                          );
                        },
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
