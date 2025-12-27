import { RegisterFormValuesType } from "@/validators/registerSchema";
import { LoginFormValuesType } from "@/validators/loginSchema";


const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}


/**** */
export class AuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "AuthError";
  }
}
/**** */



export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export const tokenManager = {
  setToken: (token: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  },


  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token");
    }
    return null;
  },


  removeToken: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  },
};

/**
 * 📝 FUNCIÓN DE REGISTRO
 * 
 * Envía los datos del usuario al endpoint de registro del backend.
 * 
 * @param userData - Datos del formulario de registro
 * @returns Promesa con la respuesta del servidor
 * @throws Error si el registro falla
 */
export const registerUser = async (
  userData: RegisterFormValuesType
): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();


    if (!response.ok) {
      throw new Error(data?.message || "Error al registrar usuario");
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error de conexión con el servidor");
  }
};

/**
 * 🔑 FUNCIÓN DE LOGIN
 * 
 * Envía las credenciales al endpoint de login del backend.
 * Si el login es exitoso, guarda el token en localStorage.
 * 
 * @param userData - Credenciales del usuario (email y password)
 * @returns Promesa con la respuesta del servidor
 * @throws Error si el login falla
 */
export const loginUser = async (
  userData: LoginFormValuesType
): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Error al iniciar sesión");
    }

    if (data.token) {
      tokenManager.setToken(data.token);
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error de conexión con el servidor");
  }
};


export const fetchUserProfile = async (): Promise<AuthResponse['user']> => {
  try {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new AuthError(data?.message || "Error al obtener perfil", response.status);
    }

    return data;
  } catch (error) {
    throw error;
  }
};


export const logoutUser = (): void => {
  tokenManager.removeToken();

  // 💡 OPCIONAL: Si tu backend tiene un endpoint de logout
  // const token = tokenManager.getToken();
  // if (token) {
  //   fetch(`${API_URL}/users/logout`, {
  //     method: "POST",
  //     headers: {
  //       "Authorization": `Bearer ${token}`,
  //     },
  //   });
  // }
};

/**
 * 🛡️ FUNCIÓN PARA OBTENER HEADERS CON AUTENTICACIÓN
 * 
 * Utilidad para agregar el token a las peticiones protegidas.
 * Úsala cuando necesites hacer peticiones que requieran autenticación.
 * 
 * @returns Headers con el token de autenticación
 */
export const getAuthHeaders = (): HeadersInit => {
  const token = tokenManager.getToken();

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

/**
 * 👤 FUNCIÓN PARA VERIFICAR SI EL USUARIO ESTÁ AUTENTICADO
 * 
 * Verifica si existe un token en localStorage.
 * 
 * @returns true si hay un token, false si no
 */
export const isAuthenticated = (): boolean => {
  return !!tokenManager.getToken();
};
