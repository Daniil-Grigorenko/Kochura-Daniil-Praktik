import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerForEvent, cancelRegistration } from '../store/registrationsSlice';
import { toggleFavorite } from '../store/favoritesSlice';
import { addComment } from '../store/eventsSlice';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';

const WeatherBadge = ({ t }) => (
  <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', padding: '12px 24px', borderRadius: '16px', display: 'inline-flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
    <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', fill: 'white' }}>
      <path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Zm0-2a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
      <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
    </svg>
    <div>
      <div style={{ color: 'white', fontWeight: 700, fontSize: '1.25rem' }}>+15°C</div>
      <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem' }}>{t('weather.status').split(',')[0]}</div>
    </div>
  </div>
);

const EventDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { addToast } = useToast();
  const { t } = useLanguage();

  const event = useSelector(s => s.events.items.find(e => e.id === Number(id)));
  const isRegistered = useSelector(s => s.registrations.items.some(e => e.id === Number(id)));
  const isFav = useSelector(s => s.favorites.items.some(e => e.id === Number(id)));

  const [commentText, setCommentText] = useState('');

  if (!event) return <div className="container"><p>{t('events.notFound')}</p><Link to="/events" className="btn">{t('events.back')}</Link></div>;

  const handleAction = () => {
    if (!user) {
      addToast('Login required', 'error');
      return;
    }
    if (isRegistered) {
      dispatch(cancelRegistration(event.id));
      addToast('Registration cancelled', 'info');
    } else {
      dispatch(registerForEvent(event));
      addToast('Registered successfully!', 'success');
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      addToast('Login required', 'error');
      return;
    }
    if (commentText.trim()) {
      dispatch(addComment({ eventId: event.id, text: commentText, author: user.name, role: user.role, date: new Date().toLocaleDateString() }));
      setCommentText('');
      addToast('Success', 'success');
    }
  };

  return (
    <div className="container">
      <Link to="/events" className="btn mb-8">← {t('events.back')}</Link>
      
      <div className="bento-grid">
        <div className="bento-item col-span-12" style={{ padding: 0, overflow: 'hidden', height: '400px', position: 'relative' }}>
          <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(9,9,11,0.9))', padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <span className="badge badge-accent mb-4">{event.category}</span>
              <h1 className="h1" style={{ margin: 0, color: 'white' }}>{event.title}</h1>
            </div>
            <WeatherBadge t={t} />
          </div>
        </div>

        <div className="bento-item col-span-8">
          <h2 className="h2 mb-4">{t('events.about')}</h2>
          <p className="text-body" style={{ whiteSpace: 'pre-line' }}>{event.description}</p>
          
          <h3 className="h3 mt-8 mb-4">{t('events.discussion')}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            {(!event.comments || event.comments.length === 0) ? (
              <p className="text-small">{t('events.noComments')}</p>
            ) : (
              event.comments.map(c => (
                <div key={c.id} style={{ background: 'var(--bg-tertiary)', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong>{c.author} <span style={{ fontSize: '0.8em', color: 'var(--brand-color)' }}>{c.role === 'organizer' ? '(Org)' : ''}</span></strong>
                    <span className="text-small">{c.date}</span>
                  </div>
                  <p className="text-body" style={{ fontSize: '0.95rem' }}>{c.text}</p>
                </div>
              ))
            )}
          </div>
          
          <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '12px' }}>
            <input className="form-control" placeholder="..." value={commentText} onChange={e => setCommentText(e.target.value)} />
            <button type="submit" className="btn btn-primary">{t('events.send')}</button>
          </form>
        </div>

        <div className="bento-item col-span-4" style={{ alignSelf: 'start' }}>
          <h3 className="h3 mb-4">{t('events.details')}</h3>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
              <span className="text-small" style={{ display: 'block', marginBottom: '4px' }}>{t('events.when')}</span>
              <strong style={{ fontSize: '1.1rem' }}>{event.date}</strong>
            </div>
            <div>
              <span className="text-small" style={{ display: 'block', marginBottom: '4px' }}>{t('events.where')}</span>
              <strong style={{ fontSize: '1.1rem' }}>{event.location}</strong>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button onClick={handleAction} className={`btn btn-block ${isRegistered ? 'btn-danger' : 'btn-accent'}`} style={{ padding: '16px' }}>
              {isRegistered ? t('events.cancelReg') : t('events.register')}
            </button>
            <button onClick={() => { dispatch(toggleFavorite(event)); addToast('Success', 'info'); }} className="btn btn-block">
              {isFav ? t('events.removeFav') : t('events.addFav')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
