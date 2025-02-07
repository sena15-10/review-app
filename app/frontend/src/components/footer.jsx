import React from "react";
import { Code2, Twitter, Globe } from "lucide-react";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <h2 className="webName">Rview</h2>
                    <p className="footer-description">
                        コードレビューを通じて、プログラミングスキルを向上させるプラットフォーム
                    </p>
                </div>
                
                <div className="footer-sections">
                    <div className="footer-section">
                        <h3>サービス</h3>
                        <ul>
                            <li>コードレビュー</li>
                            <li>技術相談</li>
                            <li>メンタリング</li>
                            <li>コミュニティ</li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h3>お問い合わせ</h3>
                        <ul>
                            <li>ヘルプセンター</li>
                            <li>利用規約</li>
                            <li>プライバシーポリシー</li>
                            <li>お問い合わせ</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p className="copyright">© 2024 Rview. All rights reserved.</p>
                <div className="social-links">
                    <a href="https://github.com" className="social-link">
                        <Code2 size={20} />
                    </a>
                    <a href="https://twitter.com" className="social-link">
                        <Twitter size={20} />
                    </a>
                    <a href="#" className="social-link">
                        <Globe size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer