
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1',
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

  class APIError extends Error {
    constructor(status, message, data = null) {
      super(message);
      this.name = 'APIError';
      this.status = status;
      this.data = data;
    }
  }
  
  // 共通のAPI呼び出し関数
  const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    
    // 必要最小限のヘッダーを設定
    const essentialHeaders = {
      'Content-Type': 'application/json'
    };
  
    // 認証ヘッダーを条件付きで追加
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      essentialHeaders['Authorization'] = `Bearer ${authToken}`;
    }
  
    const response = await fetch(url, {
      ...options,
      headers: essentialHeaders,
      credentials: 'include',
      mode: 'cors'
    });
  
    // レスポンスのステータスコードを確認
    if (response.status === 431) {
      console.error('ヘッダーサイズが大きすぎます');
      // リトライロジックまたはエラーハンドリング
      return handleHeaderSizeError(response);
    }
  
    return response;
  };
  
  // エラーハンドリング用の関数
  const handleHeaderSizeError = async (response) => {
    // ヘッダーサイズを削減してリトライ
    const retryOptions = {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      mode: 'cors'
    };
    
    return await fetch(response.url, retryOptions);
  };
  
  // ユーザー関連のAPI関数
  const api = {
    signUp: (userData) => {
      return apiRequest('/users', {
        method: 'POST',
        body: JSON.stringify({ user: userData })
      });
    },
  
    verifyCode: (email, code) => {
      return apiRequest('/users/verify', {
        method: 'POST',
        body: JSON.stringify({ email, code })
      });
    },
  
    resendCode: (email) => {
      return apiRequest('/users/resend_code', {
        method: 'POST',
        body: JSON.stringify({ email })
      });
    }
  };
  
  export default api;