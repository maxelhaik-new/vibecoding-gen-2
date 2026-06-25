# Agent UI Edits to App.tsx

## Step 134: "Update activeTabSidebar and activeMobilePane types and add chat states in App.tsx"
Lines: 268 - 270

### Target Content:
```tsx
  const [activeTabSidebar, setActiveTabSidebar] = useState<'explorer' | 'tools' | 'console'>('explorer');
  const [activeMobilePane, setActiveMobilePane] = useState<'lessons' | 'editor' | 'tools'>('editor');
```

### Replacement Content:
```tsx
  const [activeTabSidebar, setActiveTabSidebar] = useState<'explorer' | 'tools' | 'console' | 'agent'>('explorer');
  const [activeMobilePane, setActiveMobilePane] = useState<'lessons' | 'editor' | 'tools' | 'agent'>('editor');

  // Chat Agent States
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant' | 'tool'; content: string; parts?: any[] }>>([
    { role: 'assistant', content: 'Bonjour ! Je suis votre assistant de workspace Vibe. Je peux lire/écrire vos fichiers de cours (plans, JSON), lancer le pipeline de découpe/rédaction, ou chercher des informations dans le workspace. Que puis-je faire pour vous ?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [agentConfig, setAgentConfig] = useState<{ hasKey: boolean; model: string } | null>(null);

  useEffect(() => {
    fetch('/api/agent/config')
      .then(res => res.json())
      .then(data => setAgentConfig(data))
      .catch(console.error);
  }, []);

```

---

## Step 138: "Add handleSendChatMessage function to App.tsx"
Lines: 673 - 676

### Target Content:
```tsx
  };

  // Helper for status badge styling
```

### Replacement Content:
```tsx
  const handleSendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg = { role: 'user' as const, content: chatInput };
    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          activeLessonSlug: selectedSlug
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.error) {
          setChatMessages(prev => [...prev, { role: 'assistant', content: `❌ Erreur : ${data.error}` }]);
        } else {
          if (data.history) {
            setChatMessages([...data.history, { role: 'assistant', content: data.content }]);
          } else {
            setChatMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
          }
          // Refresh data since agent might have modified files or run pipeline
          fetchLessons();
          if (selectedSlug) {
            fetchLessonData(selectedSlug);
          }
        }
      } else {
        const errData = await res.json();
        setChatMessages(prev => [...prev, { role: 'assistant', content: `❌ Erreur : ${errData.error || 'Erreur serveur'}` }]);
      }
    } catch (err: any) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: `❌ Erreur réseau : ${err.message}` }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Helper for status badge styling
```

---

## Step 144: "Add AI Agent button to activity bar in App.tsx"
Lines: 832 - 846

### Target Content:
```tsx
        <button
          className={`activity-btn ${activeTabSidebar === 'console' && !rightSidebarCollapsed ? 'active' : ''}`}
          onClick={() => {
            if (activeTabSidebar === 'console' && !rightSidebarCollapsed) {
              setRightSidebarCollapsed(true);
            } else {
              setActiveTabSidebar('console');
              setRightSidebarCollapsed(false);
            }
          }}
          title="Console d'Exécution"
        >
          🖥️
        </button>
        <div style={{ flex: 1 }} />
```

### Replacement Content:
```tsx
        <button
          className={`activity-btn ${activeTabSidebar === 'console' && !rightSidebarCollapsed ? 'active' : ''}`}
          onClick={() => {
            if (activeTabSidebar === 'console' && !rightSidebarCollapsed) {
              setRightSidebarCollapsed(true);
            } else {
              setActiveTabSidebar('console');
              setRightSidebarCollapsed(false);
            }
          }}
          title="Console d'Exécution"
        >
          🖥️
        </button>
        <button
          className={`activity-btn ${activeTabSidebar === 'agent' && !rightSidebarCollapsed ? 'active' : ''}`}
          onClick={() => {
            if (activeTabSidebar === 'agent' && !rightSidebarCollapsed) {
              setRightSidebarCollapsed(true);
            } else {
              setActiveTabSidebar('agent');
              setRightSidebarCollapsed(false);
            }
          }}
          title="Agent IA de Workspace"
        >
          🤖
        </button>
        <div style={{ flex: 1 }} />
```

