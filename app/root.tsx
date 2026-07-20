import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { QueryClientProvider } from "~/providers/query-client-provider";
import "./app.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          href="/assets/images/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/assets/images/favicon/favicon.svg"
        />
        <link
          rel="shortcut icon"
          href="/assets/images/favicon/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/images/favicon/apple-touch-icon.png"
        />
        <link
          rel="manifest"
          href="/assets/images/favicon/site.webmanifest"
        />
        <Meta />
        <Links />
      </head>
      <body className="max-w-[1800px] mx-auto">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <QueryClientProvider>
      <Outlet />
    </QueryClientProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
