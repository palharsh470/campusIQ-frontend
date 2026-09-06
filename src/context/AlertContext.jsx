import { createContext, useContext, useState } from "react";
import MessageAlert from "../components/MessageAlert";

const AlertContext = createContext();

export function AlertProvider({ children }) {
    const [alert, setAlert] = useState(null);

    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}

            {alert && (
                <div className="fixed  top-5 right-[40%] z-50">
                    <MessageAlert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                </div>
            )}
        </AlertContext.Provider>
    );
}

export function useAlert() {
    return useContext(AlertContext);
}
