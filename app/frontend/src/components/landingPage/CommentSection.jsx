import React, { useEffect,useContext} from 'react';
import{MessageCircleCode,User} from "lucide-react"; 

const CommentSection = () => {
    return (
        <div className='comment detail'>
            <section className='detailField'>
                <h2>2. リアルタイムコミュニケーション<MessageCircleCode></MessageCircleCode></h2>
                <p>
                    レビューやフィードバックをリアルタイムでやり取りできるため、
                    疑問点をすぐに解決しながら技術を磨くことができます。
                    チャット機能やコメント機能を活用し、コードの意図や改善点について
                    具体的に議論することで、より深い理解を得ることが可能です。
                    また、他のユーザーの質問や回答を見ることで、新しい視点を学ぶこともできます。
                    即時性のあるコミュニケーションを通じて、成長のスピードを加速させましょう。
                </p>
            </section>

            <div className='communicationField'>
                <div className='user other'>
                    <span><User size={20} /></span>
                    <p>このコードの処理速度を向上させるにはどうすればいいですか？</p>
                </div>
                <div className='user current'>
                    <span><User size={20} /></span>
                    <p>ループの回数を減らすか、キャッシュを活用すると良いですね！具体的な実装例をお見せしましょうか？</p>
                </div>
                <div className='user other'>
                    <span><User size={20} /></span>
                    <p>はい、ぜひお願いします！</p>
                </div>
            </div>
        </div>
    );
};

export default CommentSection;