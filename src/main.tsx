import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./services/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "./index.css";
import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <Provider store={store}>
         <PersistGate persistor={persistor}>
            <TooltipProvider delayDuration={100}>
               <App />
            </TooltipProvider>

            <Toaster closeButton richColors />
         </PersistGate>
      </Provider>
   </React.StrictMode>
);
