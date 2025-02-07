import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../assets/css/sessionPage/SingupForm.css';
import Verification from "./Verification";
import api from '../../config/api';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [resendTimer, setResendTimer] = useState(60);
  
  // フォームデータの状態
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  });

  // バリデーション状態
  const [validations, setValidations] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasMinLength: false,
    passwordsMatch: false,
    isEmailValid: false,
    isNameValid: false
  });

  // エラーメッセージの状態
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    verificationCode: "",
    general: ""
  });

  // パスワードバリデーションチェック
  useEffect(() => {
    const { password, passwordConfirmation } = formData;
    setValidations({
      ...validations,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasMinLength: password.length >= 8,
      passwordsMatch: password === passwordConfirmation,
      isNameValid: formData.name.length >= 2,
      isEmailValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    });
  }, [formData]);

  // 再送信タイマー
  useEffect(() => {
    let interval;
    if (!canResend && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
      setResendTimer(60);
    }
    return () => clearInterval(interval);
  }, [canResend, resendTimer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // エラーメッセージをクリア
    setErrors({ ...errors, [name]: "" });
  };





    //登録ボタン押した後の処理
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    await api.signUp({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.passwordConfirmation
    });
    setShowVerification(true);
  } catch (error) {
    setErrors({
      ...errors,
      general: error.message
    });
  } finally {
    setIsLoading(false);
  }
};



  if (showVerification) {
    return <Verification 
      email={formData.email}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      errors={errors}
      setErrors={setErrors}
      canResend={canResend}
      setCanResend={setCanResend}
      resendTimer={resendTimer}
    />;
  }

  return (
    <div className="form-container">
      <h2 className="form-title">アカウント登録</h2>
      {errors.general && (
        <div className="error-container">
          {errors.general}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">名前</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? 'error' : ''}`}
            disabled={isLoading}
            required
          />
          {errors.name && (
            <p className="error-text">{errors.name}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">メールアドレス</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? 'error' : ''}`}
            disabled={isLoading}
            required
          />
          {errors.email && (
            <p className="error-text">{errors.email}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">パスワード</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`form-input ${errors.password ? 'error' : ''}`}
            disabled={isLoading}
            required
          />
          {errors.password && (
            <p className="error-text">{errors.password}</p>
          )}
          <div className="validation-list">
            <p className={`validation-item ${validations.hasUpperCase ? 'validation-success' : 'validation-error'}`}>
              ・大文字(A-Z)を含む
            </p>
            <p className={`validation-item ${validations.hasLowerCase ? 'validation-success' : 'validation-error'}`}>
              ・小文字(a-z)を含む
            </p>
            <p className={`validation-item ${validations.hasNumber ? 'validation-success' : 'validation-error'}`}>
              ・数字(0-9)を含む
            </p>
            <p className={`validation-item ${validations.hasMinLength ? 'validation-success' : 'validation-error'}`}>
              ・8文字以上
            </p>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">パスワード（確認）</label>
          <input
            type="password"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleChange}
            className={`form-input ${errors.passwordConfirmation ? 'error' : ''}`}
            disabled={isLoading}
            required
          />
          {errors.passwordConfirmation && (
            <p className="error-text">{errors.passwordConfirmation}</p>
          )}
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={isLoading || !Object.values(validations).every(Boolean)}
        >
          {isLoading ? "送信中..." : "登録"}
        </button>
      </form>

      <p className="login-link">
        すでにアカウントをお持ちの方は
        <Link to="/login">
          こちら
        </Link>
      </p>
    </div>
  );
};

export default SignUp