import React from 'react';
import '../../assets/css/common/confirmationModal.css';
import { AlertTriangle} from 'lucide-react';
const confirmationModal = ({message , onCofirm,onCancel}) => {
    return (
        <div className='confirmation-modal-backdrop'>
            <div className='confirmation-modal-content'>
                <div className='confirmation-modal-icon-wrapper'>
                    <AlertTriangle size={52} className='confirmation-modal-icon'/>
                </div>
                <h2 className='confirmation-modal-title'>確認</h2>
                <p className='confirmation-modal-actions'>{message}</p>
                    <button onClick={onCofirm} className='confirm-button'>
                        はい
                    </button>
                    <button onClick={onCancel} className='cancel-button'>
                        いいえ
                    </button>
                
            </div>
        </div>
    )
}

export default confirmationModal; 
