/**
 * Sidebar Component
 * ==================
 * Chat history sidebar with conversation list, new chat, and logout.
 */

import { useState } from 'react';
import {
    Plus, MessageSquare, Trash2, LogOut, Sparkles,
    PanelLeftClose, PanelLeftOpen, MoreHorizontal
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({
    conversations,
    activeId,
    onSelect,
    onNewChat,
    onDelete,
    isCollapsed,
    onToggleCollapse,
}) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [hoveredId, setHoveredId] = useState(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Group conversations by date
    const today = new Date();
    const todayStr = today.toDateString();
    const yesterdayStr = new Date(today - 86400000).toDateString();

    const grouped = {
        today: [],
        yesterday: [],
        older: [],
    };

    conversations.forEach((conv) => {
        const d = new Date(conv.updatedAt).toDateString();
        if (d === todayStr) grouped.today.push(conv);
        else if (d === yesterdayStr) grouped.yesterday.push(conv);
        else grouped.older.push(conv);
    });

    if (isCollapsed) {
        return (
            <aside className="sidebar sidebar-collapsed">
                <button className="sidebar-toggle-btn" onClick={onToggleCollapse} title="Expand sidebar">
                    <PanelLeftOpen size={20} />
                </button>
                <button className="sidebar-icon-btn" onClick={onNewChat} title="New Chat">
                    <Plus size={20} />
                </button>
                <div className="sidebar-collapsed-spacer"></div>
                <button className="sidebar-icon-btn sidebar-logout-icon" onClick={handleLogout} title="Logout">
                    <LogOut size={20} />
                </button>
            </aside>
        );
    }

    return (
        <aside className="sidebar">
            {/* Header */}
            <div className="sidebar-header">
                <div className="sidebar-brand">
                    <Sparkles size={20} className="sidebar-brand-icon" />
                    <span>FinSight AI</span>
                </div>
                <button className="sidebar-toggle-btn" onClick={onToggleCollapse} title="Collapse sidebar">
                    <PanelLeftClose size={20} />
                </button>
            </div>

            {/* New Chat Button */}
            <button className="sidebar-new-chat" onClick={onNewChat}>
                <Plus size={18} />
                <span>New Chat</span>
            </button>

            {/* Conversation List */}
            <div className="sidebar-conversations">
                {conversations.length === 0 && (
                    <div className="sidebar-empty">
                        <p>No conversations yet</p>
                    </div>
                )}

                {grouped.today.length > 0 && (
                    <div className="sidebar-group">
                        <span className="sidebar-group-label">Today</span>
                        {grouped.today.map((conv) => (
                            <ConversationItem
                                key={conv.id}
                                conv={conv}
                                isActive={conv.id === activeId}
                                isHovered={conv.id === hoveredId}
                                onSelect={() => onSelect(conv.id)}
                                onDelete={() => onDelete(conv.id)}
                                onMouseEnter={() => setHoveredId(conv.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            />
                        ))}
                    </div>
                )}

                {grouped.yesterday.length > 0 && (
                    <div className="sidebar-group">
                        <span className="sidebar-group-label">Yesterday</span>
                        {grouped.yesterday.map((conv) => (
                            <ConversationItem
                                key={conv.id}
                                conv={conv}
                                isActive={conv.id === activeId}
                                isHovered={conv.id === hoveredId}
                                onSelect={() => onSelect(conv.id)}
                                onDelete={() => onDelete(conv.id)}
                                onMouseEnter={() => setHoveredId(conv.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            />
                        ))}
                    </div>
                )}

                {grouped.older.length > 0 && (
                    <div className="sidebar-group">
                        <span className="sidebar-group-label">Previous</span>
                        {grouped.older.map((conv) => (
                            <ConversationItem
                                key={conv.id}
                                conv={conv}
                                isActive={conv.id === activeId}
                                isHovered={conv.id === hoveredId}
                                onSelect={() => onSelect(conv.id)}
                                onDelete={() => onDelete(conv.id)}
                                onMouseEnter={() => setHoveredId(conv.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* User Section */}
            <div className="sidebar-user">
                <div className="sidebar-user-info">
                    <div className="sidebar-user-avatar">{user?.avatar || 'U'}</div>
                    <div className="sidebar-user-details">
                        <span className="sidebar-user-name">{user?.name || 'User'}</span>
                        <span className="sidebar-user-email">{user?.email || ''}</span>
                    </div>
                </div>
                <button className="sidebar-logout-btn" onClick={handleLogout} title="Logout">
                    <LogOut size={18} />
                </button>
            </div>
        </aside>
    );
}

function ConversationItem({ conv, isActive, isHovered, onSelect, onDelete, onMouseEnter, onMouseLeave }) {
    return (
        <div
            className={`sidebar-conv-item ${isActive ? 'active' : ''}`}
            onClick={onSelect}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <MessageSquare size={16} className="sidebar-conv-icon" />
            <span className="sidebar-conv-title">{conv.title}</span>
            {(isHovered || isActive) && (
                <button
                    className="sidebar-conv-delete"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    title="Delete"
                >
                    <Trash2 size={14} />
                </button>
            )}
        </div>
    );
}
