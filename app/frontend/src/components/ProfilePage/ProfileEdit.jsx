// app/frontend/src/components/ProfilePage/ProfileEdit.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../config/api';
import { useUser } from "../../context/userContext";
import {ConfirmationModal} from "../common/ConfirmationModal"
import { User2, Upload, X, Plus,AlertTriangle } from "lucide-react";

const ProfileEdit = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const handleCancelClick = () => {
        setShowCancelModal(true)
    }

    handleConfirmCancel = () => {
        navigate('/top');
    }

    const handleAbortCancel = () => {
        setShowCancelModal(false); //モーダルを閉じる
    }
    
    // スキル選択用のオプション
    const skillOptions = {
        languages: ['JavaScript', 'Python', 'Ruby', 'Java', 'PHP', 'TypeScript', 'Go', 'Rust', 'Swift', 'Kotlin'],
        frameworks: ['React', 'Vue.js', 'Angular', 'Rails', 'Django', 'Express', 'Spring', 'Laravel', 'Next.js', 'Nuxt.js'],
        databases: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'SQLServer'],
        tools: ['Git', 'Docker', 'AWS', 'GCP', 'Azure', 'Figma', 'Adobe XD', 'Slack', 'Notion', 'Jira']
    };

    const [formData, setFormData] = useState({
        introduction: '',
        is_public: true,
        employment_status: '',
        experience_level: '',
        years_of_experience: 0,
        current_school: '',
        current_company: '',
        skills: {
            languages: [],
            frameworks: [],
            databases: [],
            tools: []
        },
        social_links: []
    });

    const [newSocialLink, setNewSocialLink] = useState({ name: '', url: '' });

    // 既存プロフィールを取得
    const fetchProfile = async () => {
        try {
            const response = await api.getProfile(user.id);
            setFormData({
                introduction: response.basic.introduction || '',
                is_public: response.basic.is_public ?? true,
                employment_status: response.status.employment_status || '',
                experience_level: response.status.experience_level || '',
                years_of_experience: response.status.years_of_experience || 0,
                current_school: response.current.school || '',
                current_company: response.current.company || '',
                skills: response.skills || { languages: [], frameworks: [], databases: [], tools: [] },
                social_links: response.social_links || []
            });
            
            if (response.basic.avatar_url) {
                setAvatarPreview(response.basic.avatar_url);
            }
        } catch (error) {
            console.log('プロフィール未登録のため新規作成モードで開始');
        }
    };

    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user]);

    // 基本フィールドの変更処理
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // アバター画像の選択処理
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // ファイルサイズチェック（5MB以下）
            if (file.size > 5 * 1024 * 1024) {
                alert('ファイルサイズは5MB以下にしてください');
                return;
            }
            
            // ファイル形式チェック
            if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
                alert('JPG、PNG形式の画像ファイルを選択してください');
                return;
            }
            
            setSelectedAvatar(file);
            
            // プレビュー用のURL作成
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // スキル選択の処理
    const handleSkillToggle = (category, skill) => {
        setFormData(prev => {
            const currentSkills = prev.skills[category];
            const isSelected = currentSkills.includes(skill);
            
            return {
                ...prev,
                skills: {
                    ...prev.skills,
                    [category]: isSelected 
                        ? currentSkills.filter(s => s !== skill)
                        : [...currentSkills, skill]
                }
            };
        });
    };

    // ソーシャルリンクの追加
    const handleAddSocialLink = () => {
        if (newSocialLink.name && newSocialLink.url) {
            setFormData(prev => ({
                ...prev,
                social_links: [...prev.social_links, { ...newSocialLink }]
            }));
            setNewSocialLink({ name: '', url: '' });
        }
    };

    // ソーシャルリンクの削除
    const handleRemoveSocialLink = (index) => {
        setFormData(prev => ({
            ...prev,
            social_links: prev.social_links.filter((_, i) => i !== index)
        }));
    };

    // フォーム送信処理
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const submitData = {
                ...formData
            };

            // アバター画像が選択されている場合は追加
            if (selectedAvatar) {
                submitData.avatar = selectedAvatar;
            }

            // プロフィールの更新/作成
            await api.updateProfile(submitData);
            
            // 成功時はプロフィール画面に戻る
            navigate('/profile');
            
        } catch (error) {
            console.error('プロフィール保存エラー:', error);
            alert('プロフィールの保存に失敗しました。もう一度お試しください。');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="profile-edit-container">
            {showCancelModal && (
                <ConfirmationModal
                    message="変更内容を破棄しますか？"
                    onConfirm={handleConfirmCancel}
                    onCancel={handleAbortCancel}
                />
            )}
            <div className="profile-edit-header">
                <h1>プロフィール編集</h1>
                <button 
                    type="button" 
                    onClick={handleCancelClick}
                    className="cancel-button"
                >
                    トップに戻る
                </button>
            </div>

            <form onSubmit={handleSubmit} className="profile-edit-form">
                {/* アバター画像セクション */}
                <div className="form-section avatar-section">
                    <h2>プロフィール画像</h2>
                    <div className="avatar-upload">
                        <div className="avatar-preview">
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="プロフィール画像プレビュー" />
                            ) : (
                                <div className="avatar-placeholder">
                                    <User2 size={60} />
                                </div>
                            )}
                        </div>
                        <button 
                            type="button" 
                            onClick={() => fileInputRef.current?.click()}
                            className="upload-button"
                        >
                            <Upload size={20} />
                            画像を選択
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/jpg"
                            onChange={handleAvatarChange}
                            style={{ display: 'none' }}
                        />
                        <p className="upload-note">JPG、PNG形式、5MB以下</p>
                    </div>
                </div>

                {/* 基本情報セクション */}
                <div className="form-section basic-section">
                    <h2>基本情報</h2>
                    
                    <div className="form-group">
                        <label htmlFor="introduction">自己紹介</label>
                        <textarea
                            id="introduction"
                            name="introduction"
                            value={formData.introduction}
                            onChange={handleInputChange}
                            placeholder="あなたについて教えてください..."
                            rows="4"
                        />
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="is_public"
                                checked={formData.is_public}
                                onChange={handleInputChange}
                            />
                            プロフィールを公開する
                        </label>
                    </div>
                </div>

                {/* ステータス情報セクション */}
                <div className="form-section status-section">
                    <h2>ステータス</h2>
                    
                    <div className="form-group">
                        <label htmlFor="employment_status">現在の状況</label>
                        <select
                            id="employment_status"
                            name="employment_status"
                            value={formData.employment_status}
                            onChange={handleInputChange}
                        >
                            <option value="">選択してください</option>
                            <option value="学生">学生</option>
                            <option value="会社員">会社員</option>
                            <option value="フリーランス">フリーランス</option>
                            <option value="転職活動中">転職活動中</option>
                            <option value="その他">その他</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="experience_level">経験レベル</label>
                        <select
                            id="experience_level"
                            name="experience_level"
                            value={formData.experience_level}
                            onChange={handleInputChange}
                        >
                            <option value="">選択してください</option>
                            <option value="初心者">初心者</option>
                            <option value="初級">初級</option>
                            <option value="中級">中級</option>
                            <option value="上級">上級</option>
                            <option value="エキスパート">エキスパート</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="years_of_experience">経験年数</label>
                        <input
                            type="number"
                            id="years_of_experience"
                            name="years_of_experience"
                            value={formData.years_of_experience}
                            onChange={handleInputChange}
                            min="0"
                            max="50"
                        />
                    </div>
                </div>

                {/* 現在の所属セクション */}
                <div className="form-section current-section">
                    <h2>現在の所属</h2>
                    
                    <div className="form-group">
                        <label htmlFor="current_school">学校名</label>
                        <input
                            type="text"
                            id="current_school"
                            name="current_school"
                            value={formData.current_school}
                            onChange={handleInputChange}
                            placeholder="例: 東京大学"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="current_company">会社名</label>
                        <input
                            type="text"
                            id="current_company"
                            name="current_company"
                            value={formData.current_company}
                            onChange={handleInputChange}
                            placeholder="例: 株式会社サンプル"
                        />
                    </div>
                </div>

                {/* スキルセクション */}
                <div className="form-section skills-section">
                    <h2>スキル</h2>
                    
                    {Object.entries(skillOptions).map(([category, options]) => (
                        <div key={category} className="skill-category">
                            <h3>
                                {category === 'languages' && 'プログラミング言語'}
                                {category === 'frameworks' && 'フレームワーク'}
                                {category === 'databases' && 'データベース'}
                                {category === 'tools' && 'ツール'}
                            </h3>
                            <div className="skill-options">
                                {options.map(skill => (
                                    <button
                                        key={skill}
                                        type="button"
                                        className={`skill-option ${
                                            formData.skills[category].includes(skill) ? 'selected' : ''
                                        }`}
                                        onClick={() => handleSkillToggle(category, skill)}
                                    >
                                        {skill}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ソーシャルリンクセクション */}
                <div className="form-section social-section">
                    <h2>ソーシャルリンク</h2>
                    
                    {/* 既存のソーシャルリンク */}
                    {formData.social_links.map((link, index) => (
                        <div key={index} className="social-link-item">
                            <span className="social-name">{link.name}</span>
                            <span className="social-url">{link.url}</span>
                            <button
                                type="button"
                                onClick={() => handleRemoveSocialLink(index)}
                                className="remove-button"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}

                    {/* 新しいソーシャルリンク追加 */}
                    <div className="add-social-link">
                        <div className="social-inputs">
                            <input
                                type="text"
                                placeholder="サービス名 (例: GitHub)"
                                value={newSocialLink.name}
                                onChange={(e) => setNewSocialLink(prev => ({ ...prev, name: e.target.value }))}
                            />
                            <input
                                type="url"
                                placeholder="URL (例: https://github.com/username)"
                                value={newSocialLink.url}
                                onChange={(e) => setNewSocialLink(prev => ({ ...prev, url: e.target.value }))}
                            />
                            <button
                                type="button"
                                onClick={handleAddSocialLink}
                                className="add-button"
                                disabled={!newSocialLink.name || !newSocialLink.url}
                            >
                                <Plus size={16} />
                                追加
                            </button>
                        </div>
                    </div>
                </div>

                {/* 送信ボタン */}
                <div className="form-actions">
                    <button
                        type="submit"
                        className="save-button"
                        disabled={isLoading}
                    >
                        {isLoading ? '保存中...' : 'プロフィールを保存'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEdit;
