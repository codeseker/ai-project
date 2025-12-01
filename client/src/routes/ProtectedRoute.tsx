import React, { useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import type { RootState } from "../store/store";



function ProtectedRoute() {
    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector(
        (state: RootState) => state.user,
        shallowEqual
    );


    useEffect(() => {
        if (!user && location.pathname !== "/login") {
            navigate("/login", { replace: true });
            return;
        }

        const { token } = user;
        console.log('Token: ', token);

        if (user && location.pathname === "/login") {
            navigate("/", { replace: true });
        }
    }, [user, navigate, location.pathname]);

    if (!user) return null;

    return <Outlet />;
}

export default React.memo(ProtectedRoute);
