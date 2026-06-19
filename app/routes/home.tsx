import type { Route } from "./+types/home";
import { BundleBuilderPage } from "~/components/bundle-builder/bundle-builder-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wyze Bundle Builder" },
    {
      name: "description",
      content: "Build your Wyze security system bundle",
    },
  ];
}

export default function Home() {
  return <BundleBuilderPage />;
}
