// app/frontend/src/components/ProfilePage/Profile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import api from '../../config/api';
import '../../assets/css/reset.css';
import '../../assets/css/profile/profile.css';
import { useUser } from "../../context/userContext";
import { EditIcon, User2, Lock, Globe } from "lucide-react";
import NotRegisteredModal from './notRegisteredModal';

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { userId } = useParams(); // URLからユーザーIDを取得
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [profile, setProfile] = useState({
        basic: {
            name: "",
            email: "",
            avatar_url: "",
            introduction: "",
            is_public: true
        },
        social_links: [],
        status: {
            employment_status: "",
            experience_level: "",
            years_of_experience: 0
        },
        current: {
            school: "",
            company: ""
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

    // 自分のプロフィールかどうかを判定
    const isOwnProfile = !userId || (user && user.id === parseInt(userId));

    const getProfile = async () => {
        setIsLoading(true);
        try {
            const targetUserId = userId || (user ? user.id : null);
            if (!targetUserId) {
                setIsError(true);
                return;
            }

            const response = await api.getProfile(targetUserId);
            setProfile(response);
            
            // 自分のプロフィールで未登録の場合のみモーダル表示
            if (isOwnProfile) {
                const isProfileEmpty = !response.basic.name || 
                                      (!response.basic.introduction && 
                                       !response.status.employment_status && 
                                       response.skills.languages.length === 0);
                
                if (isProfileEmpty) {
                    setShowModal(true);
                }
            }
        } catch (error) {
            setIsError(true);
            // 自分のプロフィールで404の場合はモーダル表示
            if (error.status === 404 && isOwnProfile) {
                setShowModal(true);
            }
        }
        setIsLoading(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleRegisterNow = () => {
        navigate('/profile/edit');
    };

    useEffect(() => {
        if (user || userId) {
            getProfile();
        }
    }, [user, userId]);

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>読み込み中...</p>
            </div>
        );
    }

    return (
        <div className="profile-container">
            {/* 未登録モーダル */}
            {showModal && (
                <NotRegisteredModal 
                    onClose={handleCloseModal}
                    onRegister={handleRegisterNow}
                />
            )}
            
            {/* プロフィールヘッダー */}
            <div className="profile-header">
                <h1>
                    {isOwnProfile ? 'マイプロフィール' : `${profile.basic.name}さんのプロフィール`}
                </h1>
                {isOwnProfile && (
                    <Link to="/profile/edit" className="edit-profile-button">
                        <button>
                            <EditIcon size={20} />
                            編集
                        </button>
                    </Link>
                )}
            </div>
            
            {/* プロフィール情報表示 */}
            {!isError && profile.basic.name && (
                <div className="profile-content">
                    {/* 基本情報セクション */}
                    <div className="profile-section basic-info">
                        <div className="profile-avatar">
                            {profile.basic.avatar_url ? (
                                <img src={profile.basic.avatar_url} alt="プロフィール画像" />
                            ) : (
                                <div className="avatar-placeholder">
                                    <User2 size={60} />
                                </div>
                            )}
                        </div>
                        
                        <div className="profile-details">
                            <h2>{profile.basic.name}</h2>
                            <div className="privacy-status">
                                {profile.basic.is_public ? (
                                    <span className="public">
                                        <Globe size={16} />
                                        公開
                                    </span>
                                ) : (
                                    <span className="private">
                                        <Lock size={16} />
                                        非公開
                                    </span>
                                )}
                            </div>
                            
                            {profile.basic.introduction && (
                                <div className="introduction">
                                    <h3>自己紹介</h3>
                                    <p>{profile.basic.introduction}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ステータス情報 */}
                    {(profile.status.employment_status || profile.status.experience_level) && (
                        <div className="profile-section status-info">
                            <h3>ステータス</h3>
                            <div className="status-grid">
                                {profile.status.employment_status && (
                                    <div className="status-item">
                                        <span className="label">状況:</span>
                                        <span className="value">{profile.status.employment_status}</span>
                                    </div>
                                )}
                                {profile.status.experience_level && (
                                    <div className="status-item">
                                        <span className="label">経験レベル:</span>
                                        <span className="value">{profile.status.experience_level}</span>
                                    </div>
                                )}
                                {profile.status.years_of_experience > 0 && (
                                    <div className="status-item">
                                        <span className="label">経験年数:</span>
                                        <span className="value">{profile.status.years_of_experience}年</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* 現在の所属 */}
                    {(profile.current.school || profile.current.company) && (
                        <div className="profile-section current-info">
                            <h3>現在の所属</h3>
                            <div className="current-grid">
                                {profile.current.school && (
                                    <div className="current-item">
                                        <span className="label">学校:</span>
                                        <span className="value">{profile.current.school}</span>
                                    </div>
                                )}
                                {profile.current.company && (
                                    <div className="current-item">
                                        <span className="label">会社:</span>
                                        <span className="value">{profile.current.company}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* スキル情報 */}
                    {(profile.skills.languages.length > 0 || 
                      profile.skills.frameworks.length > 0 || 
                      profile.skills.databases.length > 0 || 
                      profile.skills.tools.length > 0) && (
                        <div className="profile-section skills-info">
                            <h3>スキル</h3>
                            <div className="skills-container">
                                {profile.skills.languages.length > 0 && (
                                    <div className="skill-category">
                                        <h4>プログラミング言語</h4>
                                        <div className="skill-tags">
                                            {profile.skills.languages.map((skill, index) => (
                                                <span key={index} className="skill-tag language">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {profile.skills.frameworks.length > 0 && (
                                    <div className="skill-category">
                                        <h4>フレームワーク</h4>
                                        <div className="skill-tags">
                                            {profile.skills.frameworks.map((skill, index) => (
                                                <span key={index} className="skill-tag framework">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {profile.skills.databases.length > 0 && (
                                    <div className="skill-category">
                                        <h4>データベース</h4>
                                        <div className="skill-tags">
                                            {profile.skills.databases.map((skill, index) => (
                                                <span key={index} className="skill-tag database">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {profile.skills.tools.length > 0 && (
                                    <div className="skill-category">
                                        <h4>ツール</h4>
                                        <div className="skill-tags">
                                            {profile.skills.tools.map((skill, index) => (
                                                <span key={index} className="skill-tag tool">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ソーシャルリンク */}
                    {profile.social_links.length > 0 && (
                        <div className="profile-section social-links">
                            <h3>ソーシャルリンク</h3>
                            <div className="social-grid">
                                {profile.social_links.map((link, index) => (
                                    <a 
                                        key={index} 
                                        href={link.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="social-link"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            {/* プロフィールが無い場合の表示 */}
            {!isLoading && (isError || !profile.basic.name) && !showModal && (
                <div className="empty-profile">
                    <User2 size={48} />
                    <h2>プロフィール情報がありません</h2>
                    {isOwnProfile ? (
                        <>
                            <p>プロフィールを登録して、他のユーザーと情報を共有しましょう</p>
                            <Link to="/profile/edit">
                                <button className="register-button">
                                    プロフィールを登録する
                                </button>
                            </Link>
                        </>
                    ) : (
                        <p>このユーザーはまだプロフィールを登録していません</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Profile;