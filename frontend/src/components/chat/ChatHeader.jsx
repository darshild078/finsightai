/**
 * ChatHeader Component
 * =====================
 * Top bar for the chat area showing conversation title and model info.
 */

import { Sparkles, PanelLeftOpen } from 'lucide-react';

export default function ChatHeader({ title, onToggleSidebar, sidebarCollapsed }) {
    return (
        <header className="chat-header">
            {sidebarCollapsed && (
                <button
                    className="chat-header-menu"
                    onClick={onToggleSidebar}
                    title="Open sidebar"
                >
                    <PanelLeftOpen size={20} />
                </button>
            )}

            <div className="chat-header-info">
                <h2 className="chat-header-title">{title || 'New Chat'}</h2>
                <div className="chat-header-model">
                    <Sparkles size={12} />
                    <span>GPT-4o-mini · RAG</span>
                </div>
            </div>

            <div className="chat-header-status">
                <span className="status-dot"></span>
                <span>Online</span>
            </div>
        </header>
    );
}
