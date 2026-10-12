import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleFavorite } from '../store/favoritesSlice';
import { useLanguage } from '../context/LanguageContext';

const WeatherIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', marginRight: '4px', fill: 'currentColor' }}>
    <path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Zm0-2a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
    <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
  </svg>
);

const EventsPage = () => {
  const events = useSelector(s => s.events.items);
  const favorites = useSelector(s => s.favorites.items);
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(events.map(e => e.category))];
  const filteredEvents = filter === 'All' ? events : events.filter(e => e.category === filter);

  return (
    <div className="container">
      <h1 className="h1 mb-8" style={{ textAlign: 'center' }}>{t('events.title')}</h1>
      
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)}
            className={`btn ${filter === cat ? 'btn-primary' : ''}`}
            style={{ borderRadius: '24px' }}
          >
            {cat === 'All' ? t('events.all') : cat}
          </button>
        ))}
      </div>

      <div className="bento-grid">
        {filteredEvents.map(ev => {
          const isFav = favorites.find(f => f.id === ev.id);
          return (
            <div key={ev.id} className="card col-span-4" style={{ gridColumn: 'span 4' }}>
              <Link to={`/events/${ev.id}`}>
                <img src={ev.image} alt={ev.title} className="card-img" />
              </Link>
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <span className="badge badge-accent">{ev.category}</span>
                  <button onClick={() => dispatch(toggleFavorite(ev))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: isFav ? 'var(--danger-color)' : 'var(--text-secondary)' }}>
                    {isFav ? t('events.removeFav') : t('events.addFav')}
                  </button>
                </div>
                
                <Link to={`/events/${ev.id}`}>
                  <h3 className="h3" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{ev.title}</h3>
                </Link>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <p className="text-small">{ev.date}</p>
                  <div className="badge" style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-tertiary)' }}>
                    <WeatherIcon />
                    +15°C
                  </div>
                </div>

                <p className="text-body" style={{ fontSize: '0.9rem', marginBottom: '24px', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {ev.description}
                </p>
                <Link to={`/events/${ev.id}`} className="btn btn-primary btn-block">{t('events.details')}</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsPage;
