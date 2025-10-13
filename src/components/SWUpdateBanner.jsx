import { usePWA } from "../hooks/usePWA";

export function SWUpdateBanner() {
    const { isNeedRefresh, updateServiceWorker } = usePWA();

    if (!isNeedRefresh) return null;

    return (
        <div
            style={{
                position: "fixed",
                bottom: 20,
                left: 20,
                right: 20,
                backgroundColor: "#ffcc00",
                color: "#000",
                padding: "10px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: 1000
            }}
        >
            <span>Nouvelle version disponible !</span>
            <button
                onClick={() => updateServiceWorker(true)}
                style={{
                    marginLeft: "10px",
                    padding: "5px 15px",
                    cursor: "pointer",
                    border: "none",
                    borderRadius: "6px",
                    backgroundColor: "#0070f3",
                    color: "#fff",
                }}
            >
                Mettre à jour
            </button>
        </div>
    );
}
