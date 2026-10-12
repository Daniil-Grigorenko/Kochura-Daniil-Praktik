import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/favoritesSlice';
import { cancelRegistration } from '../store/registrationsSlice';
import { addEvent, deleteEvent } from '../store/eventsSlice';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const events = useSelector(s => s.events.items);
  const favorites = useSelector(s => s.favorites.items);
  const registrations = useSelector(s => s.registrations.items);

  const [form, setForm] = useState({
    title: '', date: '', location: '', category: 'Technologies', image: '', description: ''
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.location) {
      addToast('Error: Fill all fields', 'error');
      return;
    }
    dispatch(addEvent({
      id: Date.now(),
      ...form,
      image: form.image || `https://picsum.photos/seed/${Date.now()}/800/400`,
      status: 'Planned'
    }));
    setForm({ title: '', date: '', location: '', category: 'Technologies', image: '', description: '' });
    addToast('Success!', 'success');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete event?')) {
      dispatch(deleteEvent(id));
      addToast('Deleted', 'error');
    }
  };

  if (!user) return null;

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=150&bold=true`;

  const xp = registrations.length * 50;
  let level = 'Beginner';
  let nextXp = 100;
  let progress = Math.min((xp / 100) * 100, 100);
  
  if (xp >= 250) { level = 'Campus Legend'; nextXp = xp; progress = 100; }
  else if (xp >= 100) { level = 'Active Member'; nextXp = 250; progress = ((xp - 100) / 150) * 100; }

  return (
    <div className="container">
      <div className="dashboard-layout">
        <aside className="profile-sidebar">
          <img src={avatarUrl} alt={user.name} className="avatar" style={{ width: '120px', height: '120px', margin: '0 auto 16px', display: 'block' }} />
          <h2 className="h3" style={{ marginBottom: '4px' }}>{user.name}</h2>
          <p className="text-small mb-4">{user.email}</p>
          <span className={`badge ${user.role === 'organizer' ? 'badge-accent' : 'badge-primary'}`}>
            {user.role === 'organizer' ? t('dashboard.organizer') : t('dashboard.student')}
          </span>

          <div style={{ margin: '32px 0' }}>
            {user.role !== 'organizer' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="text-small" style={{ fontWeight: 600 }}>{level}</span>
                  <span className="text-small">{xp} / {nextXp} XP</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
              </>
            )}
          </div>

          <button onClick={() => { logout(); addToast('Logged out', 'info'); }} className="btn btn-danger btn-block">
            {t('nav.logout')}
          </button>
        </aside>

        <div className="bento-grid">
          {user.role === 'organizer' ? (
            <>
              <div className="bento-item col-span-12">
                <h3 className="h3 mb-4">{t('dashboard.createEvent')}</h3>
                <form onSubmit={handleCreate} style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
                  <div className="form-group col-span-2" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">{t('dashboard.title')}</label>
                    <input required className="form-control" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('dashboard.category')}</label>
                    <input className="form-control" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('dashboard.date')}</label>
                    <input required className="form-control" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                  </div>
                  <div className="form-group col-span-2" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">{t('dashboard.location')}</label>
                    <input required className="form-control" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
                  </div>
                  <div className="form-group col-span-2" style={{ gridColumn: 'span 2' }}>
                    <button type="submit" className="btn btn-primary">{t('dashboard.publish')}</button>
                  </div>
                </form>
              </div>
              <div className="bento-item col-span-12">
                <h3 className="h3 mb-4">{t('dashboard.manageEvents')}</h3>
                {events.length === 0 ? <p className="text-body">{t('dashboard.empty')}</p> : (
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {events.map(ev => (
                      <div key={ev.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                        <div>
                          <h4 style={{ fontWeight: 600 }}>{ev.title}</h4>
                          <p className="text-small">{ev.date}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <Link to={`/events/${ev.id}`} className="btn" style={{ padding: '6px 12px' }}>{t('events.details')}</Link>
                          <button onClick={() => handleDelete(ev.id)} className="btn btn-danger" style={{ padding: '6px 12px' }}>{t('dashboard.remove')}</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Stats Row */}
              <div className="bento-item col-span-12">
                <h3 className="h3 mb-4">{t('dashboard.stats')}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  <div className="stat-item" style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <div className="stat-value" style={{ color: 'var(--brand-color)' }}>{registrations.length}</div>
                    <div className="stat-label">{t('dashboard.attended')}</div>
                  </div>
                  <div className="stat-item" style={{ background: 'rgba(147, 51, 234, 0.1)', border: '1px solid rgba(147, 51, 234, 0.2)' }}>
                    <div className="stat-value" style={{ color: 'var(--accent-purple)' }}>{xp}</div>
                    <div className="stat-label">{t('dashboard.xp')}</div>
                  </div>
                  <div className="stat-item" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <div className="stat-value" style={{ color: 'var(--success-color)' }}>{favorites.length}</div>
                    <div className="stat-label">{t('dashboard.inFavs')}</div>
                  </div>
                </div>
              </div>

              {/* Tickets & Achievements */}
              <div className="bento-item col-span-7">
                <h3 className="h3 mb-4">{t('dashboard.myTickets')}</h3>
                {registrations.length === 0 ? <p className="text-body">{t('dashboard.empty')}</p> : (
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {registrations.map(ev => (
                      <div key={ev.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--brand-color)' }}>
                        <div>
                          <span className="badge badge-primary mb-2">{ev.category}</span>
                          <h4 style={{ fontWeight: 600, margin: '8px 0', fontSize: '1.1rem' }}>{ev.title}</h4>
                          <p className="text-small">{ev.date} • {ev.location}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end', justifyContent: 'center' }}>
                          <Link to={`/events/${ev.id}`} className="btn" style={{ padding: '6px 16px' }}>{t('events.details')}</Link>
                          <button onClick={() => { dispatch(cancelRegistration(ev.id)); addToast('Refunded', 'info'); }} className="btn btn-danger" style={{ padding: '6px 16px', border: 'none' }}>{t('dashboard.refund')}</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Activity & Favorites */}
              <div className="bento-item col-span-5" style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 className="h3 mb-4">{t('dashboard.favs')}</h3>
                {favorites.length === 0 ? <p className="text-body">{t('dashboard.empty')}</p> : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {favorites.map(ev => (
                      <div key={ev.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-tertiary)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                        <img src={ev.image} alt="" style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                          <Link to={`/events/${ev.id}`} style={{ fontWeight: 600, display: 'block', fontSize: '0.95rem', marginBottom: '4px' }}>{ev.title}</Link>
                          <button onClick={() => dispatch(toggleFavorite(ev))} style={{ background: 'none', border: 'none', color: 'var(--danger-color)', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>{t('dashboard.remove')}</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <h3 className="h3 mt-8 mb-4">{t('dashboard.achievements')}</h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {xp >= 50 && (
                    <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid var(--brand-color)', borderRadius: '12px', textAlign: 'center', width: '80px' }}>
                      <div style={{ fontSize: '24px', marginBottom: '4px' }}>
                        <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', fill: 'var(--brand-color)', margin: '0 auto' }}>
                           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>{t('dashboard.badgeFirst')}</span>
                    </div>
                  )}
                  {xp >= 150 && (
                    <div style={{ padding: '12px', background: 'rgba(147, 51, 234, 0.1)', border: '1px solid var(--accent-purple)', borderRadius: '12px', textAlign: 'center', width: '80px' }}>
                      <div style={{ fontSize: '24px', marginBottom: '4px' }}>
                         <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', fill: 'var(--accent-purple)', margin: '0 auto' }}>
                           <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                         </svg>
                      </div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>{t('dashboard.badgeActive')}</span>
                    </div>
                  )}
                  {xp < 50 && <p className="text-small">{t('dashboard.noBadges')}</p>}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
