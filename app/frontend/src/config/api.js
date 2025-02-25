import Session from "../components/sessionPage/session";

// api.js
const API_CONFIG = {
  BASE_URL: '/api/v1'
};

const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const errorData = await response.json();
        // エラーオブジェクトにステータスを追加
        const error = new Error(errorData.message || 'リクエストが失敗しました');
        error.status = response.status;  // ここでステータスを保持
        throw error;
      }
      const error = new Error(`HTTP error! status: ${response.status}`);
      error.status = response.status;  // ここでもステータスを保持
      throw error;
    }

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return response.json();
    }
    return response;

  } catch (error) {
    console.error('API request failed:', error);
    // すでにステータスが設定されているエラーはそのまま再スロー
    if (error.status) {
      throw error;
    }
    // その他のエラーは一般的なエラーとして扱う
    const generalError = new Error(error.message);
    generalError.status = 500;  // ネットワークエラーなどの場合
    throw generalError;
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

  login: (formData) => {
    const formattedData = {
      session:{
        email: formData.email,
        password: formData.password
      }
    };
    return apiRequest('/sessions',{
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
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    return apiRequest('/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },  // ここにカンマを追加
  // 他のメソッドが続く...

  updateProfile: (profileData) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    
    if (profileData.avatar) {
        formData.append('profile[avatar]', profileData.avatar);
    }

    Object.entries(profileData).forEach(([key, value]) => {
        if (key !== 'avatar') {
            formData.append(`profile[${key}]`, JSON.stringify(value));
        }
    });

    return apiRequest('/profiles', {
          method: 'PUT',
          headers: {
              'Authorization': `Bearer ${token}`
          },
          body: formData
      });
    }
};

export default api;