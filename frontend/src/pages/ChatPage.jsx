/**
 * ChatPage
 * =========
 * Main chat interface with sidebar, header, message area, and keyboard shortcuts.
 * Uses the existing api.js askQuestion() to talk to the backend.
 */

import { useState, useCallback, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { askQuestion } from '../api';
import useConversations from '../hooks/useConversations';
import Sidebar from '../components/chat/Sidebar';
import ChatHeader from '../components/chat/ChatHeader';
import MessageList from '../components/chat/MessageList';
import ChatInput from '../components/chat/ChatInput';
import { Sparkles, MessageSquare } from 'lucide-react';
import '../styles/chat.css';

export default function ChatPage() {
    const {
        conversations,
        activeConversation,
        activeId,
        createConversation,
        addMessage,
        selectConversation,
        deleteConversation,
    } = useConversations();

    const [isLoading, setIsLoading] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // --- Keyboard Shortcuts ---
    useEffect(() => {
        const handleKeyboard = (e) => {
            // Ctrl/Cmd + N → New Chat
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                handleNewChat();
                toast('New chat created', { icon: '💬', duration: 1500 });
            }

            // Ctrl/Cmd + B → Toggle Sidebar
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                setSidebarCollapsed((prev) => !prev);
            }

            // Ctrl/Cmd + Backspace → Delete current chat
            if ((e.ctrlKey || e.metaKey) && e.key === 'Backspace' && activeId) {
                e.preventDefault();
                deleteConversation(activeId);
                toast('Chat deleted', { icon: '🗑️', duration: 1500 });
            }
        };

        window.addEventListener('keydown', handleKeyboard);
        return () => window.removeEventListener('keydown', handleKeyboard);
    }, [activeId, deleteConversation]);

    const handleSend = useCallback(
        async (question) => {
            // Create conversation if none active
            let convId = activeId;
            if (!convId) {
                convId = createConversation();
            }

            // Add user message
            addMessage(convId, 'user', question);

            // Call backend (same pattern as original App.jsx)
            setIsLoading(true);
            try {
                const data = await askQuestion(question);
                addMessage(convId, 'assistant', data.answer, {
                    citations: data.citations || [],
                    evidence: data.evidence || [],
                });
            } catch (err) {
                const errorMsg = err.message || 'Something went wrong. Is the backend running?';
                addMessage(convId, 'assistant', `⚠️ Error: ${errorMsg}`, {});
                toast.error(errorMsg, { duration: 4000 });
            } finally {
                setIsLoading(false);
            }
        },
        [activeId, createConversation, addMessage]
    );

    const handleNewChat = () => {
        createConversation();
    };

    return (
        <div className="chat-page">
            {/* Toast Notifications */}
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        background: '#1a1a2e',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '12px',
                        fontSize: '14px',
                    },
                }}
            />

            {/* Sidebar */}
            <Sidebar
                conversations={conversations}
                activeId={activeId}
                onSelect={selectConversation}
                onNewChat={handleNewChat}
                onDelete={deleteConversation}
                isCollapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Main Chat Area */}
            <main className={`chat-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
                {activeConversation && activeConversation.messages.length > 0 ? (
                    <>
                        <ChatHeader
                            title={activeConversation.title}
                            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
                            sidebarCollapsed={sidebarCollapsed}
                        />
                        <MessageList
                            messages={activeConversation.messages}
                            isLoading={isLoading}
                        />
                        <ChatInput onSend={handleSend} isLoading={isLoading} />
                    </>
                ) : (
                    /* Empty State / Welcome */
                    <div className="chat-welcome">
                        <div className="chat-welcome-content">
                            <div className="chat-welcome-icon">
                                <Sparkles size={40} />
                            </div>
                            <h1>FinSight AI</h1>
                            <p>Your AI-powered financial document analyst</p>

                            <div className="chat-welcome-prompts">
                                <h3>Try asking:</h3>
                                <div className="chat-prompt-cards">
                                    {[
                                        'What are the key risk factors?',
                                        'Who are the promoters?',
                                        'What is the business overview?',
                                        'What are the financial highlights?',
                                    ].map((prompt) => (
                                        <button
                                            key={prompt}
                                            className="chat-prompt-card"
                                            onClick={() => handleSend(prompt)}
                                        >
                                            <MessageSquare size={16} />
                                            <span>{prompt}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Keyboard Shortcuts Hint */}
                            <div className="chat-shortcuts">
                                <span>⌨️ Shortcuts:</span>
                                <kbd>Ctrl+N</kbd> New Chat
                                <kbd>Ctrl+B</kbd> Toggle Sidebar
                            </div>
                        </div>
                        <ChatInput onSend={handleSend} isLoading={isLoading} />
                    </div>
                )}
            </main>
        </div>
    );
}
