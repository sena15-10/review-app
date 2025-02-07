import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../config/api';
const Verification = ({
    email,
    isLoading,
    setIsLoading,
    errors,
    setErrors,
    canResend,
    setCanResend,
    resendTimer
}) => {
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState("");
    
    // 以下は既存のコードをそのまま使用
    const handleCodeChange = (e) => {
      const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
      setVerificationCode(value);
      setErrors({ ...errors, verificationCode: "" });
    };
  
    //認証ボタンを押したときの処理
    const handleVerificationSubmit = async (e) => {
      e.preventDefault();
      if (verificationCode.length !== 6) {
        setErrors({ ...errors, verificationCode: "6桁の認証コードを入力してください" });
        return;
      }
  
      setIsLoading(true);
      try {
        await api.verifyCode(email, verificationCode);  // formData.emailをemailに変更
        navigate("/login");
      } catch (error) {
        setErrors({
          ...errors,
          verificationCode: error.message
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleResendCode = async () => {
      if (!canResend) return;
      
      setIsLoading(true);
      try {
        await api.resendCode(email);  // formData.emailをemailに変更
        setCanResend(false);
      } catch (error) {
        setErrors({
          ...errors,
          general: error.message
        });
      } finally {
        setIsLoading(false);
      }
    };

    return (
        <div className="form-container">
          <h2 className="form-title">認証コードを入力</h2>
          <p className="verification-text">
            {email}に送信された6桁の認証コードを入力してください
          </p>
          <form onSubmit={handleVerificationSubmit}>
            <div className="form-group">
              <input
                type="text"
                value={verificationCode}
                onChange={handleCodeChange}
                className={`form-input verification-input ${
                  errors.verificationCode ? 'error' : ''
                }`}
                placeholder="000000"
                disabled={isLoading}
                required
              />
              {errors.verificationCode && (
                <p className="error-text">{errors.verificationCode}</p>
              )}
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={isLoading || verificationCode.length !== 6}
            >
              {isLoading ? "認証中..." : "認証する"}
            </button>
          </form>
          <div className="verification-container">
            {canResend ? (
              <button
                onClick={handleResendCode}
                className="resend-button"
                disabled={isLoading}
              >
                コードを再送信
              </button>
            ) : (
              <p className="resend-timer">{resendTimer}秒後に再送信可能</p>
            )}
          </div>
        </div>
      );
}
export default Verification