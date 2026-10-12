import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const ExplorePage = () => {
  const { t } = useLanguage();

  return (
    <div className="container">
      <h1 className="h1 mb-8" style={{ textAlign: 'center' }}>{t('weather.title')}</h1>
      
      <div className="bento-grid">
        {/* Main Weather Card */}
        <div className="bento-item col-span-8" style={{ position: 'relative', overflow: 'hidden', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, var(--brand-color), var(--accent-purple))', opacity: 0.1 }}></div>
          <div style={{ position: 'relative', zIndex: 1, padding: '40px' }}>
            <span className="badge badge-primary mb-4">{t('weather.today')}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <h2 style={{ fontSize: '6rem', fontWeight: 800, margin: 0, lineHeight: 1 }}>+15°</h2>
              <div>
                <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0 0 8px' }}>{t('weather.status')}</p>
                <p className="text-secondary">{t('weather.feelsLike')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* UV & Visibility */}
        <div className="bento-item col-span-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 className="h3 mb-2">{t('weather.uv_index')}</h3>
            <div style={{ display: 'flex', alignItems: 'end', gap: '12px' }}>
              <span style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--success-color)', lineHeight: 1 }}>2</span>
              <span className="text-small mb-2">{t('weather.low')}</span>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="h3 mb-2">{t('weather.visibility')}</h3>
            <div style={{ display: 'flex', alignItems: 'end', gap: '12px' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>10</span>
              <span className="text-small mb-1">km</span>
            </div>
          </div>
        </div>
        
        {/* Basic Stats */}
        <div className="bento-item col-span-4">
          <h3 className="h3">{t('weather.wind')}</h3>
          <p className="text-body mt-4" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--brand-color)' }}>5 <span style={{ fontSize: '1rem' }}>m/s</span></p>
          <p className="text-small">{t('weather.nw')}</p>
        </div>
        
        <div className="bento-item col-span-4">
          <h3 className="h3">{t('weather.humidity')}</h3>
          <p className="text-body mt-4" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--brand-color)' }}>65 <span style={{ fontSize: '1rem' }}>%</span></p>
          <p className="text-small">{t('weather.comfort')}</p>
        </div>
        
        <div className="bento-item col-span-4">
          <h3 className="h3">{t('weather.pressure')}</h3>
          <p className="text-body mt-4" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--brand-color)' }}>750 <span style={{ fontSize: '1rem' }}>mmHg</span></p>
          <p className="text-small">{t('weather.normal')}</p>
        </div>

        {/* Hourly Forecast Mock */}
        <div className="bento-item col-span-12">
          <h3 className="h3 mb-6">{t('weather.hourly')}</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', overflowX: 'auto', paddingBottom: '16px', gap: '24px' }}>
            {['10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'].map((time, i) => (
              <div key={time} style={{ textAlign: 'center', minWidth: '80px' }}>
                <p className="text-small mb-2">{time}</p>
                <div style={{ margin: '12px auto', width: '32px', height: '32px', borderRadius: '50%', background: i % 2 === 0 ? 'var(--brand-color)' : 'var(--bg-tertiary)', opacity: 0.8 }}></div>
                <p style={{ fontWeight: 600, fontSize: '1.25rem' }}>+{15 + (i < 3 ? i : 5 - i)}°</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
