// Base URL del backend
// Usa variable de entorno si existe (Vite) o 3001 por defecto
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

/* =========================================================
   Helpers
   ========================================================= */

function getToken() {
  return localStorage.getItem("token");
}

function authHeaders(extra = {}) {
  const token = getToken();

  return {
    ...extra,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function safeError(res) {
  try {
    const data = await res.json();
    return data?.error || data?.message || `HTTP error ${res.status}`;
  } catch {
    return `HTTP error ${res.status}`;
  }
}

/* =========================================================
   Métodos genéricos
   ========================================================= */

export async function apiGet(path) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error(await safeError(res));
  }

  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: authHeaders({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(await safeError(res));
  }

  return res.json();
}

/* =========================================================
   AUTH
   ========================================================= */

// Registro cliente
export async function registerClient(payload) {
  return apiPost("/api/auth/register-client", payload);
}

// Registro gaming center
export async function registerCenter(payload) {
  return apiPost("/api/auth/register-center", payload);
}

// Login Usuarios 
export const login = async (data) => {
  const res = await fetch("http://localhost:3001/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Error en login");
  }

  return result;
};

// Logout
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// Obtener usuario actual
export function getCurrentUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}
