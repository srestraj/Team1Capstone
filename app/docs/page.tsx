"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function Docs() {
  const pathname = usePathname();
  const noFooterPaths = ["/docs", "/docs/"];
  const showFooter = !noFooterPaths.includes(pathname);

  if (!showFooter) {
    const footer: HTMLElement | null = typeof window !== "undefined" ? document.querySelector("footer") : null;
    if (footer) {
      footer.style.display = "none";
    }
  }

  return <SwaggerUI url="/swagger.json" />;
}