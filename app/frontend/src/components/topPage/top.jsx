import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from '../../config/api';
import NotRegistered from '../ProfilePage/notRegisteredModal';
import { useUser } from "../../context/userContext";
import '../../assets/css/reset.css'
import '../../assets/css/topPage/top.css';

const Top = () => {
    // ========================================
    // 状態管理
    // ========================================
    const [profile, setProfile] = useState(null); // ユーザープロフィール情報
    const [error, setError] = useState(null); // エラー状態
    const navigate = useNavigate(); // ページ遷移用
    const { user } = useUser(); // ログイン中のユーザー情報

    // 挨拶メッセージの時間帯判定用の状態
    const [greeting, setGreeting] = useState('');

    // ========================================
    // 時間帯に応じた挨拶メッセージを生成
    // ========================================
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting('おはようございます');
        } else if (hour < 18) {
            setGreeting('こんにちは');
        } else {
            setGreeting('こんばんは');
        }
    }, []);

    // ========================================
    // プロフィール情報の取得
    // ========================================
    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                try {
                    // APIからユーザーのプロフィールを取得
                    const response = await api.get(`/v1/profiles/${user.id}`);
                    setProfile(response.data);
                } catch (error) {
                    // プロフィールが未登録の場合（404エラー）
                    if (error.response && error.response.status === 404) {
                        setProfile(null);
                    } else {
                        // その他のエラー
                        setError('プロファイルの読み込み中にエラーが発生しました。');
                    }
                }
            }
        };

        fetchProfile();
    }, [user]);

    // ========================================
    // エラー時の表示
    // ========================================
    if (error) {
        return <div className="error-message">{error}</div>;
    }

    // ========================================
    // プロフィール未登録時の処理
    // ========================================
    if (!profile) {
        // モーダルに「登録ページへ移動する」「何もしない」機能をpropsとして渡す
        return <NotRegistered
            onRegister={() => navigate('/profile/edit')}
            onClose={() => {}}
        />;
    }

    // ========================================
    // ダミーデータ（実際はAPIから取得する想定）
    // ========================================
    // 統計情報のダミーデータ
    const stats = {
        reviews: 24,        // レビュー数
        contributions: 156, // 貢献数
        projects: 8         // プロジェクト数
    };

    // 最近のアクティビティのダミーデータ
    const recentActivities = [
        { id: 1, type: 'review', title: 'React コンポーネントのレビュー', time: '2時間前' },
        { id: 2, type: 'contribution', title: 'ログイン機能の改善', time: '5時間前' },
        { id: 3, type: 'project', title: '新規プロジェクト参加', time: '1日前' }
    ];

    // クイックアクションのリスト
    const quickActions = [
        { id: 1, title: 'プロフィール編集', icon: '👤', link: '/profile/edit' },
        { id: 2, title: 'レビュー投稿', icon: '✍️', link: '#' },
        { id: 3, title: 'プロジェクト検索', icon: '🔍', link: '#' },
        { id: 4, title: 'メッセージ', icon: '💬', link: '#' }
    ];

    // ========================================
    // メインレンダリング
    // ========================================
    return (
        <div className="dashboard-container">
            {/* ========================================
                ヘッダーセクション - ウェルカムメッセージ
                ======================================== */}
            <header className="dashboard-header">
                <div className="welcome-section">
                    <h1 className="welcome-title">
                        {greeting}、{user?.name}さん
                    </h1>
                    <p className="welcome-subtitle">
                        今日も素晴らしい一日にしましょう！
                    </p>
                </div>

                {/* ユーザーアバター */}
                <div className="user-avatar">
                    <div className="avatar-circle">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                </div>
            </header>

            {/* ========================================
                統計カードセクション
                ======================================== */}
            <section className="stats-section">
                <div className="stats-grid">
                    {/* レビュー数カード */}
                    <div className="stat-card stat-card-reviews">
                        <div className="stat-icon">📝</div>
                        <div className="stat-content">
                            <h3 className="stat-number">{stats.reviews}</h3>
                            <p className="stat-label">レビュー</p>
                        </div>
                    </div>

                    {/* 貢献数カード */}
                    <div className="stat-card stat-card-contributions">
                        <div className="stat-icon">⭐</div>
                        <div className="stat-content">
                            <h3 className="stat-number">{stats.contributions}</h3>
                            <p className="stat-label">貢献</p>
                        </div>
                    </div>

                    {/* プロジェクト数カード */}
                    <div className="stat-card stat-card-projects">
                        <div className="stat-icon">📁</div>
                        <div className="stat-content">
                            <h3 className="stat-number">{stats.projects}</h3>
                            <p className="stat-label">プロジェクト</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================
                メインコンテンツエリア
                ======================================== */}
            <div className="main-content">
                {/* ========================================
                    クイックアクションセクション
                    ======================================== */}
                <section className="quick-actions-section">
                    <h2 className="section-title">クイックアクション</h2>
                    <div className="quick-actions-grid">
                        {quickActions.map(action => (
                            <Link
                                to={action.link}
                                key={action.id}
                                className="quick-action-card"
                            >
                                <span className="action-icon">{action.icon}</span>
                                <span className="action-title">{action.title}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* ========================================
                    最近のアクティビティセクション
                    ======================================== */}
                <section className="activity-section">
                    <h2 className="section-title">最近のアクティビティ</h2>
                    <div className="activity-list">
                        {recentActivities.map(activity => (
                            <div key={activity.id} className="activity-item">
                                {/* アクティビティタイプによるアイコン表示 */}
                                <div className={`activity-icon activity-icon-${activity.type}`}>
                                    {activity.type === 'review' && '📝'}
                                    {activity.type === 'contribution' && '💡'}
                                    {activity.type === 'project' && '📁'}
                                </div>
                                <div className="activity-content">
                                    <p className="activity-title">{activity.title}</p>
                                    <span className="activity-time">{activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* ========================================
                推奨セクション
                ======================================== */}
            <section className="recommendations-section">
                <h2 className="section-title">おすすめ</h2>
                <div className="recommendation-card">
                    <div className="recommendation-icon">🚀</div>
                    <div className="recommendation-content">
                        <h3 className="recommendation-title">プロフィールを充実させましょう</h3>
                        <p className="recommendation-description">
                            スキルや経験を追加して、より多くのプロジェクトに参加できるようになりましょう。
                        </p>
                        <Link to="/profile/edit" className="recommendation-button">
                            今すぐ更新
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Top;
