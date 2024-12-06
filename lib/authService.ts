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

export const registerUserWithAvatarStorage = async (credentials: {
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

    // Stap 3: Genereer de avatar-URL op basis van het e-mailadres
    const avatarUrl = `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(
      credentials.email
    )}`;

    // Stap 4: Download de afbeelding als bestand
    const response = await fetch(avatarUrl); // Ophalen van de afbeelding

    if (!response.ok) {
      throw new Error(
        `Failed to fetch avatar from URL: ${response.statusText}`
      );
    }

    // Lees het bestand als een buffer of blob (afhankelijk van de implementatie)
    const avatarArrayBuffer = await response.arrayBuffer(); // Optie 1: ArrayBuffer
    const avatarFile = new File([avatarArrayBuffer], `${user.id}.svg`, {
      type: "image/svg",
    }); // Optie 2: Direct File object

    // Stap 5: Upload de afbeelding naar Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("avatar") // Zorg ervoor dat de bucket 'avatar' bestaat
      .upload(`public/${user.id}.svg`, avatarFile, {
        contentType: "image/svg", // Stel het juiste content-type in
      });

    if (uploadError)
      throw new Error(`Avatar upload failed: ${uploadError.message}`);

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
