import React from "react";
import{User2,MessagesSquare} from "lucide-react";

const CommunitySection = () => {
    return (
    <div className='community detailText'>
        <section className="detailField">
            <h2>3. 活発なコミュニティ <MessagesSquare size={35} /></h2>
            <p>
                プログラミングの知見を共有し、共に成長できる活発なコミュニティを提供します。
                スレッド形式の掲示板では、特定のトピックについて深く議論したり、
                コードの改善点や最新技術について意見を交わしたりすることができます。
                初心者から上級者まで幅広いメンバーが参加し、お互いに学び合える環境が整っています。
                同じ課題に取り組む仲間と出会い、刺激を受けながらスキルアップを目指しましょう。
                交流を通じて、新しいアイデアや実践的な知識を得ることができます。
                プログラミングに関する疑問や挑戦を、気軽にコミュニティで共有しましょう！
            </p>
        </section>
        <div className="ThreadField">
            <div className="thread">
                <p className="userInfo">
                    <span className="userIcon">
                        <User2 size={24} />
                    </span>
                    <span>frontend_dev</span>
                </p>
                <p className="content">
                    TypeScriptでのベストプラクティスについて質問です。
                    特にジェネリクスの活用方法について、実務での具体例を交えて
                    アドバイスいただけると助かります。
                </p>
            </div>
            <div className="thread">
                <p className="userInfo">
                    <span className="userIcon">
                        <User2 size={24} />
                    </span>
                    <span>docker_master</span>
                </p>
                <p className="content">
                    Dockerのマルチステージビルドを活用した
                    本番環境でのデプロイメントフローについて共有します。
                    特にNode.jsアプリケーションの場合の最適化テクニックを
                    紹介させていただきます。
                </p>
            </div>
        </div>
    </div>
    )
}
export default CommunitySection;