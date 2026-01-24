// import fs from 'fs/promises';
// import path from 'path';

// const DATA_DIR = path.join(process.cwd(), 'data');
// const DB_FILE = path.join(DATA_DIR, 'subscribers.json');

// export interface ISubscriber {
//     email: string;
//     subscribedAt: string;
// }

// const ensureDb = async () => {
//     try {
//         await fs.access(DATA_DIR);
//     } catch {
//         await fs.mkdir(DATA_DIR, { recursive: true });
//     }

//     try {
//         await fs.access(DB_FILE);
//     } catch {
//         await fs.writeFile(DB_FILE, JSON.stringify([]));
//     }
// };

// export const subscribe = async (email: string): Promise<void> => {
//     await ensureDb();
//     const data = await fs.readFile(DB_FILE, 'utf-8');
//     const subscribers: ISubscriber[] = JSON.parse(data);

//     if (subscribers.some(s => s.email === email)) {
//         // Ya está suscrito, no hacemos nada o tiramos error si preferimos
//         return;
//     }

//     subscribers.push({
//         email,
//         subscribedAt: new Date().toISOString(),
//     });

//     await fs.writeFile(DB_FILE, JSON.stringify(subscribers, null, 2));
// };

// export const getSubscribers = async (): Promise<string[]> => {
//     await ensureDb();
//     const data = await fs.readFile(DB_FILE, 'utf-8');
//     const subscribers: ISubscriber[] = JSON.parse(data);
//     return subscribers.map(s => s.email);
// };

import { ISubscriber } from "@/interfaces/subscriber.interface";
import { includes } from "zod/v4";

// ---------------------------------------------------------
// CONFIGURACIÓN DEL BACKEND
// ---------------------------------------------------------
// Reemplaza 'http://localhost:4000' con la URL real de tu backend
// Reemplaza '/api/subscribers' con tu endpoint específico
const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:3000';
const ENDPOINT = `${BACKEND_URL}/api/subscribers`;

export const subscribe = async (email: string): Promise<void> => {
    try {
        const res = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ...' // Si tu backend requiere auth
            },
            credentials: "include",
            body: JSON.stringify({ email }),
        });

        if (!res.ok) {
            console.error(`Backend Error: ${res.status} ${res.statusText}`);
            // Manejo de errores básicos
            if (res.status === 409) {
                // Opcional: El usuario ya existe, no lanzamos error o sí, depende de tu lógica
                console.log("El usuario ya está suscrito");
                return;
            }
            const errorData = await res.json().catch(() => ({}));
            console.error('Backend Error Body:', errorData);
            throw new Error(errorData.message || 'Error al suscribirse en el servidor externo');
        }
    } catch (error) {
        console.error("Fetch Error in subscribe service:", error);
        throw error;
    }
};

export const getSubscribers = async (): Promise<string[]> => {
    const res = await fetch(ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        console.error(`GetSubscribers Error: ${res.status} ${res.statusText}`);
        throw new Error('Error al obtener suscriptores del servidor externo');
    }

    // Asumimos que el backend devuelve un array de objetos o strings.
    // Ajusta esto según la respuesta real de tu backend.
    // Ejemplo respuesta backend: [{ email: "a@a.com" }, { email: "b@b.com" }]
    const data = await res.json();

    // Si la API devuelve objetos, mapeamos a strings
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
        return data.map((s: any) => s.email);
    }

    // Si ya devuelve strings
    return data;
};

