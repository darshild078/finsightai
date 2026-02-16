/**
 * Login Page
 * ===========
 * Dark premium login with glassmorphism card.
 * Static auth: demo@finsight.ai / demo123
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay
        await new Promise((r) => setTimeout(r, 800));

        const result = login(email, password);
        if (result.success) {
            navigate('/chat');
        } else {
            setError(result.error);
        }
        setIsLoading(false);
    };

    return (
        <div className="auth-page">
            {/* Background Effects */}
            <div className="auth-bg-effects">
                <div className="auth-gradient-orb auth-orb-1"></div>
                <div className="auth-gradient-orb auth-orb-2"></div>
                <div className="auth-grid-pattern"></div>
            </div>

            {/* Back to Home */}
            <Link to="/" className="auth-back-link">
                <ArrowLeft size={18} />
                <span>Back to Home</span>
            </Link>

            {/* Login Card */}
            <motion.div
                className="auth-card"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
                {/* Logo */}
                <div className="auth-logo">
                    <div className="auth-logo-icon">
                        <Sparkles size={28} />
                    </div>
                    <h1>
                        FinSight <span className="auth-logo-ai">AI</span>
                    </h1>
                </div>

                {/* Heading */}
                <div className="auth-heading">
                    <h2>Welcome Back</h2>
                    <p>Sign in to access your financial insights</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="auth-form">
                    {/* Email Field */}
                    <div className="auth-field">
                        <label htmlFor="email">Email</label>
                        <div className={`auth-input-wrapper ${email ? 'has-value' : ''}`}>
                            <Mail size={18} className="auth-input-icon" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="demo@finsight.ai"
                                required
                                autoFocus
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="auth-field">
                        <label htmlFor="password">Password</label>
                        <div className={`auth-input-wrapper ${password ? 'has-value' : ''}`}>
                            <Lock size={18} className="auth-input-icon" />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="auth-toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            className="auth-error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span>⚠</span> {error}
                        </motion.div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="auth-submit-btn"
                        disabled={isLoading || !email || !password}
                    >
                        {isLoading ? (
                            <div className="auth-spinner"></div>
                        ) : (
                            <>
                                <span>Sign In</span>
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                {/* Demo Credentials Hint */}
                <div className="auth-hint">
                    <p>Demo Credentials</p>
                    <div className="auth-hint-creds">
                        <code>demo@finsight.ai</code>
                        <span>/</span>
                        <code>demo123</code>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
