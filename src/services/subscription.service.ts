const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const ENDPOINT = `${BACKEND_URL}/api/subscribers`;

export const subscribe = async (email: string): Promise<void> => {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      console.error(`Backend Error: ${res.status} ${res.statusText}`);
      // Manejo de errores básicos
      if (res.status === 409) {
        throw new Error("Ya estas suscrito");
        return;
      }
      const errorData = await res.json().catch(() => ({}));
      console.error("Backend Error Body:", errorData);
      throw new Error(
        errorData.message || "Error al suscribirse en el servidor externo",
      );
    }
  } catch (error) {
    console.error("Fetch Error in subscribe service:", error);
    throw error;
  }
};

export const getSubscribers = async (): Promise<string[]> => {
  const res = await fetch(ENDPOINT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error(`GetSubscribers Error: ${res.status} ${res.statusText}`);
    throw new Error("Error al obtener suscriptores del servidor externo");
  }

  const data = await res.json();

  if (Array.isArray(data) && data.length > 0 && typeof data[0] === "object") {
    return data.map((s: any) => s.email);
  }

  return data;
};
