import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import { basePath } from "./config/business";
import "./styles.css";
import "./responsive.css";

const route =
  document.documentElement.dataset.route ??
  decodeURIComponent(window.location.pathname)
    .slice(basePath.length)
    .replace(/^\/+|\/+$/g, "")
    .replace(/(?:^|\/)index\.html$/, "");
const root = document.getElementById("root")!;
if (root.childElementCount > 0) hydrateRoot(root, <App route={route} />);
else createRoot(root).render(<App route={route} />);
