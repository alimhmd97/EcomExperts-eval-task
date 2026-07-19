import { QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";

import { getQueryClient } from "~/query/get-query-client";

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  );
}
