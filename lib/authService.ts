import { supabase } from "@/lib/supabase";

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    const user = data?.user;

    if (error) throw error;

    // Return user data instead of redirecting here
    return { success: true, user };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    } else {
      return { success: false, error: "An unknown error occurred." };
    }
  }
};

export const register = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });

    const user = data?.user;

    if (error) throw error;

    // Return user data instead of redirecting here
    return { success: true, user };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    } else {
      return { success: false, error: "An unknown error occurred." };
    }
  }
};

export const registerUserWithAvatarBlob = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    // Stap 1: Registreer de gebruiker via Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });

    if (authError) throw new Error(`Registration failed: ${authError.message}`);

    const user = authData?.user;

    if (!user) throw new Error("Registration failed: No user data returned.");

    // Stap 2: Log de gebruiker in (zorg dat er een actieve sessie is)
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (loginError)
      throw new Error(`Login failed after registration: ${loginError.message}`);

    // Stap 3: Genereer de avatar-URL op basis van het e-mailadres
    const avatarUrl = `https://avatar.iran.liara.run/username?username=${encodeURIComponent(
      credentials.email,
    )}`;

    // Stap 4: Download de afbeelding als blob
    const response = await fetch(avatarUrl); // Ophalen van de afbeelding

    if (!response.ok) {
      throw new Error(
        `Failed to fetch avatar from URL: ${response.statusText}`,
      );
    }

    const avatarBlob = await response.arrayBuffer(); // Lees het bestand als ArrayBuffer
    const avatarUint8Array = new Uint8Array(avatarBlob); // Converteer naar Uint8Array

    // Stap 5: Voeg een profiel toe aan de 'profiles' tabel
    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id, // ID moet overeenkomen met de gebruiker in auth.users
      avatar_blob: avatarUint8Array, // Sla de afbeelding op als blob
    });

    if (profileError)
      throw new Error(`Profile creation failed: ${profileError.message}`);

    return { success: true, user };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unknown error occurred",
    };
  }
};

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    return { success: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    } else {
      return { success: false, error: "An unknown error occurred." };
    }
  }
};
