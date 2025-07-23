import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from '../../config/api';
import NotRegistered from '../ProfilePage/notRegisteredModal';
import { useUser } from "../../context/userContext";
import '../../assets/css/reset.css'
import '../../assets/css/topPage/top.css';

const Top = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user } = useUser();

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                try {
                    const response = await api.get(`/v1/profiles/${user.id}`);
                    setProfile(response.data);
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        setProfile(null);
                    } else {
                        setError('プロファイルの読み込み中にエラーが発生しました。');
                    }
                }
            }
        };

        fetchProfile();
    }, [user]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!profile) {
        // モーダルに「登録ページへ移動する」「何もしない」機能をpropsとして渡す
        return <NotRegistered 
            onRegister={() => navigate('/profile/edit')}
            onClose={() => {}}
        />;
    }

    return (
        <div>
            <h1>ようこそ、{user?.name}さん</h1>
            {/* 他に表示したいコンテンツ */}
        </div>
    );
}

export default Top;