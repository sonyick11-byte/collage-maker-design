import { useState } from 'react';
import { User, Mail, Phone, Building2, Edit2, Save, X } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

export function ProfilePage() {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    position: user?.position || '',
  });

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      position: user?.position || '',
    });
    setIsEditing(false);
  };

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  if (!user) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-500">Пожалуйста, войдите в систему</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Личный кабинет</h1>
        <p className="text-sm text-gray-600 mt-1">Управление личными данными</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8">
          <div className="flex items-center gap-6">
            <div className="size-24 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {getInitials(formData.fullName)}
              </span>
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="text-2xl font-bold text-gray-900 bg-white border-2 border-blue-200 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <h2 className="text-2xl font-bold text-gray-900">{formData.fullName}</h2>
              )}
              {isEditing ? (
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="text-sm text-gray-600 mt-2 bg-white border-2 border-blue-200 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-600 mt-1">{formData.position}</p>
              )}
            </div>
            <div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit2 className="size-4" />
                  <span>Редактировать</span>
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="size-4" />
                    <span>Сохранить</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <X className="size-4" />
                    <span>Отмена</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Контактная информация</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Mail className="size-4 text-blue-600" />
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="px-4 py-2.5 bg-gray-50 rounded-lg">
                  <p className="text-gray-900">{formData.email}</p>
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Phone className="size-4 text-blue-600" />
                Телефон
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="px-4 py-2.5 bg-gray-50 rounded-lg">
                  <p className="text-gray-900">{formData.phone}</p>
                </div>
              )}
            </div>

            {/* Position */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Building2 className="size-4 text-blue-600" />
                Должность
              </label>
              <div className="px-4 py-2.5 bg-gray-50 rounded-lg">
                <p className="text-gray-900">{formData.position}</p>
              </div>
            </div>

            {/* Login */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User className="size-4 text-blue-600" />
                Логин
              </label>
              <div className="px-4 py-2.5 bg-gray-50 rounded-lg">
                <p className="text-gray-900">{user.login}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="border-t border-gray-200 p-8 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Статистика работы</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Обслужено клиентов</p>
              <p className="text-3xl font-bold text-blue-600">127</p>
              <p className="text-xs text-gray-500 mt-2">За текущий месяц</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Оформлено продуктов</p>
              <p className="text-3xl font-bold text-green-600">42</p>
              <p className="text-xs text-gray-500 mt-2">За текущий месяц</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Выполнено задач</p>
              <p className="text-3xl font-bold text-purple-600">89</p>
              <p className="text-xs text-gray-500 mt-2">За текущий месяц</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
