// contexts/UserContext.jsx
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import api from '../config/api';

// 初期値を設定（重要！）
const UserContext = createContext({
    user: null,
    setUser: () => {},
    isLoading: true,
    error: null,
    fetchUser: () => {}
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = useCallback(async () => {
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
    }, []); // 依存配列が空なので、この関数は初回レンダリング時に一度だけ生成される

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    // user, isLoading, error, fetchUser のいずれかが変化したときだけ、valueオブジェクトを再生成する
    const value = useMemo(() => ({
        user, setUser, isLoading, error, fetchUser
    }), [user, isLoading, error, fetchUser]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

// エラーハンドリングを追加
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};