import { Search, BellDot, ChevronDown, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useI18n, languages } from '../../contexts/I18nContext';
import { useState } from 'react';
import XPBar, { CoinBadge, StreakFreezeBadge } from '../gamification/XPBar';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useI18n();
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <header className="h-16 flex items-center justify-between px-8 sticky top-0 z-20 transition-colors duration-300" style={{ background: 'var(--header-bg)', borderBottom: '1px solid var(--border)' }}>
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
          <input
            type="text"
            placeholder={t('search')}
            className="w-full pl-10 pr-4 py-2 rounded-xl text-sm border border-transparent focus:outline-none focus:border-[#DDD3CB] transition-all"
            style={{ background: 'var(--muted-bg)', color: 'var(--text-primary)' }}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <XPBar />
        <CoinBadge />
        <StreakFreezeBadge />
        {/* Language Switcher */}
        <div className="relative">
          <button onClick={() => setShowLangMenu(!showLangMenu)} 
            className="p-2 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--hover-bg)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <Globe className="w-4 h-4" /> {languages.find(l => l.code === lang)?.flag}
          </button>
          {showLangMenu && (
            <div className="absolute right-0 top-full mt-2 card p-2 shadow-lg z-50 animate-fadeIn min-w-[150px]">
              {languages.map(l => (
                <button key={l.code}
                  onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    lang === l.code ? 'bg-[#E00026] text-white' : ''
                  }`}
                  style={lang !== l.code ? { color: 'var(--text-primary)' } : {}}
                  onMouseEnter={e => { if(lang !== l.code) e.currentTarget.style.background = 'var(--hover-bg)'; }}
                  onMouseLeave={e => { if(lang !== l.code) e.currentTarget.style.background = ''; }}>
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Dark Mode Toggle */}
        <button onClick={toggleTheme}
          className="p-2 rounded-xl transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--hover-bg)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button className="relative p-2 rounded-xl transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--hover-bg)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <BellDot className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E00026] rounded-full animate-pulse" />
        </button>
        <div className="flex items-center gap-3 pl-4 border-l" style={{ borderColor: 'var(--border)' }}>
          <div className="w-8 h-8 bg-[#E00026] rounded-xl flex items-center justify-center text-white text-xs font-bold">GM</div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Gym Manager</p>
            <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>IronForge Main</p>
          </div>
          <ChevronDown className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
        </div>
      </div>
    </header>
  );
}
