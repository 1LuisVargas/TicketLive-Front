"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LoginFormValuesType } from "@/validators/loginSchema";
import { RegisterFormValuesType } from "@/validators/registerSchema";
import {
  AuthResponse,
  loginUser,
  logoutUser,
  registerUser,
  fetchUserProfile,
} from "@/services/auth.service";

interface User {
  id: string;
  email: string;
  name: string;
  googleId?: string;
  isAdmin: boolean;
  phone?: string;
  address?: string;
  profile_photo?: string | null;
  profile_photo_id?: string;
  dni?: string;
  birthday?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loading: boolean;
  isLoggedIn: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginFormValuesType) => Promise<void>;
  register: (userData: RegisterFormValuesType) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUser: (updatedData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Guardar usuario en localStorage
  const saveUserToLocalStorage = (userData: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ticketlive_user', JSON.stringify(userData));
    }
  };

  // Cargar usuario desde localStorage
  const loadUserFromLocalStorage = (): User | null => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('ticketlive_user');
      if (savedUser) {
        try {
          return JSON.parse(savedUser);
        } catch (error) {
          console.error('Error parsing saved user:', error);
          return null;
        }
      }
    }
    return null;
  };

  // Eliminar usuario de localStorage
  const removeUserFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ticketlive_user');
    }
  };

  // Función para refrescar usuario desde el backend
  const refreshUser = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Obtener usuario actual de localStorage
      const savedUser = loadUserFromLocalStorage();
      
      // Intentar obtener del backend
      const userData = await fetchUserProfile();

      if (userData) {
        const fullUser: User = {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          googleId: userData.googleId,
          isAdmin: userData.isAdmin || false,
          phone: userData.phone,
          address: userData.address,
          // 🔥 MANTENER profile_photo de localStorage si backend no lo tiene
          profile_photo: userData.profile_photo || savedUser?.profile_photo || null,
          profile_photo_id: userData.profile_photo_id || savedUser?.profile_photo_id,
          dni: userData.dni,
          birthday: userData.birthday,
        };
        console.log("🔄 Usuario actualizado desde backend:", fullUser);
        setUser(fullUser);
        saveUserToLocalStorage(fullUser);
      } else {
        // Si no hay usuario en backend, intentar cargar de localStorage
        if (savedUser) {
          console.log("⚠️ Backend no respondió, usando localStorage");
          setUser(savedUser);
        } else {
          setUser(null);
        }
      }
    } catch (error) {
      console.error("❌ Error al refrescar usuario:", error);
      // Si falla el backend, intentar cargar de localStorage
      const savedUser = loadUserFromLocalStorage();
      if (savedUser) {
        console.log("⚠️ Error en backend, usando localStorage");
        setUser(savedUser);
      } else {
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cargar usuario al montar el componente
  useEffect(() => {
    console.log("🚀 AuthProvider montado, cargando usuario...");
    
    // Primero cargar de localStorage para UI inmediata
    const savedUser = loadUserFromLocalStorage();
    if (savedUser) {
      console.log("📦 Usuario cargado desde localStorage:", savedUser);
      setUser(savedUser);
      setIsLoading(false);
    } else {
      console.log("⚠️ No hay usuario en localStorage");
    }
    
    // Luego refrescar desde el backend
    refreshUser();
  }, [refreshUser]);

  const login = async (credentials: LoginFormValuesType) => {
    try {
      setIsLoading(true);
      const response: AuthResponse = await loginUser(credentials);

      if (response.user) {
        const fullUser: User = {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          googleId: response.user.googleId,
          isAdmin: response.user.isAdmin || false,
          phone: response.user.phone,
          address: response.user.address,
          profile_photo: response.user.profile_photo,
          profile_photo_id: response.user.profile_photo_id,
          dni: response.user.dni,
          birthday: response.user.birthday,
        };
        setUser(fullUser);
        saveUserToLocalStorage(fullUser);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterFormValuesType) => {
    try {
      setIsLoading(true);
      await registerUser(userData);

      await login({
        email: userData.email,
        password: userData.password,
      });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    removeUserFromLocalStorage();
    router.push("/login");
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      console.log("🔄 Actualizando usuario:", updatedData);
      console.log("👤 Usuario completo actualizado:", updatedUser);
      setUser(updatedUser);
      saveUserToLocalStorage(updatedUser);
      console.log("✅ Usuario guardado en localStorage");
      
      // Verificar que se guardó correctamente
      const saved = localStorage.getItem('ticketlive_user');
      console.log("🔍 Verificación localStorage:", saved ? "✅ Guardado" : "❌ No guardado");
      
      // Disparar evento para notificar a otros componentes
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('userUpdated'));
      }
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    loading: isLoading,
    isLoggedIn: !!user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }

  return context;
}