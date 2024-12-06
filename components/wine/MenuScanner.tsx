"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import imageCompression from "browser-image-compression";

import { MenuInput } from "./MenuInput";
import { MenuDisplay } from "./MenuDisplay";
import { WineRecommendations } from "./WineRecommendations";

import { useToast } from "@/hooks/use-toast";

interface Dish {
  name: string;
  price: number | null;
}

interface Category {
  name: string;
  dishes: Dish[];
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

export function MenuScanner() {
  const [dishes, setDishes] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<
    RecommendationWrapper[]
  >([]);
  const { toast } = useToast();

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 2048,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const formData = new FormData();

      formData.append("image", compressedFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();

        if (data.categories && Object.keys(data.categories).length > 0) {
          const formattedCategories = Object.keys(data.categories).map(
            (key) => ({
              name: key,
              dishes: data.categories[key] || [],
            }),
          );

          setDishes(formattedCategories);
          toast({
            title: "Menu uploaded successfully",
            description:
              "Your menu has been processed and is ready for wine pairing.",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error uploading menu",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualAdd = (newDishes: string[]) => {
    if (newDishes.length === 0) {
      setDishes([]);
      setRecommendations([]);

      return;
    }

    const newDishEntries = newDishes.map((dish) => ({
      name: dish,
      price: null,
    }));

    const updatedDishes = [...dishes];
    const manualCategoryIndex = dishes.findIndex(
      (category) => category.name === "Manual Entry",
    );

    if (manualCategoryIndex >= 0) {
      updatedDishes[manualCategoryIndex].dishes.push(...newDishEntries);
    } else {
      updatedDishes.push({
        name: "Manual Entry",
        dishes: newDishEntries,
      });
    }

    setDishes(updatedDishes);
    toast({
      title: "Dishes added successfully",
      description: "Your menu has been updated.",
    });
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
        throw new Error("Failed to get recommendations");
      }

      const data = await response.json();

      setRecommendations(data);
      toast({
        title: "Wine recommendations ready",
        description: "Discover the perfect pairings for your menu.",
      });
    } catch (error) {
      console.error("Error getting recommendations:", error);
      toast({
        title: "Error getting recommendations",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setDishes([]);
    setRecommendations([]);
    toast({
      title: "Menu cleared",
      description: "Start fresh with a new menu.",
    });
  };

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {dishes.length === 0 ? (
          <motion.div
            key="input"
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            initial={{ opacity: 0, y: 20 }}
          >
            <MenuInput
              isLoading={isLoading}
              onManualAdd={handleManualAdd}
              onUpload={handleUpload}
            />
          </motion.div>
        ) : (
          <motion.div
            key="display"
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-8 md:grid-cols-2"
            exit={{ opacity: 0, y: -20 }}
            initial={{ opacity: 0, y: 20 }}
          >
            <div className="space-y-8">
              <MenuDisplay
                categories={dishes}
                hasRecommendations={recommendations.length > 0}
                isLoading={isLoading}
                onGetRecommendations={handleGetRecommendations}
                onReset={handleReset}
              />
            </div>
            {recommendations.length > 0 && (
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="md:sticky md:top-24 h-fit"
                initial={{ opacity: 0, x: 20 }}
              >
                <WineRecommendations recommendations={recommendations} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
