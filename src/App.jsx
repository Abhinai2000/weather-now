import Navbar from "./components/Navbar";
import Body from "./pages/Body";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
        <Navbar />
        <main className="flex-grow">
          <Body />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
