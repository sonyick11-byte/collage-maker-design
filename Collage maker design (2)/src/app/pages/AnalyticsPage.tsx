import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';

export function AnalyticsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Аналитика</h1>
        <p className="text-sm text-gray-600 mt-1">Статистика и отчеты</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Users className="size-6 text-blue-600" />
            </div>
            <TrendingUp className="size-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Новые клиенты</p>
          <p className="text-3xl font-bold text-gray-900">+124</p>
          <p className="text-sm text-green-600 mt-2">+15.3% за месяц</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <DollarSign className="size-6 text-green-600" />
            </div>
            <TrendingUp className="size-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Выдано кредитов</p>
          <p className="text-3xl font-bold text-gray-900">Br 45.2М</p>
          <p className="text-sm text-green-600 mt-2">+22.1% за месяц</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <Target className="size-6 text-purple-600" />
            </div>
            <TrendingUp className="size-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Привлечено вкладов</p>
          <p className="text-3xl font-bold text-gray-900">Br 67.8М</p>
          <p className="text-sm text-green-600 mt-2">+18.5% за месяц</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-xl">
              <TrendingUp className="size-6 text-orange-600" />
            </div>
            <TrendingUp className="size-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Конверсия</p>
          <p className="text-3xl font-bold text-gray-900">68.4%</p>
          <p className="text-sm text-green-600 mt-2">+5.2% за месяц</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Графики и диаграммы</h2>
        <div className="h-96 flex items-center justify-center text-gray-400">
          <p>Здесь будут отображаться графики аналитики</p>
        </div>
      </div>
    </div>
  );
}