---

## Step 150: "Add Agent tab header button to right sidebar panel in App.tsx"
Lines: 1599 - 1636

### Target Content:
```tsx
            <h3 style={{ fontSize: '13px', fontWeight: 700 }}>
              {activeTabSidebar === 'explorer' || activeTabSidebar === 'tools' ? '⚡ Outils & Validation' : '🖥️ Console'}
            </h3>
          </div>
          
          <div style={{ display: 'flex', background: 'var(--bg-tertiary)', padding: '2px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
            <button
              onClick={() => setActiveTabSidebar('tools')}
              style={{
                padding: '2px 8px',
                background: (activeTabSidebar === 'tools' || activeTabSidebar === 'explorer') ? 'var(--bg-secondary)' : 'transparent',
                border: 'none',
                fontSize: '10px',
                fontWeight: 600,
                borderRadius: '2px',
                cursor: 'pointer',
                color: (activeTabSidebar === 'tools' || activeTabSidebar === 'explorer') ? 'var(--accent-blue)' : 'var(--text-secondary)'
              }}
            >
              Outils
            </button>
            <button
              onClick={() => setActiveTabSidebar('console')}
              style={{
                padding: '2px 8px',
                background: activeTabSidebar === 'console' ? 'var(--bg-secondary)' : 'transparent',
                border: 'none',
                fontSize: '10px',
                fontWeight: 600,
                borderRadius: '2px',
                cursor: 'pointer',
                color: activeTabSidebar === 'console' ? 'var(--accent-blue)' : 'var(--text-secondary)'
              }}
            >
              Console
            </button>
          </div>
```

### Replacement Content:
```tsx
"            <h3 style={{ fontSize: '13px', fontWeight: 700 }}>\n              {activeTabSidebar === 'agent' ? '🤖 Agent IA Workspace' : (activeTabSidebar === 'explorer' || activeTabSidebar === 'tools' ? '⚡ Outils & Validation' : '🖥️ Console')}\n            </h3>\n          </div>\n          \n          <div style={{ display: 'flex', background: 'var(--bg-tertiary)', padding: '2px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>\n            <button\n              onClick={() => setActiveTabSidebar('tools')}\n              style={{\n                padding: '2px 8px',\n                background: (activeTabSidebar === 'tools' || activeTabSidebar === 'explorer') ? 'var(--bg-secondary)' : 'transparent',\n                border: 'none',\n                fontSize: '10px',\n                fontWeight: 600,\n                borderRadius: '2px',\n                cursor: 'pointer',\n                color: (activeTabSidebar === 'tools' || activeTabSidebar === 'explorer') ? 'var(--accent-blue)' : 'var(--text-secondary)'\n              }}\n            >\n              Outils\n            </button>\n            <button\n              onClick={() => setActiveTabSidebar('console')}\n              style={{\n                padding: '2px 8px',\n                background: activeTabSidebar === 'console' ? 'var(--bg-secondary)' : 'transparent',\n                border: 'none',\n                fontSize: '10px',\n                fontWeight: 600,\n                borderRadius: '2px',\n                cursor: 'pointer',\n                color: activeTabSidebar === 'console' ? 'var(--accent-blue)' : 'var(--text-secondary)'\n              }}\n            >\n              Console\n            </button>\n            <button\n              onClick={() => setActiveTabSidebar('agent')}\n              style={{\n                padding: '2px 8px',\n                background: activeTabSidebar === 'agent' ? 'var(--bg-secondary)' : 'transparent',\n                border: 'none',\n                fontSize: '10px',\n   
<truncated 304 bytes>
```

---

## Step 160: "Add Agent button to mobile bottom navigation bar in App.tsx"
Lines: 1932 - 1954

