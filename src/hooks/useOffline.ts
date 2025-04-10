import { useState, useEffect } from "react";

interface PendingSyncData {
  type: "cart" | "wishlist" | "order";
  data: unknown;
  timestamp: number;
}

interface ServiceWorkerRegistrationWithSync extends ServiceWorkerRegistration {
  sync?: {
    register: (tag: string) => Promise<void>;
  };
}

export const useOffline = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [syncStatus, setSyncStatus] = useState<
    "idle" | "syncing" | "success" | "error"
  >("idle");

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      // Trigger sync when coming back online
      syncPendingChanges();
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const syncPendingChanges = async () => {
    if (!navigator.serviceWorker) return;

    setSyncStatus("syncing");
    try {
      // Register a sync event
      const registration = (await navigator.serviceWorker
        .ready) as ServiceWorkerRegistrationWithSync;
      if (registration.sync) {
        await registration.sync.register("sync-cart");
      }
      setSyncStatus("success");
    } catch (error) {
      console.error("Sync failed:", error);
      setSyncStatus("error");
    }
  };

  const queueForSync = (data: PendingSyncData) => {
    if (!navigator.serviceWorker) return;

    // Store the data in IndexedDB for later sync
    const request = indexedDB.open("offlineDB", 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("pendingSync")) {
        db.createObjectStore("pendingSync", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(["pendingSync"], "readwrite");
      const store = transaction.objectStore("pendingSync");
      store.add(data);
    };
  };

  return {
    isOffline,
    syncStatus,
    queueForSync,
    syncPendingChanges,
  };
};
