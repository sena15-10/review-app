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
    // プロフィール完成度を計算する関数
    // ========================================
    const calculateProfileCompletion = () => {
        if (!profile) return 0;

        let completedItems = 0;
        const totalItems = 7; // チェック項目の総数

        // 基本情報のチェック
        if (profile.name) completedItems++;
        if (profile.email) completedItems++;
        if (profile.bio) completedItems++;
        if (profile.avatar) completedItems++;
        if (profile.skills && profile.skills.length > 0) completedItems++;
        if (profile.experience) completedItems++;
        if (profile.location) completedItems++;

        // パーセンテージを計算（0-100）
        return Math.round((completedItems / totalItems) * 100);
    };

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

    // 通知リストのダミーデータ
    const notifications = [
        { id: 1, type: 'info', message: '新しいプロジェクトが追加されました', time: '1時間前', unread: true },
        { id: 2, type: 'success', message: 'レビューが承認されました', time: '3時間前', unread: true },
        { id: 3, type: 'warning', message: 'プロフィール更新を推奨します', time: '1日前', unread: false }
    ];

    // 実績・バッジのダミーデータ
    const achievements = [
        { id: 1, name: '初回レビュー', icon: '🌟', earned: true, description: '初めてのレビューを投稿' },
        { id: 2, name: 'コントリビューター', icon: '💡', earned: true, description: '100件以上の貢献' },
        { id: 3, name: 'プロジェクトマスター', icon: '🏆', earned: false, description: '10個以上のプロジェクトに参加' },
        { id: 4, name: 'チームプレイヤー', icon: '🤝', earned: true, description: '5人以上とコラボレーション' }
    ];

    // 週間アクティビティデータ（過去7日間）
    const weeklyActivity = [
        { day: '月', value: 5 },
        { day: '火', value: 8 },
        { day: '水', value: 3 },
        { day: '木', value: 12 },
        { day: '金', value: 7 },
        { day: '土', value: 4 },
        { day: '日', value: 6 }
    ];

    // 最大値を取得してグラフの高さを正規化
    const maxActivity = Math.max(...weeklyActivity.map(d => d.value));

    // プロフィール完成度を計算
    const profileCompletion = calculateProfileCompletion();

    // 未読通知の数をカウント
    const unreadCount = notifications.filter(n => n.unread).length;

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
                プロフィール完成度セクション（新機能）
                ======================================== */}
            <section className="profile-completion-section">
                <div className="completion-card">
                    <div className="completion-header">
                        <div className="completion-info">
                            <h3 className="completion-title">プロフィール完成度</h3>
                            <p className="completion-subtitle">
                                {profileCompletion === 100
                                    ? '完璧です！'
                                    : 'あと少しで完成です'}
                            </p>
                        </div>
                        <div className="completion-percentage">
                            {profileCompletion}%
                        </div>
                    </div>

                    {/* プログレスバー */}
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${profileCompletion}%` }}
                        >
                            {/* プログレスバーのアニメーション用の光沢エフェクト */}
                            <div className="progress-shine"></div>
                        </div>
                    </div>

                    {/* 完成度が100%未満の場合、改善提案を表示 */}
                    {profileCompletion < 100 && (
                        <p className="completion-hint">
                            💡 プロフィールを完成させて、より多くの機会を得ましょう
                        </p>
                    )}
                </div>
            </section>

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
                通知パネルセクション（新機能）
                ======================================== */}
            <section className="notifications-section">
                <div className="section-header">
                    <h2 className="section-title">通知</h2>
                    {/* 未読通知数のバッジ */}
                    {unreadCount > 0 && (
                        <span className="notification-badge">{unreadCount}</span>
                    )}
                </div>
                <div className="notifications-list">
                    {notifications.map(notification => (
                        <div
                            key={notification.id}
                            className={`notification-item notification-${notification.type} ${notification.unread ? 'unread' : ''}`}
                        >
                            {/* 通知タイプに応じたアイコン */}
                            <div className="notification-icon">
                                {notification.type === 'info' && 'ℹ️'}
                                {notification.type === 'success' && '✅'}
                                {notification.type === 'warning' && '⚠️'}
                            </div>
                            <div className="notification-content">
                                <p className="notification-message">{notification.message}</p>
                                <span className="notification-time">{notification.time}</span>
                            </div>
                            {/* 未読インジケーター */}
                            {notification.unread && (
                                <div className="unread-indicator"></div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ========================================
                週間アクティビティグラフセクション（新機能）
                ======================================== */}
            <section className="weekly-activity-section">
                <h2 className="section-title">週間アクティビティ</h2>
                <div className="activity-chart">
                    {/* グラフの各バー */}
                    {weeklyActivity.map((day, index) => (
                        <div key={index} className="chart-bar-container">
                            {/* バーの高さは値に応じて変動 */}
                            <div
                                className="chart-bar"
                                style={{
                                    height: `${(day.value / maxActivity) * 100}%`,
                                    // アニメーション遅延を順番に設定
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                {/* バーの上に値を表示 */}
                                <span className="chart-value">{day.value}</span>
                            </div>
                            {/* バーの下に曜日を表示 */}
                            <span className="chart-label">{day.day}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ========================================
                実績・バッジセクション（新機能）
                ======================================== */}
            <section className="achievements-section">
                <h2 className="section-title">実績・バッジ</h2>
                <div className="achievements-grid">
                    {achievements.map(achievement => (
                        <div
                            key={achievement.id}
                            className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
                        >
                            {/* バッジアイコン */}
                            <div className="achievement-icon">
                                {achievement.icon}
                            </div>
                            {/* バッジ情報 */}
                            <div className="achievement-info">
                                <h4 className="achievement-name">{achievement.name}</h4>
                                <p className="achievement-description">{achievement.description}</p>
                            </div>
                            {/* 獲得済み/未獲得のステータス */}
                            {achievement.earned ? (
                                <div className="achievement-status earned-status">獲得済み</div>
                            ) : (
                                <div className="achievement-status locked-status">🔒</div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

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
