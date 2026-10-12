import React from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import ProtectedRoute from './components/ProtectedRoute';

import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import ExplorePage from './pages/ExplorePage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const ThemeIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9zm0-16c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7z" />
    <path d="M12 7v10c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-4.56A8 8 0 0 1 18.93 8ZM12 4.15a13.62 13.62 0 0 1 1.83 3.85h-3.66A13.62 13.62 0 0 1 12 4.15ZM4.26 14a7.9 7.9 0 0 1 0-4h3.38a16.5 16.5 0 0 0 0 4Zm.81 2h2.95a15.65 15.65 0 0 0 1.38 4.56A8 8 0 0 1 5.07 16ZM10 20h4a16.5 16.5 0 0 0 0-4h-4Zm-1.83-3.85h3.66A13.62 13.62 0 0 1 12 19.85ZM16.36 14h-8a15 15 0 0 1 0-4h8Zm1 2h2.95a8 8 0 0 1-4.32 4.56A15.65 15.65 0 0 0 17.38 16Zm2.36-2a7.9 7.9 0 0 1 0-4h-3.38a16.5 16.5 0 0 0 0 4Z"/>
  </svg>
);

const Navbar = () => {
  const { toggleTheme } = useTheme();
  const { user } = useAuth();
  const { lang, changeLanguage, t } = useLanguage();

  const handleLangChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <div className="navbar-wrapper">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="nav-logo">HexletLife</Link>

          <div className="nav-links">
            <NavLink to="/events">{t('nav.events')}</NavLink>
            <NavLink to="/explore">{t('nav.weather')}</NavLink>
            {user && <NavLink to="/dashboard">{t('nav.dashboard')}</NavLink>}
          </div>

          <div className="nav-controls">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', padding: '4px 12px', borderRadius: '20px', border: '1px solid var(--border-light)' }}>
              <GlobeIcon style={{ width: '16px', height: '16px', fill: 'var(--text-secondary)' }} />
              <select value={lang} onChange={handleLangChange} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}>
                <option value="ru">RU</option>
                <option value="en">ENG</option>
                <option value="kz">KZ</option>
              </select>
            </div>

            <button onClick={toggleTheme} className="theme-btn" aria-label="Toggle Theme">
              <ThemeIcon />
            </button>

            {user ? (
              <Link to="/dashboard">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=40`}
                  alt={user.name}
                  className="avatar"
                />
              </Link>
            ) : (
              <Link to="/login" className="btn btn-primary">{t('nav.login')}</Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

const Layout = () => (
  <>
    <Navbar />
    <main style={{ padding: '64px 0', minHeight: 'calc(100vh - 72px)' }}>
      <Outlet />
    </main>
  </>
);

const Home = () => {
  const { t } = useLanguage();
  return (
    <div className="container">
      <div style={{ textAlign: 'center', maxWidth: '900px', margin: '40px auto 80px' }}>
        <h1 className="h1" style={{ fontSize: '4.5rem' }}>{t('home.title')}</h1>
        <p className="text-body" style={{ fontSize: '1.35rem', marginBottom: '48px' }}>{t('home.subtitle')}</p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link to="/events" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>{t('home.viewEvents')}</Link>
          <Link to="/register" className="btn" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>{t('home.createAccount')}</Link>
        </div>
      </div>

      <div className="bento-grid" style={{ marginBottom: '80px' }}>
        <div className="bento-item col-span-4" style={{ textAlign: 'center', background: 'linear-gradient(135deg, var(--brand-color), var(--accent-purple))', color: 'white', border: 'none' }}>
          <h3 style={{ fontSize: '3rem', fontWeight: 800, margin: '16px 0' }}>150+</h3>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, fontWeight: 600 }}>{t('home.stats_events')}</p>
        </div>
        <div className="bento-item col-span-4" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '3rem', fontWeight: 800, margin: '16px 0', color: 'var(--brand-color)' }}>5000+</h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{t('home.stats_users')}</p>
        </div>
        <div className="bento-item col-span-4" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '3rem', fontWeight: 800, margin: '16px 0', color: 'var(--accent-purple)' }}>20+</h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{t('home.stats_partners')}</p>
        </div>
      </div>

      <h2 className="h2 mb-8" style={{ textAlign: 'center' }}>Возможности платформы</h2>
      <div className="bento-grid">
        <div className="bento-item col-span-4">
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', fill: 'var(--brand-color)' }}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h3 className="h3 mb-4">{t('home.feature_1')}</h3>
          <p className="text-body">{t('home.feature_1_desc')}</p>
        </div>
        <div className="bento-item col-span-4">
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(147, 51, 234, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', fill: 'var(--accent-purple)' }}>
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
            </svg>
          </div>
          <h3 className="h3 mb-4">{t('home.feature_2')}</h3>
          <p className="text-body">{t('home.feature_2_desc')}</p>
        </div>
        <div className="bento-item col-span-4">
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', fill: 'var(--success-color)' }}>
              <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
            </svg>
          </div>
          <h3 className="h3 mb-4">{t('home.feature_3')}</h3>
          <p className="text-body">{t('home.feature_3_desc')}</p>
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <LanguageProvider>
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="events/:id" element={<EventDetailsPage />} />
                <Route path="explore" element={<ExplorePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="dashboard" element={ <ProtectedRoute><DashboardPage /></ProtectedRoute> } />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  </LanguageProvider>
);

export default App;
