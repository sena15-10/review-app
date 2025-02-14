// api.js
const API_CONFIG = {
  BASE_URL: '/api/v1'
};

const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  // 必要最小限のヘッダーのみを設定
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await fetch(url, config);
    
    // エラーレスポンスの処理
    if (!response.ok) {
      // レスポンスが存在し、JSONとして解析可能な場合
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'リクエストが失敗しました');
      }
      // それ以外のエラー
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 正常なレスポンスの処理
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return response.json();
    }
    return response;

  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

const api = {
  signUp: (userData) => {
    // 必要なデータのみを送信
    const formattedData = {
      user: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.passwordConfirmation
      }
    };
    
    return apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(formattedData)
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