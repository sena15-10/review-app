import React, { useState,useEffect } from "react";
import '../../assets/css/sessionPage/SingupForm.css';
import { useNavigate, Link } from "react-router-dom";
import api from '../../config/api';

const Session = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [loginCount, setLoginCount] = useState(1); //通常は五回デバック用
    const [retryLoginTimer, setRetryLoginTimer] = useState(120);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        general: "",
        hasLogin: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });       
    };

    const startRetryTimer = () => {
        const timer = setInterval(() => {
            setRetryLoginTimer((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);  // タイマーを明示的に停止
                    setLoginCount(1);
                    setRetryLoginTimer(120);
                    setErrors(prev => ({
                        ...prev,
                        hasLogin: ""
                    }));
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        let timer;   
        if (loginCount <= 0) {
            timer = startRetryTimer();
        }     
        // クリーンアップ関数
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [loginCount]); // loginCountが変更されたときに実行

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        
        if (loginCount <= 0) {
            setErrors(prev => ({
                ...prev,
                hasLogin: `ログイン試行回数を超えました。${retryLoginTimer}秒後に再試行できます。`
            }));
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.login(formData);
            console.log('ログインしました');
            setLoginCount(5);
        } catch (error) {
            console.log(error.message);
            const newCount = loginCount - 1;
            setLoginCount(newCount);

            const newErrors = { ...errors };
            if (error.status === 404) {
                newErrors.email = error.message;
            } else if (error.status === 401) {
                newErrors.password = error.message;
            } else {
                newErrors.general = error.message || "サーバーとの通信に失敗しました";
            }

            newErrors.hasLogin = `残り試行回数${newCount}回`;
            setErrors(newErrors);
            console.log(newErrors);
            if (newCount <= 0) {
                startRetryTimer();
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">ログイン</h2>
            
            {/* エラーメッセージ表示部分 */}
            {(errors.general || errors.hasLogin) && (
                <div className="error-container">
                    {errors.general && <div>{errors.general}</div>}
                    {errors.hasLogin && (
                        <div>
                            {errors.hasLogin}
                            {loginCount <= 0 && (
                                <div className="retry-timer">
                                    再試行まで: {retryLoginTimer}秒
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">メールアドレス</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">パスワード</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        className={`form-input ${errors.password ? 'error' : ''}`}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                    />
                {errors.password && <p className="error-text">{errors.password}</p>}
                </div>

                <button
                    type="submit"
                    className="submit-button"
                    disabled={isLoading}
                >
                    {isLoading ? "ログイン中..." : "ログイン"}
                </button>
            </form>
            <p className="login-link">
                アカウントをお持ちでない方は
                <Link to="/signup">こちら</Link>
            </p>
        </div>
    );
};

export default Session;