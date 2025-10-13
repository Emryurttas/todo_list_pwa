import { useState, useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

export const usePWA = () => {
    const [isInstallable, setIsInstallable] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();
            setDeferredPrompt(event);
            setIsInstallable(true);
        };

        const handleAppInstalled = () => {
            console.log("PWA a été installée !");
            setIsInstalled(true);
            setIsInstallable(false);
            setDeferredPrompt(null);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("appinstalled", handleAppInstalled);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener("appinstalled", handleAppInstalled);
        };
    }, []);

    const promptInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`Réponse de l'utilisateur à l'installation : ${outcome}`);
        setDeferredPrompt(null);
        setIsInstallable(false);
    };

    const { needRefresh, updateServiceWorker } = useRegisterSW();
    const [isNeedRefresh] = needRefresh;

    return {
        isInstallable,
        isInstalled,
        promptInstall,

        isNeedRefresh,
        updateServiceWorker,
    };
};
