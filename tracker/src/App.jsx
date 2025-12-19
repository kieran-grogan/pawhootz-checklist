import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  Circle,
  Copy,
  ChevronDown,
  ChevronRight,
  Search,
  RotateCcw,
  Zap,
  Info,
  Check
} from 'lucide-react';
import guideBase from './assets/guide.md?raw';

const App = () => {
  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('pawhootz_progress');
    return saved ? JSON.parse(saved) : {};
  });
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [copySuccess, setCopySuccess] = useState(null);

  // Persist progress
  useEffect(() => {
    localStorage.setItem('pawhootz_progress', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const categoryConfig = useMemo(() => [
    { name: 'Overview', matches: [/How to Use/i, /Outcome Goals/i, /System Architecture/i, /Build Order/i, /Global Conventions/i] },
    { name: 'Setup', matches: [/Custom Fields/i, /Tags/i, /Pipelines/i, /Calendars/i, /Forms/i] },
    { name: 'Portals', matches: [/Client Portal/i, /Staff Portal/i] },
    { name: 'Workflows', matches: [/Workflows/i, /Templates/i, /ACTIVE STAY/i, /BOOKING/i, /TRAINING/i, /MEMBERSHIP/i, /STORE/i, /ADMIN/i] },
    { name: 'QA & Launch', matches: [/Products/i, /Integrations/i, /Roles/i, /QA Testing/i, /Launch/i] }
  ], []);

  const parsedGuide = useMemo(() => {
    const sections = [];
    const lines = guideBase.split('\n');
    let currentSection = null;

    lines.forEach((line) => {
      if (line.startsWith('## ')) {
        const title = line.replace('## ', '').trim();
        currentSection = { title, tasks: [], intro: [] };
        sections.push(currentSection);
      } else if (currentSection) {
        const isWorkflowSection = currentSection.title.toLowerCase().includes('workflow') ||
          currentSection.title.toLowerCase().includes('template') ||
          currentSection.title.match(/^[A-I]\)/);

        if (line.startsWith('### ') && isWorkflowSection) {
          const content = line.replace('### ', '').trim();
          currentSection.tasks.push({
            id: content.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            originalText: content,
            details: [],
            prompt: null,
            isWorkflow: true
          });
        }
        else if (line.match(/^[-*] \[[ xX]\]/)) {
          const content = line.replace(/^[-*] \[[ xX]\]/, '').trim();
          currentSection.tasks.push({
            id: content.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            originalText: content,
            details: [],
            prompt: null
          });
        }
        else if (currentSection.tasks.length > 0) {
          const currentTask = currentSection.tasks[currentSection.tasks.length - 1];
          if (line.trim().startsWith('```text') || (line.trim().startsWith('```') && currentTask.isPromptWaiting)) {
            currentTask.isPromptBlock = true;
            currentTask.prompt = '';
            currentTask.isPromptWaiting = false;
          } else if (line.includes('Prompt for Workflow AI')) {
            currentTask.isPromptWaiting = true;
          } else if (currentTask.isPromptBlock) {
            if (line.trim() === '```') {
              currentTask.isPromptBlock = false;
            } else {
              currentTask.prompt += line + '\n';
            }
          } else if (line.trim() !== '' && !line.startsWith('#')) {
            currentTask.details.push(line);
          }
        } else if (!line.startsWith('#')) {
          currentSection.intro.push(line);
        }
      }
    });

    const grouped = {};
    categoryConfig.forEach(cat => {
      grouped[cat.name] = sections.filter(s => cat.matches.some(m => m.test(s.title)));
    });
    return grouped;
  }, [guideBase, categoryConfig]);

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const toggleSection = (section) => {
    const allChecked = section.tasks.every(t => completedTasks[t.id]);
    const newState = { ...completedTasks };
    section.tasks.forEach(t => {
      newState[t.id] = !allChecked;
    });
    setCompletedTasks(newState);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text.trim());
    setCopySuccess(id);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress?')) {
      setCompletedTasks({});
    }
  };

  const allTasks = useMemo(() => Object.values(parsedGuide).flat().flatMap(s => s.tasks), [parsedGuide]);
  const totalCompleted = allTasks.filter(t => completedTasks[t.id]).length;
  const progressPercent = allTasks.length > 0 ? Math.round((totalCompleted / allTasks.length) * 100) : 0;

  const renderMarkdown = (text) => {
    if (!text) return null;
    let rendered = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    rendered = rendered.replace(/\*(.*?)\*/g, '<em>$1</em>');
    rendered = rendered.replace(/`(.*?)`/g, '<code>$1</code>');
    return <span dangerouslySetInnerHTML={{ __html: rendered }} />;
  };

  return (
    <div className="container">
      {/* Refined Header */}
      <div className="hero-card">
        <div className="hero-info">
          <h1>🚀 PawHootz GHL Build Tracker</h1>
          <div className="hero-meta">
            <p>Client: <span>PawHootz Pet Resort</span></p>
            <p>Purpose: <span>GHL Custom Build Strategy</span></p>
            <p>Document Date: <span>2024-12-19</span></p>
          </div>
        </div>

        <div className="hero-progress-section">
          <div className="progress-header">
            <span className="progress-label">Overall Progress</span>
            <button onClick={resetProgress} className="btn-reset">Reset Progress</button>
          </div>
          <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>
            {progressPercent}% Complete ({totalCompleted}/{allTasks.length} items)
          </p>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="tabs-row">
        {categoryConfig.map(cat => {
          const items = parsedGuide[cat.name] || [];
          const tasks = items.flatMap(s => s.tasks);
          const completed = tasks.filter(t => completedTasks[t.id]).length;
          return (
            <button
              key={cat.name}
              className={`tab-item ${activeTab === cat.name ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.name)}
            >
              {cat.name}
              <span className="tab-badge">{completed}/{tasks.length}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="content-area">
        {(parsedGuide[activeTab] || []).map((section) => {
          const allChecked = section.tasks.length > 0 && section.tasks.every(t => completedTasks[t.id]);
          return (
            <div key={section.title} className="section-group">
              <div className="section-header">
                <div className="section-header-left">
                  <div
                    className={`section-checkbox ${allChecked ? 'checked' : ''}`}
                    onClick={() => toggleSection(section)}
                  >
                    {allChecked ? <Check size={12} /> : null}
                  </div>
                  <h2>{section.title}</h2>
                </div>
                <span className="section-count">
                  {section.tasks.filter(t => completedTasks[t.id]).length} / {section.tasks.length}
                </span>
              </div>

              {section.intro.length > 0 && (
                <div className="intro-text" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', color: '#64748b' }}>
                  {section.intro.map((line, idx) => <p key={idx}>{renderMarkdown(line)}</p>)}
                </div>
              )}

              <div className="tasks-list">
                {section.tasks.map((task) => (
                  <div key={task.id} className={`task-card ${completedTasks[task.id] ? 'completed' : ''}`}>
                    <div
                      className={`task-checkbox ${completedTasks[task.id] ? 'checked' : ''}`}
                      onClick={() => toggleTask(task.id)}
                    >
                      {completedTasks[task.id] ? <Check size={14} /> : null}
                    </div>

                    <div className="task-content">
                      <div className="task-title">{task.originalText}</div>

                      {task.details.length > 0 && (
                        <div className="task-desc">
                          {renderMarkdown(task.details[0])}
                        </div>
                      )}

                      {!completedTasks[task.id] && (
                        <div className="task-details">
                          {task.details.slice(1).map((d, i) => <p key={i}>{renderMarkdown(d)}</p>)}

                          {task.prompt && (
                            <div className="prompt-container">
                              <div className="prompt-header">
                                <span>AI Builder Prompt</span>
                                <button
                                  onClick={() => copyToClipboard(task.prompt, task.id)}
                                  className="btn-copy"
                                >
                                  {copySuccess === task.id ? <Check size={12} /> : <Copy size={12} />}
                                  {copySuccess === task.id ? 'Copied' : 'Copy Prompt'}
                                </button>
                              </div>
                              <div className="prompt-content">{task.prompt}</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
