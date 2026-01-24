import { useState } from 'react';
import './AppLayout.css';

type Page = 'dashboard' | 'mycodes' | 'create';

interface AppLayoutProps {
    children: React.ReactNode;
    currentPage: Page;
    onNavigate: (page: Page) => void;
    isFreeAccount?: boolean;
}

const pageTitles: Record<Page, string> = {
    dashboard: 'Dashboard',
    mycodes: 'My Codes',
    create: 'Create'
};

export function AppLayout({ children, currentPage, onNavigate, isFreeAccount }: AppLayoutProps) {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [signupModalOpen, setSignupModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');

    const handleLogin = () => {
        console.log('Login with email:', email);
        // Implement login logic here
    };

    const handleGoogleLogin = () => {
        console.log('Login with Google');
        // Implement Google login logic here
    };

    const handleSignup = () => {
        console.log('Signup with email:', signupEmail);
        // Implement signup logic here
    };

    const handleGoogleSignup = () => {
        console.log('Signup with Google');
        // Implement Google signup logic here
    };

    const switchToSignup = () => {
        setLoginModalOpen(false);
        setSignupModalOpen(true);
    };

    const switchToLogin = () => {
        setSignupModalOpen(false);
        setLoginModalOpen(true);
    };

    return (
        <div className="app-layout">
            {/* Header */}
            <header className="header">
                <div className="logo">Logo</div>
                <div>
                <button className="login-btn" onClick={() => setLoginModalOpen(true)}>
                    Login
                </button>
                <button className="login-btn" onClick={() => setSignupModalOpen(true)}>
                    Signup
                </button>
                </div>

            </header>
            
            <div className="main-container">
                {/* Sidebar */}
                <aside className="sidebar">
                    <nav className="nav">
                        <ul>
                            <li>
                                <a 
                                    href="#" 
                                    onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }}
                                    className={currentPage === 'dashboard' ? 'active' : ''}
                                >
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#" 
                                    onClick={(e) => { e.preventDefault(); onNavigate('create'); }}
                                    className={currentPage === 'create' ? 'active' : ''}
                                >
                                    Create
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#" 
                                    onClick={(e) => { e.preventDefault(); onNavigate('mycodes'); }}
                                    className={currentPage === 'mycodes' ? 'active' : ''}
                                >
                                    My Codes
                                </a>
                            </li>
                        </ul>
                    </nav>
                </aside>
                
                {/* Main Content */}
                <main className="content">
                                <div className="dashboard-header">
                <h1>{pageTitles[currentPage]}</h1>
                {isFreeAccount && (
                    <span className="account-badge free">Free Account</span>
                )}
            </div>
                    {children}
                </main>
            </div>

            {/* Login Modal */}
            {loginModalOpen && (
                <>
                    <div className="login-modal-overlay" onClick={() => setLoginModalOpen(false)}></div>
                    <div className="login-modal-content">
                        <button className="login-modal-close" onClick={() => setLoginModalOpen(false)}>
                            ✕
                        </button>

                        <div className="login-modal-icon">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <rect x="8" y="8" width="10" height="10" rx="2" fill="#3b82f6"/>
                                <rect x="22" y="8" width="10" height="10" rx="2" fill="#3b82f6"/>
                                <rect x="8" y="22" width="10" height="10" rx="2" fill="#3b82f6"/>
                                <rect x="22" y="22" width="10" height="10" rx="2" fill="#3b82f6"/>
                            </svg>
                        </div>

                        <h2 className="login-modal-title">Welcome Back</h2>
                        <p className="login-modal-subtitle">Please enter your details to sign in</p>

                        <input
                            type="email"
                            className="login-modal-input"
                            placeholder="example@domain.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button className="login-modal-continue" onClick={handleLogin}>
                            Continue
                        </button>

                        <div className="login-modal-divider">
                            <span>OR</span>
                        </div>

                        <button className="login-modal-google" onClick={handleGoogleLogin}>
                            <svg width="18" height="18" viewBox="0 0 18 18">
                                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                                <path fill="#34A853" d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9.003 18z"/>
                                <path fill="#FBBC05" d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                                <path fill="#EA4335" d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.003 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z"/>
                            </svg>
                            Continue with Google
                        </button>

                        <p className="login-modal-footer">
                            No account?  <a href="#" onClick={(e) => { e.preventDefault(); switchToSignup(); }}>Create one</a>
                        </p>
                    </div>
                </>
            )}

            {/* Signup Modal */}
            {signupModalOpen && (
                <>
                    <div className="login-modal-overlay" onClick={() => setSignupModalOpen(false)}></div>
                    <div className="login-modal-content">
                        <button className="login-modal-close" onClick={() => setSignupModalOpen(false)}>
                            ✕
                        </button>

                        <div className="login-modal-icon">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <rect x="8" y="8" width="10" height="10" rx="2" fill="#3b82f6"/>
                                <rect x="22" y="8" width="10" height="10" rx="2" fill="#3b82f6"/>
                                <rect x="8" y="22" width="10" height="10" rx="2" fill="#3b82f6"/>
                                <rect x="22" y="22" width="10" height="10" rx="2" fill="#3b82f6"/>
                            </svg>
                        </div>

                        <h2 className="login-modal-title">Create Account</h2>
                        <p className="login-modal-subtitle">Sign up to start creating QR codes</p>

                        <input
                            type="email"
                            className="login-modal-input"
                            placeholder="example@domain.com"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            className="login-modal-input"
                            placeholder="Password"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                        />

                        <button className="login-modal-continue" onClick={handleSignup}>
                            Create Account
                        </button>

                        <div className="login-modal-divider">
                            <span>OR</span>
                        </div>

                        <button className="login-modal-google" onClick={handleGoogleSignup}>
                            <svg width="18" height="18" viewBox="0 0 18 18">
                                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                                <path fill="#34A853" d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9.003 18z"/>
                                <path fill="#FBBC05" d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                                <path fill="#EA4335" d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.003 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z"/>
                            </svg>
                            Continue with Google
                        </button>

                        <p className="login-modal-footer">
                            Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); switchToLogin(); }}>Sign in</a>
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

