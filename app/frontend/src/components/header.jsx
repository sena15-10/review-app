import React,{useState} from 'react';
import { Link ,useLocation} from 'react-router-dom';
import { Code2, MessageSquare, Home, Send, LogIn, UserPlus, LogOut, User,MessageSquareTextIcon } from 'lucide-react';
import { useUser } from '../context/userContext';
const Header = () => {
    const { user, isLoading } = useUser(); // Contextからユーザー情報とローディング状態を取得
    const hideButtonPaths = ["/login", "/signup"];
    const [isMenuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const shouldHideButtons = hideButtonPaths.includes(location.pathname.toLowerCase());
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen)
    }
    return (
        <header className="header">
            <div className="container">
                <div className="title">
                    <Code2 size={32} className={`code ${isMenuOpen ? 'active' : ''} `} onClick={toggleMenu}/>
                    <h1 className="webName">Rview</h1>
                </div>
                <nav className={`navigation ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/top" className="homeLink">
                      <Home size={20} />
                      <span>HOME</span>
                    </Link>
                    <a href="#" className="reviewLink">
                        <Code2 size={20} />
                        <span>REVIEW</span>
                    </a>
                    <a href="#" className="threadLink">
                        <MessageSquare size={20} />
                        <span>THREAD</span>
                    </a>
                    <a href="#" className="codeSendLink">
                        <Send size={20} />
                        <span>CODE SEND</span>
                    </a>
                    <a href='#' className="logoutLink">
                        <LogOut size={20} />
                        <span>LOGOUT</span>
                    </a>
                    <a href='#' className='sendMesseageLink'>
                        <MessageSquareTextIcon size={20} />
                        <span>SEND MESSAGE</span>
                    </a>
                </nav>

                {/* Auth Buttons */}
                <div className="auth">
                    {/* ローディング中でなく、ボタンを隠す必要がない場合に表示 */}
                    {!isLoading && !shouldHideButtons && (
                        user ? ( // userオブジェクトが存在すればログイン済みと判断
                            <>
                                <Link to={"/profile"} className="user-profile-link">
                                    <button className="user-profile-button">
                                        <User size={25} />
                                        <span className="username">{user.name}</span>
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className="">
                                        <LogIn size={20} />
                                        <span>Login</span>
                                    </button>
                                </Link>
                                <Link to="/signup">
                                    <button className="">
                                        <UserPlus size={20} />
                                        <span>Sign Up</span>
                                    </button>
                                </Link>
                            </>
                        )
                    )}
                </div>
                </div>
        </header>
    );
};

export default Header
