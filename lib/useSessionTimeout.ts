import { useEffect } from "react";

import { supabase } from "@/lib/supabase";

const useSessionTimeout = () => {
  useEffect(() => {
    const handleActivity = () => {
      // Reset de timer bij activiteit
      localStorage.setItem("lastActivity", Date.now().toString());
    };

    // Voeg event listeners toe voor muis- en toetsenbordactiviteit
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    // Controleer elke minuut of de gebruiker inactief is
    const interval = setInterval(() => {
      const lastActivity = localStorage.getItem("lastActivity");

      if (lastActivity) {
        const inactiveTime = Date.now() - parseInt(lastActivity);
        const oneDay = 24 * 60 * 60 * 1000; // 24 uur in milliseconden

        if (inactiveTime > oneDay) {
          // Log de gebruiker uit als deze meer dan een dag inactief is
          supabase.auth.signOut();
          alert("Je bent uitgelogd vanwege inactiviteit. Log opnieuw in.");
        }
      }
    }, 60 * 1000); // Controleer elke minuut

    return () => {
      // Opruimen van event listeners en interval
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      clearInterval(interval);
    };
  }, []);
};

export default useSessionTimeout;
