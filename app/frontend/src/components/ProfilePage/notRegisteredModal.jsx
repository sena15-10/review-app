import React from 'react';
import '../../assets/css/profile/notRegisteredModal.css';
import { UserPlus } from 'lucide-react';

const NotRegisteredModal = ({ onClose, onRegister }) => {
  console.log('onClose:', onClose);
  console.log('onRegister:', onRegister);
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-icon-wrapper">
          <UserPlus size={48} className='modal-icon'/>
        </div>
        <h2 className="modal-title">プロフィールを完成させよう！</h2>
        <p className="modal-description">
          あなたのスキルや経歴を登録して、コミュニティでの存在感を高めませんか？<br />
          登録はすぐに完了します。
        </p>
        <div className="modal-actions">
          <button onClick={onRegister} className="register-now-button">
            今すぐ登録する
          </button>
          <button onClick={onClose} className="close-button">
            後で
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotRegisteredModal;