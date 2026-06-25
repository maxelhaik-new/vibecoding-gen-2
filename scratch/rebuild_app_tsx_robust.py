import os

file_path = 'studio/src/App.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Normalize CRLF to LF
code = code.replace('\r\n', '\n')

print("Normalized line endings to LF.")
print(f"Code length: {len(code)}")

# 1. State declarations replacement
target_states = """  const [planMode, setPlanMode] = useState<'edit' | 'preview' | 'split'>('preview');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');"""

replacement_states = """  const [planMode, setPlanMode] = useState<'edit' | 'preview' | 'split'>('preview');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState<boolean>(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState<boolean>(false);
  const [activeTabSidebar, setActiveTabSidebar] = useState<'tools' | 'console' | 'agent'>('tools');
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
  }, []);"""

if target_states in code:
    code = code.replace(target_states, replacement_states, 1)
    print("1. Applied state declarations replacement successfully.")
else:
    print("1. ERROR: Target states not found!")

# 2. handleSendChatMessage function insertion
target_func = """  useEffect(() => {
    if (selectedSlug) {
      fetchLessonData(selectedSlug);
    }
  }, [selectedSlug]);"""

replacement_func = """  useEffect(() => {
    if (selectedSlug) {
      fetchLessonData(selectedSlug);
    }
  }, [selectedSlug]);

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
  };"""

if target_func in code:
    code = code.replace(target_func, replacement_func, 1)
    print("2. Applied handleSendChatMessage insertion successfully.")
else:
    print("2. ERROR: Target function anchor not found!")

# 3. Main layout opening tag replacement
target_layout = """  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: 'var(--bg-primary)', overflow: 'hidden' }}>
      
      {/* 1. LEFT SIDEBAR: Lessons Browser */}
      <aside className="glass-panel" style={{
        width: '320px',
        height: 'calc(100vh - 24px)',
        margin: '12px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>"""

replacement_layout = """  return (
    <div className="app-container">
      {/* 0. ACTIVITY BAR (far left) */}
      <nav className="activity-bar">
        <button
          className={`activity-btn ${!leftSidebarCollapsed ? 'active' : ''}`}
          onClick={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
          title="Explorateur de Leçons (📁)"
        >
          📁
        </button>
        <button
          className={`activity-btn ${activeTabSidebar === 'tools' && !rightSidebarCollapsed ? 'active' : ''}`}
          onClick={() => {
            if (activeTabSidebar === 'tools' && !rightSidebarCollapsed) {
              setRightSidebarCollapsed(true);
            } else {
              setActiveTabSidebar('tools');
              setRightSidebarCollapsed(false);
            }
          }}
          title="Outils & Validation (⚡)"
        >
          ⚡
        </button>
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
          title="Console d'Exécution (🖥️)"
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
          title="Agent IA de Workspace (🤖)"
        >
          🤖
        </button>
        <div style={{ flex: 1 }} />
        <button
          className="activity-btn"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          title={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </nav>
      
      {/* 1. LEFT SIDEBAR: Lessons Browser */}
      <aside className={`sidebar-panel glass-panel ${leftSidebarCollapsed ? 'collapsed' : ''} ${activeMobilePane === 'lessons' ? 'active-mobile' : ''}`} style={{
        margin: '12px',
        height: 'calc(100vh - 24px)'
      }}>"""

if target_layout in code:
    code = code.replace(target_layout, replacement_layout, 1)
    print("3. Applied main layout and activity bar successfully.")
else:
    print("3. ERROR: Target layout structure not found!")

# 4. Central workspace main tag replacement
target_main = """      {/* 2. CENTRAL WORKSPACE: Document Editor & Visual Mockup */}
      <main style={{
        flex: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 0 12px 12px',
        overflow: 'hidden'
      }}>"""

replacement_main = """      {/* 2. CENTRAL WORKSPACE: Document Editor & Visual Mockup */}
      <main className={`workspace-panel ${activeMobilePane === 'editor' ? 'active-mobile' : ''}`} style={{
        padding: '12px 0 12px 12px'
      }}>"""

