import React, { createContext, useContext, useState, useEffect } from "react";
import Router from "next/router";
import Cookie from 'js-cookie';

import api, { addBearerToken, removeBearerToken } from './../backend/peticiones';
import { routes } from './../backend/routes';


const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [company, setCompany] = useState([]);
    const [project, setProject] = useState([]);
    const [userData, setUserData] = useState(null);

	useEffect(() => {
        getCompany();
        const token = Cookie.get('token')
        const refreshToken = Cookie.get('refreshToken')
        const user = Cookie.get('user')
        if (token) {
            addBearerToken(token);
            setIsAuthenticated(true);
            updateUser(user);
            redirectAfterLogin();
        }else{
            logout();
        }
    }, [])

    const logout = () => {
        Cookie.remove('token');
        Cookie.remove('refreshToken');
        Cookie.remove('user');
        setIsAuthenticated(false);
        redirectAfterLogout();
    }

    const getCompany = async () => {
        await api.get(routes.companyList)
        .then(async ({ data }) => {
        	setCompany(data.docs)
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const updateUser = async (user) => {
        await api.get(routes.me+user)
        .then(async ({ data }) => {
            setUserData(data);
            await api.get(routes.project+data.company)
            .then(async ({ data }) => {
                console.log(data.docs)
                setProject(data.docs)
            })
            .catch((error) => {
                console.error(error);
                logout();
            })
        })
        .catch((error) => {
            console.error(error);
            logout();
        })   
    }

    const setToken = async (token, refreshToken, user) => {
        const in4horas = 1/6;
        Cookie.set('token', token, { expires: in4horas })
        Cookie.set('refreshToken', refreshToken)
        Cookie.set('user', user)
        addBearerToken(token);
        getCompany();
        setIsAuthenticated(true);
        updateUser(user);
        redirectAfterLogin();
    }

    const redirectAfterLogin = () => {
        Router.push('/dashboard')
    }

    const redirectAfterLogout = () => {
        Router.push('/')
    }

	return (
        <AuthContext.Provider value={{ isAuthenticated, company, setToken, logout, userData, project }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const authContext = useContext(AuthContext)
    return authContext;
}