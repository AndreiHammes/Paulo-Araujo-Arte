import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import assinaturaFavicon from "@/assets/assinatura.png?w=64&format=webp&quality=80";

const ensureFavicon = () => {
	const existing = document.querySelector<HTMLLinkElement>("link[rel='icon']");
	if (existing) {
		existing.type = "image/png";
		existing.href = assinaturaFavicon;
		return;
	}

	const link = document.createElement("link");
	link.rel = "icon";
	link.type = "image/png";
	link.href = assinaturaFavicon;
	document.head.appendChild(link);
};

ensureFavicon();

createRoot(document.getElementById("root")!).render(<App />);
