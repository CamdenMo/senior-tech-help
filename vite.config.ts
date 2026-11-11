import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const path = env.VITE_BASE_PATH || "/";
  if (!path.startsWith("/") || path.includes("..") || /[?#]/.test(path)) {
    throw new Error(
      "VITE_BASE_PATH must be an absolute URL path, for example /senior-tech-help/.",
    );
  }
  return {
    base: `${path.replace(/\/+$/, "")}/`,
    plugins: [react(), tailwindcss()],
    build: { sourcemap: false },
  };
});
