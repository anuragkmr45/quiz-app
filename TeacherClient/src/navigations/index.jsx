import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import { routes, dashboardRoutes } from './routes'

const Navigiations = () => {

    const isAuthenticated = true;

    return (
        <Routes>
            {
                routes.map((data, index) => {
                    return (
                        <Route key={index} path={data.path} element={data.element} />
                    )
                })
            }
            {dashboardRoutes.map((data, index) => (
                isAuthenticated ? (
                    <Route key={index} path={data.path} element={data.element} />
                ) : (
                    // Redirect to login page if not authenticated
                    <Navigate key={index} to="/teacher-login" replace />
                )
            ))}
        </Routes>
    )
}

export default Navigiations