if target_main in code:
    code = code.replace(target_main, replacement_main, 1)
    print("4. Applied central workspace wrapper successfully.")
else:
    print("4. ERROR: Target central workspace main tag not found!")

# 5. Right Sidebar and footer replacement using indices
start_marker = "      {/* 3. RIGHT SIDEBAR: Script Orchestrator & Live Terminal */}"
end_marker = """      {/* Modal for creating a new lesson */}
      {showCreateModal && ("""

start_idx = code.find(start_marker)
end_idx = code.find(end_marker)

replacement_right = """      {/* 3. RIGHT SIDEBAR: Script Orchestrator & Live Terminal */}
      <aside className={`sidebar-panel right-sidebar-panel glass-panel ${rightSidebarCollapsed ? 'collapsed' : ''} ${(activeMobilePane === 'tools' || activeMobilePane === 'agent') ? 'active-mobile' : ''}`} style={{
        margin: '12px',
        height: 'calc(100vh - 24px)'
      }}>
        {/* Header tabs selector */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 'var(--header-toolbar-height)' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700 }}>
            {activeTabSidebar === 'agent' ? '🤖 Agent IA Workspace' : (activeTabSidebar === 'tools' ? '⚡ Outils & Validation' : '🖥️ Console')}
          </h3>
          
          <div style={{ display: 'flex', background: 'var(--bg-tertiary)', padding: '2px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
            <button
              onClick={() => setActiveTabSidebar('tools')}
              style={{
                padding: '2px 8px',
                background: activeTabSidebar === 'tools' ? 'var(--bg-secondary)' : 'transparent',
                border: 'none',
                fontSize: '10px',
                fontWeight: 600,
                borderRadius: '2px',
                cursor: 'pointer',
                color: activeTabSidebar === 'tools' ? 'var(--accent-blue)' : 'var(--text-secondary)'
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
            <button
              onClick={() => setActiveTabSidebar('agent')}
              style={{
                padding: '2px 8px',
                background: activeTabSidebar === 'agent' ? 'var(--bg-secondary)' : 'transparent',
                border: 'none',
                fontSize: '10px',
                fontWeight: 600,
                borderRadius: '2px',
                cursor: 'pointer',
                color: activeTabSidebar === 'agent' ? 'var(--accent-blue)' : 'var(--text-secondary)'
              }}
            >
              Agent
            </button>
          </div>
        </div>

        {/* Tab contents */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '12px', gap: '12px' }}>
          {activeTabSidebar === 'tools' && (
            <>
              {/* Field Validation Panel */}
              <section className="glass-panel" style={{ padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                  🎯 Validation du Champ
                </h3>
                {focusedFieldInfo ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Slide {focusedFieldInfo.slideIndex + 1}</span>
                      <span style={{ fontSize: '12px', color: 'var(--accent-blue)', fontWeight: 600 }}>{focusedFieldInfo.fieldKey}</span>
                    </div>
                    
                    {focusedFieldInfo.rule ? (() => {
                      const len = focusedFieldInfo.value.length;
                      const min = focusedFieldInfo.rule.min_lenght;
                      const max = focusedFieldInfo.rule.max_lenght;
                      const isTooShort = len < min;
                      const isTooLong = len > max;
                      const isInvalid = isTooShort || isTooLong;
                      
                      return (
                        <div style={{ 
                          marginTop: '8px',
                          padding: '12px',
                          borderRadius: '6px',
                          background: isInvalid ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                          border: `1px solid ${isInvalid ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'all 0.2s ease'
                        }}>
                          <span style={{ fontSize: '13px', color: isInvalid ? 'var(--accent-red)' : 'var(--accent-green)', fontWeight: 700 }}>
                            {len} caractères
                          </span>
                          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                            Requis : {min} - {max}
                          </span>
                        </div>
                      );
                    })() : (
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Aucune règle spécifique.</div>
                    )}
                  </div>
                ) : (
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', padding: '8px 0' }}>
                    Sélectionnez un champ texte sur une slide pour voir ses contraintes.
                  </div>
                )}
              </section>

              {/* Script Orchestrator / Pipeline launcher */}
              <section className="glass-panel" style={{ padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                  ⚡ Lanceur de Pipeline
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Modèle IA (Optionnel) :</label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      style={{
                        padding: '6px 10px',
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        color: 'var(--text-primary)',
                        fontSize: '12px',
                        outline: 'none'
                      }}
                    >
                      <option value="">Par défaut (défini dans .env)</option>
                      <option value="gemini-pro-latest">Gemini Pro Latest</option>
                      <option value="gemini-3.5-flash">Gemini 3.5 Flash</option>
                      <option value="claude-sonnet-4-6">Claude Sonnet 4.6</option>
                      <option value="claude-opus-4-8">Claude Opus 4.8</option>
                    </select>
                  </div>
                  
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={generateImage}
                      onChange={(e) => setGenerateImage(e.target.checked)}
                      style={{ cursor: 'pointer' }}
                    />
                    Générer les illustrations
                  </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    onClick={() => runPipeline('decoupe')}
                    disabled={!!runningPhase || !selectedSlug}
                    style={{
                      padding: '10px',
                      background: runningPhase === 'decoupe' ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    1. Découpage
                  </button>

                  <button
                    onClick={() => runPipeline('ecris')}
                    disabled={!!runningPhase || !selectedSlug}
                    style={{
                      padding: '10px',
                      background: runningPhase === 'ecris' ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    2. Rédaction
                  </button>

                  <button
                    onClick={() => runPipeline('genere')}
                    disabled={!!runningPhase || !selectedSlug}
                    style={{
                      padding: '10px',
                      background: runningPhase === 'genere' ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    3. Images Gen
                  </button>

                  <button
                    onClick={() => runPipeline('all')}
                    disabled={!!runningPhase || !selectedSlug}
                    style={{
                      padding: '10px',
                      background: runningPhase === 'all' ? 'var(--accent-blue)' : 'rgba(59, 130, 246, 0.08)',
                      color: runningPhase === 'all' ? 'white' : 'var(--text-primary)',
                      border: '1px solid var(--accent-blue)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    Tout exécuter
                  </button>
                </div>
                
                <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    onClick={() => runPipeline('intro')}
                    disabled={!!runningPhase || !selectedSlug}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: runningPhase === 'intro' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.08)',
                      color: 'var(--text-primary)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'background 0.2s'
                    }}
                  >
                    ✨ Générer / Corriger l'Intro
                  </button>
                  
                  <button
                    onClick={() => runPipeline('objectif-l1')}
                    disabled={!!runningPhase || !selectedSlug}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: runningPhase === 'objectif-l1' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)',
                      color: 'var(--text-primary)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'background 0.2s'
                    }}
                  >
                    🎯 Objectif L1 du Chapitre
                  </button>
                </div>
              </section>
            </>
          )}

          {activeTabSidebar === 'console' && (
            <section style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', minHeight: '300px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Sortie console :
                </h3>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={logAutoScroll}
                      onChange={(e) => setLogAutoScroll(e.target.checked)}
                    />
                    Scroll
                  </label>
                  <button
                    onClick={() => setLogs('')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      fontSize: '10px',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    Effacer
                  </button>
                </div>
              </div>

              <pre
                ref={logConsoleRef}
                style={{
                  flex: 1,
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  padding: '12px',
                  borderRadius: '6px',
                  color: 'var(--text-primary)',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  lineHeight: '1.4',
                  overflowY: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all'
                }}
              >
                {logs || 'En attente de lancement...'}
              </pre>
            </section>
          )}

          {activeTabSidebar === 'agent' && (
            <section style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', minHeight: '350px', overflow: 'hidden' }}>
              {/* Agent Status and Clear */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '10px', color: 'var(--badge-green-text)', background: 'var(--badge-green-bg)', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                    {agentConfig?.model || 'Gemini 3.5 Flash'}
                  </span>
                </div>
                <button
                  onClick={() => setChatMessages([
                    { role: 'assistant', content: 'Discussion réinitialisée. Comment puis-je vous aider sur le workspace ?' }
                  ])}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '10px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Réinitialiser
                </button>
              </div>

              {/* Message List */}
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '4px', marginBottom: '8px' }}>
                {chatMessages.map((msg, i) => {
                  if (msg.role === 'tool') {
                    const parts = msg.parts || [];
                    return (
                      <div key={i} style={{ fontSize: '10px', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', borderLeft: '2px solid var(--accent-cyan)', padding: '4px 8px', borderRadius: '0 4px 4px 0' }}>
                        🛠️ {parts.map((p: any, pIdx) => {
                          const name = p.functionResponse?.name || '';
                          const response = p.functionResponse?.response;
                          let desc = '';
                          if (name === 'list_directory') desc = `Lister le répertoire (trouvé ${response?.items?.length || 0} éléments)`;
                          else if (name === 'read_file') desc = `Lire le fichier (taille ${response?.content?.length || 0} caract.)`;
                          else if (name === 'write_file') desc = `Écrire le fichier`;
                          else if (name === 'run_pipeline') desc = `Exécuter le pipeline (${response?.status === 0 ? 'succès' : 'erreur'})`;
                          else if (name === 'regenerate_slide') desc = `Régénérer la slide (${response?.status === 0 ? 'succès' : 'erreur'})`;
                          else if (name === 'search_in_files') desc = `Rechercher dans les fichiers (trouvé ${response?.results?.length || 0} fichiers)`;
                          else desc = name;
                          return <div key={`${name}-${pIdx}`}>Exécution de <strong>{name}</strong>: {desc}</div>;
                        })}
                      </div>
                    );
                  }
                  
                  const isUser = msg.role === 'user';
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isUser ? 'flex-end' : 'flex-start',
                        maxWidth: '85%',
                        alignSelf: isUser ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <span style={{ fontSize: '9px', color: 'var(--text-muted)', marginBottom: '2px', padding: '0 4px' }}>
                        {isUser ? 'Vous' : 'Agent IA'}
                      </span>
                      <div
                        style={{
                          background: isUser ? 'var(--accent-blue)' : 'var(--bg-tertiary)',
                          color: isUser ? '#ffffff' : 'var(--text-primary)',
                          border: isUser ? 'none' : '1px solid var(--border-color)',
                          borderRadius: isUser ? '12px 12px 0 12px' : '12px 12px 12px 0',
                          padding: '8px 12px',
                          fontSize: '12px',
                          lineHeight: '1.4',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        {msg.content}
                      </div>
                    </div>
                  );
                })}
                {isChatLoading && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', padding: '4px' }}>
                    <span className="spinner"></span>
                    <span>L'agent réfléchit...</span>
                  </div>
                )}
              </div>

              {/* Chat Input form */}
              <form onSubmit={(e) => handleSendChatMessage(e)} style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="text"
                  placeholder={selectedSlug ? `Message pour la leçon ${selectedSlug.toUpperCase()}...` : "Poser une question à l'agent..."}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  disabled={isChatLoading}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    fontSize: '12px',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  style={{
                    background: 'var(--accent-blue)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    opacity: (isChatLoading || !chatInput.trim()) ? 0.6 : 1
                  }}
                >
                  Envoyer
                </button>
              </form>
            </section>
          )}
        </div>
      </aside>

      {/* Footer status bar */}
      <footer className="status-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>● Système Prêt</span>
          <span>• {lessons.length} leçons</span>
          {selectedSlug && (
            <span>• Active : <strong style={{ fontFamily: 'monospace' }}>{selectedSlug.toUpperCase()}</strong></span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {selectedSlug && lessonData?.final?.slides && (
            <span>{lessonData.final.slides.length} slides</span>
          )}
          <span>Modèle Actif : {selectedModel || 'Config .env'}</span>
        </div>
      </footer>

      {/* Bottom mobile navigation bar */}
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
"""

if start_idx != -1 and end_idx != -1:
    # Perform insertion by indices range!
    code = code[:start_idx] + replacement_right + code[end_idx:]
    print("5. Applied right sidebar, footer and mobile nav replacement successfully using indices.")
else:
    print("5. ERROR: Could not locate right sidebar indices!")

# Save rebuilt code
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Rebuilt studio/src/App.tsx successfully.")
