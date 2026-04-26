import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Lock, Mail, Phone, Building2 } from 'lucide-react';
import owlImage from '../../imports/Copilot_20260420_121037.png';
import backgroundImage from '../../imports/Copilot_20260312_001345.png';
import { useUser } from '../contexts/UserContext';

export function RegisterPage() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    login: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    setUser({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      login: formData.login,
    });
    navigate('/');
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Title */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-10">
        <h1 className="text-2xl font-bold text-blue-900">
          Автоматизированное Рабочее Место Банковского Работника
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-4 flex items-center justify-center gap-24 mt-16">
        {/* Left side - Owl illustration */}
        <div className="hidden lg:flex flex-col items-center relative">
          {/* Speech bubble */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-3xl px-8 py-4 shadow-lg" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full w-0 h-0 border-l-[16px] border-r-[16px] border-t-[20px] border-l-transparent border-r-transparent border-t-white/90"></div>
            <p className="text-blue-900 font-semibold text-center leading-relaxed">
              Добро пожаловать<br />в Финли Банк!
            </p>
          </div>

          {/* Owl Image */}
          <div className="relative mt-8">
            <img 
              src={owlImage} 
              alt="Owl" 
              className="w-80 h-auto drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.15))' }}
            />
          </div>
        </div>

        {/* Right side - Registration form */}
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
            <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Регистрация</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700">
                    <User className="size-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="ФИО"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-blue-50/50 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all placeholder:text-blue-900/60 text-blue-900"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700">
                    <Mail className="size-5" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-blue-50/50 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all placeholder:text-blue-900/60 text-blue-900"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700">
                    <Phone className="size-5" />
                  </div>
                  <input
                    type="tel"
                    placeholder="Телефон"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-blue-50/50 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all placeholder:text-blue-900/60 text-blue-900"
                    required
                  />
                </div>
              </div>

              {/* Position */}
              <div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700">
                    <Building2 className="size-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Должность"
                    value={formData.position}
                    onChange={(e) => handleChange('position', e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-blue-50/50 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all placeholder:text-blue-900/60 text-blue-900"
                    required
                  />
                </div>
              </div>

              {/* Login */}
              <div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700">
                    <User className="size-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Логин"
                    value={formData.login}
                    onChange={(e) => handleChange('login', e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-blue-50/50 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all placeholder:text-blue-900/60 text-blue-900"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700">
                    <Lock className="size-5" />
                  </div>
                  <input
                    type="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 bg-blue-50/50 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all placeholder:text-blue-900/60 text-blue-900"
                    required
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="flex gap-1">
                      <div className="size-2 bg-blue-600 rounded-full"></div>
                      <div className="size-2 bg-blue-600 rounded-full"></div>
                      <div className="size-2 bg-blue-600 rounded-full"></div>
                      <div className="size-2 bg-blue-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700">
                    <Lock className="size-5" />
                  </div>
                  <input
                    type="password"
                    placeholder="Подтвердите пароль"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 bg-blue-50/50 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all placeholder:text-blue-900/60 text-blue-900"
                    required
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="flex gap-1">
                      <div className="size-2 bg-blue-600 rounded-full"></div>
                      <div className="size-2 bg-blue-600 rounded-full"></div>
                      <div className="size-2 bg-blue-600 rounded-full"></div>
                      <div className="size-2 bg-blue-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Register button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg mt-6"
                style={{ boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)' }}
              >
                Зарегистрироваться
              </button>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-blue-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-blue-900/60">или</span>
                </div>
              </div>

              {/* Back to Login button */}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full py-3.5 bg-white border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-blue-900 font-semibold rounded-xl transition-all"
              >
                Уже есть аккаунт? Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
