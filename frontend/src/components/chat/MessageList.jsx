/**
 * MessageList Component
 * ======================
 * Displays chat messages with user and AI styling.
 * Includes markdown rendering, timestamps, evidence, and copy buttons.
 */

import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

function formatTime(timestamp) {
    if (!timestamp) return '';
    const d = new Date(timestamp);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function MessageList({ messages, isLoading }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    return (
        <div className="chat-messages">
            {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
            ))}

            {/* Loading Skeleton */}
            {isLoading && (
                <div className="chat-msg chat-msg-assistant">
                    <div className="chat-msg-avatar chat-avatar-ai">
                        <span>✦</span>
                    </div>
                    <div className="chat-msg-content">
                        <div className="chat-msg-header">
                            <span className="chat-msg-role">FinSight AI</span>
                        </div>
                        <div className="chat-skeleton">
                            <div className="skeleton-line skeleton-line-1"></div>
                            <div className="skeleton-line skeleton-line-2"></div>
                            <div className="skeleton-line skeleton-line-3"></div>
                        </div>
                    </div>
                </div>
            )}

            <div ref={bottomRef} />
        </div>
    );
}

function MessageBubble({ message }) {
    const isUser = message.role === 'user';
    const [copied, setCopied] = useState(false);
    const [showEvidence, setShowEvidence] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const evidence = message.metadata?.evidence || [];
    const citations = message.metadata?.citations || [];

    return (
        <div className={`chat-msg ${isUser ? 'chat-msg-user' : 'chat-msg-assistant'}`}>
            {/* Avatar */}
            <div className={`chat-msg-avatar ${isUser ? 'chat-avatar-user' : 'chat-avatar-ai'}`}>
                <span>{isUser ? 'Y' : '✦'}</span>
            </div>

            {/* Content */}
            <div className="chat-msg-content">
                <div className="chat-msg-header">
                    <span className="chat-msg-role">{isUser ? 'You' : 'FinSight AI'}</span>
                    <span className="chat-msg-time">{formatTime(message.timestamp)}</span>
                </div>

                {/* Markdown rendering for AI, plain text for user */}
                {isUser ? (
                    <div className="chat-msg-text">{message.content}</div>
                ) : (
                    <div className="chat-msg-text chat-msg-markdown">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                )}

                {/* Assistant extras */}
                {!isUser && (
                    <div className="chat-msg-actions">
                        {/* Citations */}
                        {citations.length > 0 && (
                            <div className="chat-citations">
                                <span className="chat-citations-label">Sources:</span>
                                {citations.map((id) => (
                                    <span key={id} className="chat-citation-badge">{id}</span>
                                ))}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="chat-msg-btns">
                            <button className="chat-action-btn" onClick={handleCopy} title="Copy">
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                <span>{copied ? 'Copied' : 'Copy'}</span>
                            </button>

                            {evidence.length > 0 && (
                                <button
                                    className="chat-action-btn"
                                    onClick={() => setShowEvidence(!showEvidence)}
                                    title="Toggle Evidence"
                                >
                                    {showEvidence ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                    <span>Evidence ({evidence.length})</span>
                                </button>
                            )}
                        </div>

                        {/* Evidence Panel */}
                        {showEvidence && evidence.length > 0 && (
                            <div className="chat-evidence-panel">
                                {evidence.map((item) => (
                                    <EvidenceChunk key={item.chunk_id} item={item} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function EvidenceChunk({ item }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`chat-evidence-item ${expanded ? 'expanded' : ''}`}>
            <button className="chat-evidence-header" onClick={() => setExpanded(!expanded)}>
                <span className="chat-evidence-id">{item.chunk_id}</span>
                <span className="chat-evidence-preview">
                    {expanded ? '' : item.snippet.slice(0, 80) + '...'}
                </span>
                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {expanded && (
                <div className="chat-evidence-body">
                    <p>{item.snippet}</p>
                </div>
            )}
        </div>
    );
}