### Target Content:
```tsx
      <nav className="mobile-nav-bar">
        <button
          className={`mobile-nav-btn ${activeMobilePane === 'lessons' ? 'active' : ''}`}
          onClick={() => setActiveMobilePane('lessons')}
        >
          <span className="mobile-nav-icon">📁</span>
          <span>Leçons</span>
        </button>
        <button
          className={`mobile-nav-btn ${activeMobilePane === 'editor' ? 'active' : ''}`}
          onClick={() => setActiveMobilePane('editor')}
        >
          <span className="mobile-nav-icon">📝</span>
          <span>Éditeur</span>
        </button>
        <button
          className={`mobile-nav-btn ${activeMobilePane === 'tools' ? 'active' : ''}`}
          onClick={() => setActiveMobilePane('tools')}
        >
          <span className="mobile-nav-icon">⚡</span>
          <span>Outils</span>
        </button>
      </nav>
```

### Replacement Content:
```tsx
      <nav className="mobile-nav-bar">
        <button
          className={`mobile-nav-btn ${activeMobilePane === 'lessons' ? 'active' : ''}`}
          onClick={() => setActiveMobilePane('lessons')}
        >
          <span className="mobile-nav-icon">📁</span>
          <span>Leçons</span>
        </button>
        <button
          className={`mobile-nav-btn ${activeMobilePane === 'editor' ? 'active' : ''}`}
          onClick={() => setActiveMobilePane('editor')}
        >
          <span className="mobile-nav-icon">📝</span>
          <span>Éditeur</span>
        </button>
        <button
          className={`mobile-nav-btn ${activeMobilePane === 'tools' ? 'active' : ''}`}
          onClick={() => {
            setActiveMobilePane('tools');
            if (activeTabSidebar === 'agent') {
              setActiveTabSidebar('tools');
            }
          }}
        >
          <span className="mobile-nav-icon">⚡</span>
          <span>Outils</span>
        </button>
        <button
          className={`mobile-nav-btn ${activeMobilePane === 'agent' ? 'active' : ''}`}
          onClick={() => {
            setActiveMobilePane('agent');
            setActiveTabSidebar('agent');
            setRightSidebarCollapsed(false);
          }}
        >
          <span className="mobile-nav-icon">🤖</span>
          <span>Agent</span>
        </button>
      </nav>
```

---

## Step 164: "Modify right sidebar class to show on mobile when agent is active"
Lines: 1588 - 1588

### Target Content:
```tsx
      <aside className={`sidebar-panel right-sidebar-panel glass-panel ${rightSidebarCollapsed ? 'collapsed' : ''} ${activeMobilePane === 'tools' ? 'active-mobile' : ''}`}>
```

### Replacement Content:
```tsx
      <aside className={`sidebar-panel right-sidebar-panel glass-panel ${rightSidebarCollapsed ? 'collapsed' : ''} ${(activeMobilePane === 'tools' || activeMobilePane === 'agent') ? 'active-mobile' : ''}`}>
```

---

## Step 170: "Add Agent Chat section to right sidebar content in App.tsx"
Lines: 1909 - 1912

### Target Content:
```tsx
            </section>
          )}
        </div>
      </aside>
```

### Replacement Content:
```tsx
"            </section>\n          )}\n\n          {/* Agent IA Workspace */}\n          {(activeTabSidebar === 'agent') && (\n            <section style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', minHeight: '350px', overflow: 'hidden' }}>\n              {/* Agent Status and Clear */}\n              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>\n                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>\n                  <span style={{ fontSize: '10px', color: 'var(--badge-green-text)', background: 'var(--badge-green-bg)', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>\n                    {agentConfig?.model || 'Gemini 3.5 Flash'}\n                  </span>\n                </div>\n                <button\n                  onClick={() => setChatMessages([\n                    { role: 'assistant', content: 'Discussion réinitialisée. Comment puis-je vous aider sur le workspace ?' }\n                  ])}\n                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '10px', cursor: 'pointer', fontWeight: 600 }}\n                >\n                  Réinitialiser\n                </button>\n              </div>\n\n              {/* Message List */}\n              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '4px', marginBottom: '8px' }}>\n                {chatMessages.map((msg, i) => {\n                  if (msg.role === 'tool') {\n                    const outputs = msg.parts || [];\n                    return (\n                      <div key={i} style={{ fontSize: '10px', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', borderLeft: '2px solid var(--accent-cyan)', padding: '4px 8px', borderRadius: '0 4px 4px 0' }}>\n                        🛠️ {outputs.map((o: any) => o.functionResponse?.name)
<truncated 3605 bytes>
```

---

