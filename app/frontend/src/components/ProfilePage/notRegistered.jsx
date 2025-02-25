import React, { useState, useEffect } from "react";
import { User2, X } from "lucide-react";

const AnimatedProfileModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // プロフィールページに遷移してからモーダルを表示するまでの遅延
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const closeModal = () => {
    setIsVisible(false);
  };
  
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* オーバーレイ背景 */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={closeModal}></div>
      
      {/* モーダルコンテンツ */}
      <div 
        className={`bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 relative flex flex-col items-center text-center transform transition-all duration-500 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-90 translate-y-4'
        }`}
      >
        {/* 閉じるボタン */}
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>
        
        {/* アイコンとコンテンツ - アニメーション付きのアイコン */}
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
          <User2 size={48} className="text-blue-500" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-gray-800">プロフィールが登録されていません</h2>
        <p className="text-gray-600 mb-6">プロフィールを登録して、他のユーザーと情報を共有しましょう</p>
        
        {/* ボタン */}
        <div className="space-y-3 w-full">
          <button className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-md">
            今すぐプロフィールを登録する
          </button>
          <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium">
            あとで登録する
          </button>
        </div>
      </div>
    </div>
  );
};

// アニメーション効果を加えたラッパーコンポーネント
const AnimatedModalWrapper = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50">
      <AnimatedProfileModal />
    </div>
  );
};

export default AnimatedModalWrapper;