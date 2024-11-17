import { supabase } from '@/lib/supabase';

export const login = async (credentials: { email: string; password: string }) => {
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

export const register = async (credentials: { email: string; password: string }) => {
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
