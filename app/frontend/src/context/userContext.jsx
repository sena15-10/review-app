// contexts/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../../config/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setUser(null);
                return;
            }
            const response = await api.getCurrentUser();
            setUser(response.user);
        } catch (error) {
            setError(error);
            if (error.status === 401) {
                localStorage.removeItem('token');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, isLoading, error, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);