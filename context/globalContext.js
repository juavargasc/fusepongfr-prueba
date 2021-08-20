import React, { createContext, useContext, useState, useEffect } from "react";
import Router from "next/router";
import Cookie from 'js-cookie';

import api, { addBearerToken, removeBearerToken } from './../backend/peticiones';
import { routes } from './../backend/routes';


const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [company, setCompany] = useState([]);

	useEffect(() => {
        getCompany();
    }, [])

    const getCompany = async () => {
        await api.get(routes.companyList)
        .then(async ({ data }) => {
        	setCompany(data.docs)
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const setToken = async (token, refreshToken, user) => {
        Cookie.set('token', token)
        Cookie.set('refreshToken', refreshToken)
        Cookie.set('user', user)
        addBearerToken(token);
        setIsAuthenticated(true);
        redirectAfterLogin();
    }

    const redirectAfterLogin = () => {
        Router.push('/dashboard')
    }

	return (
        <AuthContext.Provider value={{ isAuthenticated, company, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const authContext = useContext(AuthContext)
    return authContext;
}