"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { User, Session } from "@supabase/supabase-js";
import { toast } from "react-hot-toast";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signInWithEmailPassword: (
    email: string,
    password: string
  ) => Promise<{ error: Error | null }>;
  registerWithEmailPassword: (
    email: string,
    password: string,
    name: string,
    phone: string
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  const signInWithEmailPassword = async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return { error: error as Error };
      }

      toast.success("Logged in successfully");
      router.push("/chats");
      return { error: null };
    } catch (error) {
      console.error("Error logging in:", error);
      return { error: error as Error };
    }
  };

  const registerWithEmailPassword = async (
    email: string,
    password: string,
    name: string,
    phone: string
  ) => {
    try {
      // Sign up the user
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
            phone,
          },
        },
      });

      if (error) {
        toast.error(error.message);
        return { error: error as Error };
      }

      // If successful registration and user ID is available, create a profile
      if (data.user?.id) {
        const { error: profileError} = await supabase
          .from("users")
          .insert({
            id: data.user.id,
            name: name,
            phone_number: phone,
            email: email,
            avatar_url: "https://i.pravatar.cc/150?u=" + data.user.id,
          });
          console.log("Signup response:", data);
          

        if (profileError) {
          console.error("Error creating user profile:", profileError);
        }
      }

      toast.success("Account created successfully");
      router.push("/chats");
      return { error: null };
    } catch (error) {
      console.error("Error registering:", error);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signInWithEmailPassword,
        registerWithEmailPassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
