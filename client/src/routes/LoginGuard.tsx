import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store/store";
import type React from "react";

export default function LoginGuard({ children }: { children: React.ReactNode }) {
    const { user } = useSelector((state: RootState) => state.user);

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
}
