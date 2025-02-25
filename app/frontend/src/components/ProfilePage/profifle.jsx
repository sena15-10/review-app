import React, { useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from '../../config/api';
import '../../assets/css/reset.css';
import '../../assets/css/profile/profile.css';
import { useUser } from "../../context/userContext";
import { EditIcon } from "lucide-react";

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [profile, setProfile] = useState({
        basic: {
            name: "",
            email: "",
            avatar_url: "",
            introduction: "",
            is_public: ""
        },
        social: {
            twitter: "",
            github: "",
            qiita: "",
            zenn: ""
        },
        status: {
            employment_status: "", // 社会人/学生
            experience_level: "",  // 経験レベル
            years_of_experience: 0
        },
        current: {
            school: "",  // 現在の学校（学生の場合）
            company: "", // 現在の会社（社会人の場合）
        },
        skills: {
            languages: [],
            frameworks: [],
            databases: [],
            tools: []
        },
        created_at: "",
        updated_at: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value }); 
    };

    const getProfile = async () => {
        setIsLoading(true);
        try {
            const response = await api.getProfile();
            setProfile(response);
            
            // プロフィールが未登録かどうかをチェック
            const isProfileEmpty = !response.basic.name || 
                                  (!response.basic.introduction && 
                                   !response.status.employment_status && 
                                   response.skills.languages.length === 0);
            
            if (isProfileEmpty) {
                setShowModal(true);
            }
        } catch (error) {
            setIsError(true);
            // APIエラーが404の場合もモーダルを表示（プロフィールが存在しない）
            if (error.status === 404) {
                setShowModal(true);
            }
        }
        setIsLoading(false);
    };

    const handleRegisterNow = () => {
        navigate('/profile/edit');
    };

    useEffect(() => {
        if (user) {
            getProfile();
        }
    }, [user]);

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="profile-container">
            {/* モーダル表示 */}            
            <div className="profile-header">
                <h1>プロフィール</h1>
                <Link to="/profile/edit" className="edit-profile-button">
                    <button>Edit<EditIcon size={24} /></button>
                </Link>
            </div>
            
            {/* ここにプロフィール情報の表示を追加 */}
            {!isError && profile.basic.name && (
                <div className="profile-content">
                    {/* プロフィール情報の表示コードをここに追加 */}
                </div>
            )}
            
            {/* プロフィールが無い場合のシンプルな表示（モーダルとは別） */}
            {!isLoading && (isError || !profile.basic.name) && !showModal && (
                <div className="empty-profile">
                    <User2 size={48} />
                    <p>プロフィール情報がありません</p>
                    <Link to="/profile/edit">
                        <button className="register-button">プロフィールを登録する</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Profile;
