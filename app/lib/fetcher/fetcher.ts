const API_BASE = "http://localhost:3001";

export type FetcherOptions = RequestInit & {
  params?: Record<string, unknown>;
};

function buildUrl(
  path: string,
  params?: Record<string, unknown>,
): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = path.startsWith("http")
    ? new URL(path)
    : new URL(`${API_BASE}${normalizedPath}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

export async function fetcher<T>(
  path: string,
  options?: FetcherOptions,
): Promise<T> {
  const { params, ...init } = options ?? {};
  const response = await fetch(buildUrl(path, params), {
    headers: {
      Accept: "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}): ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
