import { supabase } from '@/lib/supabase';

export const login = async (credentials: { email: string; password: string }) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (authError) throw authError;

    const user = authData?.user;

    // Haal avatar_url op uit de 'profiles' tabel
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", user?.id)
      .single();

    if (profileError) throw profileError;

    return { success: true, user, avatarUrl: profileData?.avatar_url };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    } else {
      return { success: false, error: "An unknown error occurred." };
    }
  }
};


export const register = async (
  credentials: { email: string; password: string },
  avatarFile?: File // Maak avatarFile optioneel, zodat we dit kunnen controleren
) => {
  try {
    if (!avatarFile) {
      throw new Error("Avatar file is required but not provided.");
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });

    if (authError) throw authError;

    const user = authData?.user;

    if (!user) {
      throw new Error("Registration failed. User data is not available.");
    }

    // Stap 1: Upload afbeelding naar Supabase Storage
    const avatarFilePath = `${user.id}/${avatarFile.name}`;
    const { data: storageData, error: storageError } = await supabase.storage
      .from("avatars") // Bucketnaam
      .upload(avatarFilePath, avatarFile);

    if (storageError) throw storageError;

    const avatarUrl = supabase.storage.from("avatars").getPublicUrl(avatarFilePath).data.publicUrl;

    // Stap 2: Voeg gebruiker toe aan de 'profiles' tabel met de avatar URL
    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      email: credentials.email,
      avatar_url: avatarUrl,
    });

    if (profileError) throw profileError;

    return { success: true, user, avatarUrl };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    } else {
      return { success: false, error: "An unknown error occurred." };
    }
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
