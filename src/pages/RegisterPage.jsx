import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name, email, role: email.includes('admin') ? 'organizer' : 'student' });
    addToast('Аккаунт создан!', 'success');
    navigate('/dashboard');
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="bento-item" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 className="h2 mb-8" style={{ textAlign: 'center' }}>Регистрация</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Имя</label>
            <input required className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="Иван Иванов" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" required className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="student@college.ru" />
          </div>
          <div className="form-group mb-8">
            <label className="form-label">Пароль</label>
            <input type="password" required className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Создать аккаунт</button>
        </form>
        <p className="text-small mt-4" style={{ textAlign: 'center' }}>
          Уже есть аккаунт? <Link to="/login" style={{ color: 'var(--brand-color)' }}>Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
