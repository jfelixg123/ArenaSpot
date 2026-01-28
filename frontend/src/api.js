const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function apiGet(path) {
  const res = await fetch(`${API_URL}${path}`);

  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}`);
  }

  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}`);
  }

  return res.json();
}
