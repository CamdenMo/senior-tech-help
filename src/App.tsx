import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

export function App({ route }: { route: string }) {
  const page =
    route === "" ? (
      <Home />
    ) : route === "services" ? (
      <Services />
    ) : route === "about" ? (
      <About />
    ) : route === "contact" ? (
      <Contact />
    ) : (
      <NotFound />
    );
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header route={route} />
      <main id="main-content" tabIndex={-1}>
        {page}
      </main>
      <Footer />
    </>
  );
}
