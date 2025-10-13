import { usePWA } from "../hooks/usePWA.js";

export const InstallPWAButton = () => {
    const { isInstallable, promptInstall } = usePWA();

    if (!isInstallable) return null;

    return (
        <button
            onClick={promptInstall}
            style={{
                padding: "10px 20px",
                fontSize: "16px",
                marginBottom: "20px",
                cursor: "pointer",
                borderRadius: "6px",
                backgroundColor: "#0070f3",
                color: "#fff",
                border: "none"
            }}
        >
            Installer l'application
        </button>
    );
};

