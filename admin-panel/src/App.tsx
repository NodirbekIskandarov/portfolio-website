import { useState, useEffect } from 'react';
import * as api from './services/api';
import type { Profile, Skill, Project, Experience, BlogPost, Contact } from './types';

type Tab = 'overview' | 'profile' | 'skills' | 'projects' | 'experience' | 'blog' | 'contacts';
type Toast = { id: number; type: 'success' | 'error'; msg: string };
type LangTab = 'en' | 'ru' | 'uz';

let _tid = 0;

const I = 'w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/70 transition-colors';
const P = 'px-5 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed';
const S = 'px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-xl transition-colors';

function LangTabs({ active, onChange }: { active: LangTab; onChange: (l: LangTab) => void }) {
  return (
    <div className="flex gap-1 mb-4 p-0.5 rounded-lg bg-slate-900 border border-slate-700 w-fit">
      {(['en', 'ru', 'uz'] as LangTab[]).map(l => (
        <button key={l} onClick={() => onChange(l)}
          className={`px-3 py-1 rounded-md text-xs font-semibold uppercase transition-all ${
            active === l ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          }`}>{l}</button>
      ))}
    </div>
  );
}

function ToastList({ toasts, rm }: { toasts: Toast[]; rm: (id: number) => void }) {
  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 w-72 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} onClick={() => rm(t.id)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium cursor-pointer border shadow-2xl pointer-events-auto ${
            t.type === 'success'
              ? 'bg-emerald-950 border-emerald-700/50 text-emerald-300'
              : 'bg-red-950 border-red-700/50 text-red-300'
          }`}>
          {t.type === 'success'
            ? <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
            : <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01"/></svg>
          }
          {t.msg}
        </div>
      ))}
    </div>
  );
}

function ConfirmDlg({ msg, onOk, onCancel }: { msg: string; onOk: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9998] p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-start gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-slate-200 text-sm font-medium">Confirm deletion</p>
            <p className="text-slate-400 text-xs mt-1">{msg}</p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className={S}>Cancel</button>
          <button onClick={onOk} className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken'));
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirm, setConfirm] = useState<{ msg: string; cb: () => void } | null>(null);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [modal, setModal] = useState<{ type: string; data: Record<string, any> } | null>(null);
  const [langTab, setLangTab] = useState<LangTab>('en');

  const toast = (type: 'success' | 'error', msg: string) => {
    const id = ++_tid;
    setToasts(p => [...p, { id, type, msg }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  };
  const rmToast = (id: number) => setToasts(p => p.filter(t => t.id !== id));
  const askConfirm = (msg: string, cb: () => void) => setConfirm({ msg, cb });
  const openModal = (type: string, data: Record<string, any>) => { setModal({ type, data }); setLangTab('en'); };
  const patchModal = (patch: Record<string, any>) => setModal(m => m ? { ...m, data: { ...m.data, ...patch } } : null);

  const loadData = async () => {
    try {
      const [pr, sk, pj, ex, bl] = await Promise.all([
        api.getProfile(), api.getSkills(), api.getProjects(), api.getExperience(), api.getBlogPosts(),
      ]);
      setProfile(pr.data);
      setSkills(sk.data);
      setProjects(pj.data);
      setExperiences(ex.data);
      setBlogPosts(bl.data);
    } catch {}
  };

  useEffect(() => { if (isLoggedIn) loadData(); }, [isLoggedIn]);
  useEffect(() => {
    if (activeTab === 'contacts' && isLoggedIn) {
      api.getContacts()
        .then(r => setContacts(Array.isArray(r.data) ? r.data : []))
        .catch(() => setContacts([]));
    }
  }, [activeTab, isLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const r = await api.login(loginForm.username, loginForm.password);
      localStorage.setItem('adminToken', r.data.token);
      setIsLoggedIn(true);
    } catch (err: any) {
      setLoginError(err.response?.data?.error || 'Login failed');
    }
    setLoginLoading(false);
  };

  const handleLogout = () => { localStorage.removeItem('adminToken'); setIsLoggedIn(false); };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    try { await api.updateProfile(profile); toast('success', 'Profile updated'); }
    catch { toast('error', 'Failed to update profile'); }
    setSaving(false);
  };

  const saveSkill = async (data: Record<string, any>) => {
    setSaving(true);
    try {
      if (data.id) { await api.updateSkill(data.id, data); setSkills(skills.map(s => s.id === data.id ? { ...s, ...data } as Skill : s)); }
      else { const r = await api.createSkill(data); setSkills([...skills, r.data]); }
      toast('success', data.id ? 'Skill updated' : 'Skill added'); setModal(null);
    } catch { toast('error', 'Failed to save'); }
    setSaving(false);
  };

  const saveProject = async (data: Record<string, any>) => {
    setSaving(true);
    try {
      if (data.id) { await api.updateProject(data.id, data); setProjects(projects.map(p => p.id === data.id ? { ...p, ...data } as Project : p)); }
      else { const r = await api.createProject(data); setProjects([...projects, r.data]); }
      toast('success', data.id ? 'Project updated' : 'Project added'); setModal(null);
    } catch { toast('error', 'Failed to save'); }
    setSaving(false);
  };

  const saveExperience = async (data: Record<string, any>) => {
    setSaving(true);
    try {
      if (data.id) { await api.updateExperience(data.id, data); setExperiences(experiences.map(e => e.id === data.id ? { ...e, ...data } as Experience : e)); }
      else { const r = await api.createExperience(data); setExperiences([...experiences, r.data]); }
      toast('success', data.id ? 'Experience updated' : 'Experience added'); setModal(null);
    } catch { toast('error', 'Failed to save'); }
    setSaving(false);
  };

  const saveBlog = async (data: Record<string, any>) => {
    setSaving(true);
    try {
      if (data.id) { await api.updateBlogPost(data.id, data); setBlogPosts(blogPosts.map(b => b.id === data.id ? { ...b, ...data } as BlogPost : b)); }
      else { const r = await api.createBlogPost(data); setBlogPosts([...blogPosts, r.data]); }
      toast('success', data.id ? 'Post updated' : 'Post created'); setModal(null);
    } catch { toast('error', 'Failed to save'); }
    setSaving(false);
  };

  const delSkill = (id: string) => askConfirm('Delete this skill? This cannot be undone.', async () => {
    setConfirm(null);
    try { await api.deleteSkill(id); setSkills(skills.filter(s => s.id !== id)); toast('success', 'Skill deleted'); }
    catch { toast('error', 'Failed to delete'); }
  });

  const delProject = (id: string) => askConfirm('Delete this project?', async () => {
    setConfirm(null);
    try { await api.deleteProject(id); setProjects(projects.filter(p => p.id !== id)); toast('success', 'Project deleted'); }
    catch { toast('error', 'Failed to delete'); }
  });

  const delExperience = (id: string) => askConfirm('Delete this experience entry?', async () => {
    setConfirm(null);
    try { await api.deleteExperience(id); setExperiences(experiences.filter(e => e.id !== id)); toast('success', 'Deleted'); }
    catch { toast('error', 'Failed to delete'); }
  });

  const delBlog = (id: string) => askConfirm('Delete this blog post?', async () => {
    setConfirm(null);
    try { await api.deleteBlogPost(id); setBlogPosts(blogPosts.filter(b => b.id !== id)); toast('success', 'Post deleted'); }
    catch { toast('error', 'Failed to delete'); }
  });

  const delContact = (id: string) => askConfirm('Delete this message?', async () => {
    setConfirm(null);
    try { await api.deleteContact(id); setContacts(contacts.filter(c => c.id !== id)); toast('success', 'Message deleted'); }
    catch { toast('error', 'Failed to delete'); }
  });

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-4"
              style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}>
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-slate-500 text-sm mt-1">Portfolio Management</p>
          </div>
          <div className="bg-slate-900 border border-slate-700/60 rounded-2xl p-7 shadow-2xl">
            {loginError && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm mb-5">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                {loginError}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Username</label>
                <input type="text" className={I} placeholder="admin" value={loginForm.username}
                  onChange={e => setLoginForm({ ...loginForm, username: e.target.value })} required autoFocus />
              </div>
              <div>
                <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Password</label>
                <input type="password" className={I} placeholder="••••••••" value={loginForm.password}
                  onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} required />
              </div>
              <button type="submit" disabled={loginLoading} className={`${P} w-full mt-1`}>
                {loginLoading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
        <ToastList toasts={toasts} rm={rmToast} />
      </div>
    );
  }

  // ── NAV ───────────────────────────────────────────────────────────────────
  const navItems: { tab: Tab; label: string; count?: number; icon: React.ReactNode }[] = [
    { tab: 'overview', label: 'Overview', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg> },
    { tab: 'profile', label: 'Profile', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg> },
    { tab: 'skills', label: 'Skills', count: skills.length, icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" /></svg> },
    { tab: 'projects', label: 'Projects', count: projects.length, icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" /></svg> },
    { tab: 'experience', label: 'Experience', count: experiences.length, icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg> },
    { tab: 'blog', label: 'Blog', count: blogPosts.length, icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" /></svg> },
    { tab: 'contacts', label: 'Messages', count: contacts.filter(c => !c.read).length || contacts.length, icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg> },
  ];

  const catColor = (cat: string) =>
    cat === 'Frontend' ? 'bg-blue-500/15 text-blue-400' :
    cat === 'Backend'  ? 'bg-emerald-500/15 text-emerald-400' :
    cat === 'Database' ? 'bg-orange-500/15 text-orange-400' :
    'bg-violet-500/15 text-violet-400';

  const modalLabel = modal ? (
    modal.type === 'skills' ? 'Skill' :
    modal.type === 'projects' ? 'Project' :
    modal.type === 'experience' ? 'Experience' : 'Blog Post'
  ) : '';

  // ── MAIN LAYOUT ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-950 flex">

      {/* ── SIDEBAR ─────────────────────────────────────────────────────────── */}
      <aside className="fixed inset-y-0 left-0 w-56 bg-slate-900 border-r border-slate-800 flex flex-col z-30">
        <div className="flex items-center gap-3 px-5 h-16 border-b border-slate-800 shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}>
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-none">Portfolio</p>
            <p className="text-slate-500 text-xs mt-0.5">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.tab} onClick={() => setActiveTab(item.tab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                activeTab === item.tab
                  ? 'bg-blue-600/20 text-blue-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}>
              <span className={activeTab === item.tab ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}>
                {item.icon}
              </span>
              <span className="flex-1 text-left">{item.label}</span>
              {!!item.count && (
                <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${
                  activeTab === item.tab ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-800 text-slate-500'
                }`}>{item.count}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-slate-800 shrink-0">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* ── CONTENT ─────────────────────────────────────────────────────────── */}
      <main className="flex-1 ml-56 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-8">

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {[
                  { label: 'Skills', count: skills.length, grad: 'from-blue-600 to-blue-800' },
                  { label: 'Projects', count: projects.length, grad: 'from-violet-600 to-violet-800' },
                  { label: 'Experience', count: experiences.length, grad: 'from-emerald-600 to-emerald-800' },
                  { label: 'Blog Posts', count: blogPosts.length, grad: 'from-orange-500 to-orange-700' },
                  { label: 'Messages', count: contacts.length, grad: 'from-pink-600 to-pink-800' },
                ].map(({ label, count, grad }) => (
                  <div key={label} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center mb-3 shrink-0`}>
                      <span className="text-white font-bold text-sm">{count}</span>
                    </div>
                    <p className="text-white text-2xl font-bold">{count}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                  <h3 className="text-slate-200 font-semibold text-sm mb-4">Featured Projects</h3>
                  <div className="space-y-2.5">
                    {projects.filter(p => p.featured).slice(0, 5).map(p => (
                      <div key={p.id} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span className="text-slate-300 text-sm truncate">{p.title}</span>
                      </div>
                    ))}
                    {projects.filter(p => p.featured).length === 0 && <p className="text-slate-600 text-sm">No featured projects</p>}
                  </div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                  <h3 className="text-slate-200 font-semibold text-sm mb-4">Skills by Category</h3>
                  <div className="space-y-2.5">
                    {Array.from(new Set(skills.map(s => s.category))).map(cat => (
                      <div key={cat} className="flex items-center justify-between">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${catColor(cat)}`}>{cat}</span>
                        <span className="text-slate-500 text-sm">{skills.filter(s => s.category === cat).length}</span>
                      </div>
                    ))}
                    {skills.length === 0 && <p className="text-slate-600 text-sm">No skills added</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROFILE */}
          {activeTab === 'profile' && profile && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Profile</h2>
              <form onSubmit={handleUpdateProfile} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Full Name</label>
                    <input className={I} value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
                  </div>
                </div>

                {/* Title & Bio with language tabs */}
                <div className="border border-slate-700/60 rounded-xl p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Translatable Content</p>
                    <LangTabs active={langTab} onChange={setLangTab} />
                  </div>
                  {langTab === 'en' && (<>
                    <div>
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Title (EN)</label>
                      <input className={I} value={profile.title} onChange={e => setProfile({ ...profile, title: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Bio (EN)</label>
                      <textarea className={`${I} resize-none`} rows={4} value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} />
                    </div>
                  </>)}
                  {langTab === 'ru' && (<>
                    <div>
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Title (RU)</label>
                      <input className={I} value={profile.titleRu || ''} onChange={e => setProfile({ ...profile, titleRu: e.target.value })} placeholder="Русский заголовок..." />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Bio (RU)</label>
                      <textarea className={`${I} resize-none`} rows={4} value={profile.bioRu || ''} onChange={e => setProfile({ ...profile, bioRu: e.target.value })} placeholder="Биография на русском..." />
                    </div>
                  </>)}
                  {langTab === 'uz' && (<>
                    <div>
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Title (UZ)</label>
                      <input className={I} value={profile.titleUz || ''} onChange={e => setProfile({ ...profile, titleUz: e.target.value })} placeholder="O'zbekcha sarlavha..." />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Bio (UZ)</label>
                      <textarea className={`${I} resize-none`} rows={4} value={profile.bioUz || ''} onChange={e => setProfile({ ...profile, bioUz: e.target.value })} placeholder="O'zbekcha biografiya..." />
                    </div>
                  </>)}
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Email</label>
                    <input className={I} type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Phone</label>
                    <input className={I} value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Location</label>
                    <input className={I} value={profile.location} onChange={e => setProfile({ ...profile, location: e.target.value })} />
                  </div>
                </div>
                <div className="h-px bg-slate-700/60" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">GitHub URL</label>
                    <input className={I} value={profile.github} onChange={e => setProfile({ ...profile, github: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">LinkedIn URL</label>
                    <input className={I} value={profile.linkedin} onChange={e => setProfile({ ...profile, linkedin: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Twitter URL</label>
                    <input className={I} value={profile.twitter} onChange={e => setProfile({ ...profile, twitter: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Website URL</label>
                    <input className={I} value={profile.website} onChange={e => setProfile({ ...profile, website: e.target.value })} />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button type="submit" disabled={saving} className={P}>{saving ? 'Saving…' : 'Save Profile'}</button>
                </div>
              </form>
            </div>
          )}

          {/* SKILLS */}
          {activeTab === 'skills' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Skills</h2>
                <button onClick={() => openModal('skills', { name: '', category: 'Frontend', level: 80, icon: '', order: skills.length + 1 })} className={P}>
                  + Add Skill
                </button>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/60">
                      <th className="text-left text-slate-500 text-xs uppercase tracking-wider px-5 py-3 font-medium">Name</th>
                      <th className="text-left text-slate-500 text-xs uppercase tracking-wider px-5 py-3 font-medium">Category</th>
                      <th className="text-left text-slate-500 text-xs uppercase tracking-wider px-5 py-3 font-medium w-52">Level</th>
                      <th className="text-right text-slate-500 text-xs uppercase tracking-wider px-5 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skills.map((skill, i) => (
                      <tr key={skill.id} className={`border-b border-slate-700/30 ${i % 2 !== 0 ? 'bg-slate-800/20' : ''}`}>
                        <td className="px-5 py-3.5 text-slate-200 text-sm font-medium">{skill.name}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${catColor(skill.category)}`}>{skill.category}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all" style={{ width: `${skill.level}%`, background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
                            </div>
                            <span className="text-slate-500 text-xs w-8 text-right tabular-nums">{skill.level}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-right space-x-1">
                          <button onClick={() => openModal('skills', { ...skill })} className="text-blue-400 hover:text-blue-300 text-xs px-2.5 py-1.5 rounded-lg hover:bg-blue-500/10 transition-all">Edit</button>
                          <button onClick={() => delSkill(skill.id!)} className="text-red-400 hover:text-red-300 text-xs px-2.5 py-1.5 rounded-lg hover:bg-red-500/10 transition-all">Delete</button>
                        </td>
                      </tr>
                    ))}
                    {skills.length === 0 && (
                      <tr><td colSpan={4} className="px-5 py-14 text-center text-slate-600 text-sm">No skills yet. Add your first skill.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PROJECTS */}
          {activeTab === 'projects' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Projects</h2>
                <button onClick={() => openModal('projects', { title: '', description: '', image: '', technologies: [], githubUrl: '', liveUrl: '', featured: false, order: projects.length + 1 })} className={P}>
                  + Add Project
                </button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map(project => (
                  <div key={project.id} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-slate-100 font-semibold text-sm leading-snug">{project.title}</h3>
                      {project.featured && <span className="text-xs px-2 py-0.5 bg-amber-500/15 text-amber-400 rounded-full shrink-0 border border-amber-500/20">★ Featured</span>}
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed flex-1 mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 4).map(t => (
                        <span key={t} className="text-xs px-2 py-0.5 bg-slate-700/70 text-slate-300 rounded-full">{t}</span>
                      ))}
                      {project.technologies.length > 4 && <span className="text-xs px-2 py-0.5 bg-slate-700/40 text-slate-500 rounded-full">+{project.technologies.length - 4}</span>}
                    </div>
                    <div className="flex gap-2 pt-3 border-t border-slate-700/50">
                      <button onClick={() => openModal('projects', { ...project })} className="flex-1 text-xs py-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all">Edit</button>
                      <button onClick={() => delProject(project.id!)} className="flex-1 text-xs py-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all">Delete</button>
                    </div>
                  </div>
                ))}
                {projects.length === 0 && <p className="col-span-3 py-14 text-center text-slate-600 text-sm">No projects yet.</p>}
              </div>
            </div>
          )}

          {/* EXPERIENCE */}
          {activeTab === 'experience' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Experience</h2>
                <button onClick={() => openModal('experience', { company: '', position: '', description: '', location: '', startDate: '', endDate: '', current: false, order: experiences.length + 1 })} className={P}>
                  + Add Experience
                </button>
              </div>
              <div className="space-y-3">
                {experiences.map(exp => (
                  <div key={exp.id} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-slate-100 font-semibold text-sm">{exp.position}</h3>
                          {exp.current && <span className="text-xs px-2 py-0.5 bg-emerald-500/15 text-emerald-400 rounded-full border border-emerald-500/20">Current</span>}
                        </div>
                        <p className="text-slate-300 text-sm">{exp.company}</p>
                        <p className="text-slate-500 text-xs mt-1">{exp.location} · {exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <button onClick={() => openModal('experience', { ...exp })} className="text-blue-400 hover:text-blue-300 text-xs px-3 py-1.5 rounded-lg hover:bg-blue-500/10 transition-all">Edit</button>
                        <button onClick={() => delExperience(exp.id!)} className="text-red-400 hover:text-red-300 text-xs px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-all">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
                {experiences.length === 0 && <p className="py-14 text-center text-slate-600 text-sm">No experience entries yet.</p>}
              </div>
            </div>
          )}

          {/* BLOG */}
          {activeTab === 'blog' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Blog</h2>
                <button onClick={() => openModal('blog', { title: '', slug: '', content: '', excerpt: '', image: '', tags: [], published: false, views: 0 })} className={P}>
                  + New Post
                </button>
              </div>
              <div className="space-y-3">
                {blogPosts.map(post => (
                  <div key={post.id} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-slate-100 font-semibold text-sm">{post.title}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${post.published ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' : 'bg-slate-700 text-slate-500 border-slate-600'}`}>
                            {post.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs mb-2 line-clamp-1">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.map(tag => <span key={tag} className="text-xs px-2 py-0.5 bg-slate-700/70 text-slate-300 rounded-full">{tag}</span>)}
                        </div>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <button onClick={() => openModal('blog', { ...post })} className="text-blue-400 hover:text-blue-300 text-xs px-3 py-1.5 rounded-lg hover:bg-blue-500/10 transition-all">Edit</button>
                        <button onClick={() => delBlog(post.id!)} className="text-red-400 hover:text-red-300 text-xs px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-all">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
                {blogPosts.length === 0 && <p className="py-14 text-center text-slate-600 text-sm">No blog posts yet.</p>}
              </div>
            </div>
          )}

          {/* CONTACTS */}
          {activeTab === 'contacts' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Messages</h2>
                  {contacts.length > 0 && (
                    <p className="text-slate-500 text-xs mt-1">
                      {contacts.filter(c => !c.read).length > 0
                        ? `${contacts.filter(c => !c.read).length} unread · ${contacts.length} total`
                        : `${contacts.length} messages · all read`}
                    </p>
                  )}
                </div>
                {contacts.some(c => !c.read) && (
                  <button
                    onClick={async () => {
                      const unread = contacts.filter(c => !c.read);
                      await Promise.all(unread.map(c => api.markContactRead(c.id!).catch(() => {})));
                      setContacts(contacts.map(c => ({ ...c, read: true })));
                      toast('success', 'All messages marked as read');
                    }}
                    className="text-xs px-3 py-1.5 text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 rounded-lg transition-all"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {contacts.map(contact => (
                  <div
                    key={contact.id}
                    className={`rounded-2xl border transition-all ${
                      contact.read
                        ? 'bg-slate-800/30 border-slate-700/40'
                        : 'bg-slate-800/70 border-blue-500/30 shadow-sm shadow-blue-500/5'
                    }`}
                  >
                    {/* Header row — always visible */}
                    <div className="flex items-center gap-3 px-5 py-4">
                      {/* Unread dot */}
                      <div className={`w-2 h-2 rounded-full shrink-0 ${contact.read ? 'bg-slate-700' : 'bg-blue-500'}`} />

                      {/* Avatar */}
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
                           style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}>
                        {contact.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-sm font-semibold ${contact.read ? 'text-slate-300' : 'text-white'}`}>
                            {contact.name}
                          </span>
                          <span className="text-slate-500 text-xs">{contact.email}</span>
                          {!contact.read && (
                            <span className="text-xs px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">New</span>
                          )}
                        </div>
                        {contact.subject && (
                          <p className={`text-xs truncate mt-0.5 ${contact.read ? 'text-slate-500' : 'text-slate-300 font-medium'}`}>
                            {contact.subject}
                          </p>
                        )}
                      </div>

                      {contact.createdAt && (
                        <span className="text-slate-600 text-xs shrink-0 hidden sm:block">
                          {new Date(contact.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      )}

                      <div className="flex gap-1 shrink-0">
                        {!contact.read && (
                          <button
                            onClick={async () => {
                              await api.markContactRead(contact.id!).catch(() => {});
                              setContacts(contacts.map(c => c.id === contact.id ? { ...c, read: true } : c));
                            }}
                            title="Mark as read"
                            className="p-1.5 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        )}
                        <a
                          href={`mailto:${contact.email}?subject=Re: ${encodeURIComponent(contact.subject || 'Your message')}`}
                          title="Reply"
                          onClick={async () => {
                            if (!contact.read) {
                              await api.markContactRead(contact.id!).catch(() => {});
                              setContacts(contacts.map(c => c.id === contact.id ? { ...c, read: true } : c));
                            }
                          }}
                          className="p-1.5 text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                          </svg>
                        </a>
                        <button
                          onClick={() => delContact(contact.id!)}
                          title="Delete"
                          className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Message body */}
                    <div className="px-5 pb-4 pl-[3.75rem]">
                      <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">{contact.message}</p>
                      {contact.createdAt && (
                        <p className="text-slate-600 text-xs mt-2">
                          {new Date(contact.createdAt).toLocaleString('en-US', {
                            year: 'numeric', month: 'short', day: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </p>
                      )}
                      <a
                        href={`mailto:${contact.email}?subject=Re: ${encodeURIComponent(contact.subject || 'Your message')}`}
                        onClick={async () => {
                          if (!contact.read) {
                            await api.markContactRead(contact.id!).catch(() => {});
                            setContacts(contacts.map(c => c.id === contact.id ? { ...c, read: true } : c));
                          }
                        }}
                        className="inline-flex items-center gap-1.5 mt-3 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                        Reply to {contact.name}
                      </a>
                    </div>
                  </div>
                ))}

                {contacts.length === 0 && (
                  <div className="py-20 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-7 h-7 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">No messages yet</p>
                    <p className="text-slate-700 text-xs mt-1">Messages sent through the contact form will appear here</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ── MODAL ───────────────────────────────────────────────────────────── */}
      {modal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-center z-40 p-4 pt-16 overflow-y-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-xl shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
              <h3 className="text-white font-semibold text-sm">{modal.data.id ? 'Edit' : 'Add'} {modalLabel}</h3>
              <button onClick={() => setModal(null)} className="text-slate-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6">

              {/* ── Skill form ── */}
              {modal.type === 'skills' && (
                <form onSubmit={e => { e.preventDefault(); saveSkill(modal.data); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Name *</label>
                      <input className={I} value={modal.data.name} onChange={e => patchModal({ name: e.target.value })} required />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Category</label>
                      <select className={I} value={modal.data.category} onChange={e => patchModal({ category: e.target.value })}>
                        <option>Frontend</option><option>Backend</option><option>Database</option><option>Tools</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Icon slug</label>
                      <input className={I} placeholder="e.g. react" value={modal.data.icon} onChange={e => patchModal({ icon: e.target.value })} />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-2">Level: <span className="text-blue-400 font-semibold">{modal.data.level}%</span></label>
                      <input type="range" min="0" max="100" value={modal.data.level}
                        onChange={e => patchModal({ level: parseInt(e.target.value) })}
                        className="w-full h-1.5 rounded-full appearance-none bg-slate-700 accent-blue-500 cursor-pointer" />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Order</label>
                      <input type="number" className={I} value={modal.data.order} onChange={e => patchModal({ order: parseInt(e.target.value) })} />
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end pt-2">
                    <button type="button" onClick={() => setModal(null)} className={S}>Cancel</button>
                    <button type="submit" disabled={saving} className={P}>{saving ? 'Saving…' : 'Save'}</button>
                  </div>
                </form>
              )}

              {/* ── Project form ── */}
              {modal.type === 'projects' && (
                <form onSubmit={e => { e.preventDefault(); saveProject(modal.data); }} className="space-y-4">
                  <div className="border border-slate-700/60 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Translatable</p>
                      <LangTabs active={langTab} onChange={setLangTab} />
                    </div>
                    {langTab === 'en' && (<>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Title (EN) *</label>
                        <input className={I} value={modal.data.title} onChange={e => patchModal({ title: e.target.value })} required />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Description (EN) *</label>
                        <textarea className={`${I} resize-none`} rows={4} value={modal.data.description} onChange={e => patchModal({ description: e.target.value })} required />
                      </div>
                    </>)}
                    {langTab === 'ru' && (<>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Title (RU)</label>
                        <input className={I} value={modal.data.titleRu || ''} onChange={e => patchModal({ titleRu: e.target.value })} placeholder="Название на русском..." />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Description (RU)</label>
                        <textarea className={`${I} resize-none`} rows={4} value={modal.data.descriptionRu || ''} onChange={e => patchModal({ descriptionRu: e.target.value })} placeholder="Описание на русском..." />
                      </div>
                    </>)}
                    {langTab === 'uz' && (<>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Title (UZ)</label>
                        <input className={I} value={modal.data.titleUz || ''} onChange={e => patchModal({ titleUz: e.target.value })} placeholder="O'zbekcha sarlavha..." />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Description (UZ)</label>
                        <textarea className={`${I} resize-none`} rows={4} value={modal.data.descriptionUz || ''} onChange={e => patchModal({ descriptionUz: e.target.value })} placeholder="O'zbekcha tavsif..." />
                      </div>
                    </>)}
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Technologies <span className="normal-case text-slate-600">(comma separated)</span></label>
                    <input className={I} placeholder="React, TypeScript, Vite..."
                      value={Array.isArray(modal.data.technologies) ? modal.data.technologies.join(', ') : modal.data.technologies}
                      onChange={e => patchModal({ technologies: e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean) })} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">GitHub URL</label>
                      <input className={I} value={modal.data.githubUrl} onChange={e => patchModal({ githubUrl: e.target.value })} placeholder="https://..." />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Live URL</label>
                      <input className={I} value={modal.data.liveUrl} onChange={e => patchModal({ liveUrl: e.target.value })} placeholder="https://..." />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Image URL</label>
                      <input className={I} value={modal.data.image} onChange={e => patchModal({ image: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Order</label>
                      <input type="number" className={I} value={modal.data.order} onChange={e => patchModal({ order: parseInt(e.target.value) })} />
                    </div>
                  </div>
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input type="checkbox" checked={modal.data.featured} onChange={e => patchModal({ featured: e.target.checked })} className="w-4 h-4 rounded accent-blue-500" />
                    <span className="text-slate-300 text-sm">Featured project</span>
                  </label>
                  <div className="flex gap-3 justify-end pt-2">
                    <button type="button" onClick={() => setModal(null)} className={S}>Cancel</button>
                    <button type="submit" disabled={saving} className={P}>{saving ? 'Saving…' : 'Save'}</button>
                  </div>
                </form>
              )}

              {/* ── Experience form ── */}
              {modal.type === 'experience' && (
                <form onSubmit={e => { e.preventDefault(); saveExperience(modal.data); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Location</label>
                      <input className={I} value={modal.data.location} onChange={e => patchModal({ location: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Order</label>
                      <input type="number" className={I} value={modal.data.order} onChange={e => patchModal({ order: parseInt(e.target.value) })} />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Start Date *</label>
                      <input type="month" className={I} value={modal.data.startDate} onChange={e => patchModal({ startDate: e.target.value })} required />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">End Date</label>
                      <input type="month" className={I} value={modal.data.endDate || ''} disabled={modal.data.current} onChange={e => patchModal({ endDate: e.target.value })} />
                    </div>
                  </div>

                  <div className="border border-slate-700/60 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Translatable</p>
                      <LangTabs active={langTab} onChange={setLangTab} />
                    </div>
                    {langTab === 'en' && (<>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Position (EN) *</label>
                        <input className={I} value={modal.data.position} onChange={e => patchModal({ position: e.target.value })} required />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Company (EN) *</label>
                        <input className={I} value={modal.data.company} onChange={e => patchModal({ company: e.target.value })} required />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Description (EN) *</label>
                        <textarea className={`${I} resize-none`} rows={4} value={modal.data.description} onChange={e => patchModal({ description: e.target.value })} required />
                      </div>
                    </>)}
                    {langTab === 'ru' && (<>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Position (RU)</label>
                        <input className={I} value={modal.data.positionRu || ''} onChange={e => patchModal({ positionRu: e.target.value })} placeholder="Должность на русском..." />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Company (RU)</label>
                        <input className={I} value={modal.data.companyRu || ''} onChange={e => patchModal({ companyRu: e.target.value })} placeholder="Компания на русском..." />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Description (RU)</label>
                        <textarea className={`${I} resize-none`} rows={4} value={modal.data.descriptionRu || ''} onChange={e => patchModal({ descriptionRu: e.target.value })} placeholder="Описание на русском..." />
                      </div>
                    </>)}
                    {langTab === 'uz' && (<>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Position (UZ)</label>
                        <input className={I} value={modal.data.positionUz || ''} onChange={e => patchModal({ positionUz: e.target.value })} placeholder="O'zbekcha lavozim..." />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Company (UZ)</label>
                        <input className={I} value={modal.data.companyUz || ''} onChange={e => patchModal({ companyUz: e.target.value })} placeholder="O'zbekcha kompaniya..." />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Description (UZ)</label>
                        <textarea className={`${I} resize-none`} rows={4} value={modal.data.descriptionUz || ''} onChange={e => patchModal({ descriptionUz: e.target.value })} placeholder="O'zbekcha tavsif..." />
                      </div>
                    </>)}
                  </div>
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input type="checkbox" checked={modal.data.current}
                      onChange={e => patchModal({ current: e.target.checked, endDate: e.target.checked ? '' : modal.data.endDate })}
                      className="w-4 h-4 rounded accent-blue-500" />
                    <span className="text-slate-300 text-sm">Current position</span>
                  </label>
                  <div className="flex gap-3 justify-end pt-2">
                    <button type="button" onClick={() => setModal(null)} className={S}>Cancel</button>
                    <button type="submit" disabled={saving} className={P}>{saving ? 'Saving…' : 'Save'}</button>
                  </div>
                </form>
              )}

              {/* ── Blog form ── */}
              {modal.type === 'blog' && (
                <form onSubmit={e => { e.preventDefault(); saveBlog(modal.data); }} className="space-y-4">
                  <div>
                    <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Slug</label>
                    <input className={I} value={modal.data.slug} onChange={e => patchModal({ slug: e.target.value })} required />
                  </div>

                  <div className="border border-slate-700/60 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Translatable</p>
                      <LangTabs active={langTab} onChange={setLangTab} />
                    </div>
                    {langTab === 'en' && (<>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Title (EN) *</label>
                        <input className={I} value={modal.data.title}
                          onChange={e => patchModal({ title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })}
                          required />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Excerpt (EN) *</label>
                        <textarea className={`${I} resize-none`} rows={2} value={modal.data.excerpt} onChange={e => patchModal({ excerpt: e.target.value })} required />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Content (EN) *</label>
                        <textarea className={`${I} resize-none`} rows={6} value={modal.data.content} onChange={e => patchModal({ content: e.target.value })} required />
                      </div>
                    </>)}
                    {langTab === 'ru' && (<>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Title (RU)</label>
                        <input className={I} value={modal.data.titleRu || ''} onChange={e => patchModal({ titleRu: e.target.value })} placeholder="Заголовок на русском..." />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Excerpt (RU)</label>
                        <textarea className={`${I} resize-none`} rows={2} value={modal.data.excerptRu || ''} onChange={e => patchModal({ excerptRu: e.target.value })} placeholder="Краткое описание на русском..." />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Content (RU)</label>
                        <textarea className={`${I} resize-none`} rows={6} value={modal.data.contentRu || ''} onChange={e => patchModal({ contentRu: e.target.value })} placeholder="Содержание на русском..." />
                      </div>
                    </>)}
                    {langTab === 'uz' && (<>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Title (UZ)</label>
                        <input className={I} value={modal.data.titleUz || ''} onChange={e => patchModal({ titleUz: e.target.value })} placeholder="O'zbekcha sarlavha..." />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Excerpt (UZ)</label>
                        <textarea className={`${I} resize-none`} rows={2} value={modal.data.excerptUz || ''} onChange={e => patchModal({ excerptUz: e.target.value })} placeholder="O'zbekcha qisqa tavsif..." />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Content (UZ)</label>
                        <textarea className={`${I} resize-none`} rows={6} value={modal.data.contentUz || ''} onChange={e => patchModal({ contentUz: e.target.value })} placeholder="O'zbekcha kontent..." />
                      </div>
                    </>)}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Image URL</label>
                      <input className={I} value={modal.data.image} onChange={e => patchModal({ image: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1.5">Tags <span className="normal-case text-slate-600">(comma separated)</span></label>
                      <input className={I} value={Array.isArray(modal.data.tags) ? modal.data.tags.join(', ') : modal.data.tags}
                        onChange={e => patchModal({ tags: e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean) })} />
                    </div>
                  </div>
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input type="checkbox" checked={modal.data.published} onChange={e => patchModal({ published: e.target.checked })} className="w-4 h-4 rounded accent-blue-500" />
                    <span className="text-slate-300 text-sm">Published</span>
                  </label>
                  <div className="flex gap-3 justify-end pt-2">
                    <button type="button" onClick={() => setModal(null)} className={S}>Cancel</button>
                    <button type="submit" disabled={saving} className={P}>{saving ? 'Saving…' : 'Save'}</button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>
      )}

      <ToastList toasts={toasts} rm={rmToast} />
      {confirm && <ConfirmDlg msg={confirm.msg} onOk={confirm.cb} onCancel={() => setConfirm(null)} />}
    </div>
  );
}
