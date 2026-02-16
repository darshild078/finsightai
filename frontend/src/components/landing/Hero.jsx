import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import './../../styles/landing.css';

export default function Hero() {
    return (
        <section className="hero-section">
            {/* Floating Elements */}
            <div className="floating-elements">
                <motion.div
                    className="float-item float-1"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <span className="float-label">SEBI</span>
                    <span className="float-value">Filings</span>
                </motion.div>

                <motion.div
                    className="float-item float-2"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                >
                    <span className="float-label">DRHP</span>
                    <span className="float-value">Analysis</span>
                </motion.div>

                <motion.div
                    className="float-item float-3"
                    animate={{ y: [0, -25, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                >
                    <span className="float-label">AI</span>
                    <span className="float-value">Powered</span>
                </motion.div>

                <motion.div
                    className="float-item float-4"
                    animate={{ y: [0, -18, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, delay: 0.3 }}
                >
                    <span className="float-label">Risk</span>
                    <span className="float-value">Factors</span>
                </motion.div>
            </div>

            {/* Glassmorphism Hero Card */}
            <motion.div
                className="hero-glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Badge */}
                <div className="hero-badge">
                    <Sparkles size={14} />
                    <span>Unlock Your Assets Spark!</span>
                </div>

                {/* Main Heading */}
                <h1 className="hero-title">
                    Instant Insights from
                    <br />
                    <span className="gradient-text">Financial Documents</span>
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle">
                    Dive into Indian financial documents, where innovative AI technology
                    meets financial expertise. Ask questions, get instant answers backed by evidence.
                </p>

                {/* CTA Buttons */}
                <div className="hero-cta-group">
                    <Link to="/login" className="cta-primary">
                        Try for Free
                        <ArrowRight size={18} />
                    </Link>
                    <a href="#features" className="cta-secondary">
                        Discover More
                    </a>
                </div>

                {/* Decorative Lines */}
                <div className="hero-lines">
                    <div className="line line-1"></div>
                    <div className="line line-2"></div>
                    <div className="line line-3"></div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="scroll-indicator"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <span>Scroll down</span>
                <div className="scroll-arrow">↓</div>
            </motion.div>
        </section>
    );
}
