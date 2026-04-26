import { useState } from 'react';
import { Building2, CreditCard, PiggyBank, TrendingUp, X } from 'lucide-react';

interface Product {
  id: string;
  type: 'credit' | 'deposit' | 'card';
  icon: any;
  name: string;
  description: string;
  rate: string;
  rateLabel: string;
  amount: string;
  features: string[];
  badge?: string;
}

export function ProductsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'credits' | 'deposits' | 'cards'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [applicationForm, setApplicationForm] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    amount: '',
    term: '',
    comments: '',
  });

  const products: Product[] = [
    {
      id: '1',
      type: 'credit',
      icon: Building2,
      name: 'Потребительский кредит',
      description: 'Кредит на любые цели без обеспечения',
      rate: '9.9%',
      rateLabel: 'годовых',
      amount: 'От 50 000 до 5 000 000 Br',
      features: ['Срок до 5 лет', 'Сумма до 5 млн Br', 'Решение за 1 час'],
      badge: 'КРЕДИТ',
    },
    {
      id: '2',
      type: 'credit',
      icon: Building2,
      name: 'Ипотека',
      description: 'Кредит на покупку жилья',
      rate: '7.5%',
      rateLabel: 'годовых',
      amount: 'От 500 000 до 50 000 000 Br',
      features: ['Срок до 30 лет', 'Первоначальный взнос от 10%', 'Господдержка'],
      badge: 'КРЕДИТ',
    },
    {
      id: '3',
      type: 'deposit',
      icon: TrendingUp,
      name: 'Накопительный вклад',
      description: 'Вклад с возможностью пополнения',
      rate: '15.5%',
      rateLabel: 'ставка',
      amount: 'От 10 000 до 50 000 000 Br',
      features: ['Срок от 3 месяцев', 'Пополнение без ограничений', 'Проценты каждый месяц'],
      badge: 'ВКЛАД',
    },
    {
      id: '4',
      type: 'deposit',
      icon: TrendingUp,
      name: 'Срочный вклад',
      description: 'Вклад с высокой процентной ставкой',
      rate: '17%',
      rateLabel: 'ставка',
      amount: 'От 50 000 до 100 000 000 Br',
      features: ['Срок от 6 месяцев', 'Максимальная ставка', 'Капитализация процентов'],
      badge: 'ВКЛАД',
    },
    {
      id: '5',
      type: 'card',
      icon: CreditCard,
      name: 'Премиум карта',
      description: 'Кредитная карта с кэшбэком',
      rate: '19.9%',
      rateLabel: 'годовых',
      amount: '0',
      features: ['Кэшбэк до 10%', 'Льготный период 120 дней', 'Лимит до 1 млн Br'],
      badge: 'КАРТА',
    },
    {
      id: '6',
      type: 'card',
      icon: CreditCard,
      name: 'Дебетовая карта',
      description: 'Карта с процентом на остаток',
      rate: '7%',
      rateLabel: 'годовых',
      amount: '0',
      features: ['7% на остаток', 'Кэшбэк 5%', 'Бесплатные переводы'],
      badge: 'КАРТА',
    },
  ];

  const filteredProducts = products.filter((product) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'credits') return product.type === 'credit';
    if (activeTab === 'deposits') return product.type === 'deposit';
    if (activeTab === 'cards') return product.type === 'card';
    return true;
  });

  const tabs = [
    { id: 'all', label: 'Все продукты' },
    { id: 'credits', label: 'Кредиты' },
    { id: 'deposits', label: 'Вклады' },
    { id: 'cards', label: 'Карты' },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Продукты банка</h1>
        <p className="text-sm text-gray-600 mt-1">Каталог доступных банковских продуктов</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-3 font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const Icon = product.icon;
          return (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                {/* Icon and Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <Icon className="size-6 text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-gray-500">{product.badge}</span>
                </div>

                {/* Title and Description */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>

                {/* Rate */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-blue-600">{product.rate}</span>
                    <span className="text-sm text-gray-600">{product.rateLabel}</span>
                  </div>
                  {product.amount !== '0' && (
                    <p className="text-sm text-gray-500 mt-1">{product.amount}</p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <svg className="size-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Оформить заявку
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Application Form Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Заявка на {selectedProduct.name}</h2>
                <p className="text-sm text-gray-600 mt-1">Заполните форму для оформления продукта</p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="size-5 text-gray-500" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-6">
              {/* Product Info */}
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {(() => {
                      const Icon = selectedProduct.icon;
                      return <Icon className="size-5 text-blue-600" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{selectedProduct.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{selectedProduct.description}</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-blue-600">{selectedProduct.rate}</span>
                  <span className="text-sm text-gray-600">{selectedProduct.rateLabel}</span>
                </div>
              </div>

              {/* Client Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Информация о клиенте</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ФИО клиента *
                    </label>
                    <input
                      type="text"
                      value={applicationForm.clientName}
                      onChange={(e) =>
                        setApplicationForm({ ...applicationForm, clientName: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Введите ФИО"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        value={applicationForm.clientPhone}
                        onChange={(e) =>
                          setApplicationForm({ ...applicationForm, clientPhone: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={applicationForm.clientEmail}
                        onChange={(e) =>
                          setApplicationForm({ ...applicationForm, clientEmail: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Parameters */}
              {selectedProduct.type !== 'card' && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Параметры продукта</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Сумма (Br) *
                      </label>
                      <input
                        type="number"
                        value={applicationForm.amount}
                        onChange={(e) =>
                          setApplicationForm({ ...applicationForm, amount: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Введите сумму"
                      />
                      <p className="text-xs text-gray-500 mt-1">{selectedProduct.amount}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Срок (месяцев) *
                      </label>
                      <input
                        type="number"
                        value={applicationForm.term}
                        onChange={(e) =>
                          setApplicationForm({ ...applicationForm, term: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Введите срок"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Comments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Комментарии
                </label>
                <textarea
                  value={applicationForm.comments}
                  onChange={(e) =>
                    setApplicationForm({ ...applicationForm, comments: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Дополнительная информация или пожелания клиента"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    alert('Заявка успешно отправлена!');
                    setSelectedProduct(null);
                    setApplicationForm({
                      clientName: '',
                      clientPhone: '',
                      clientEmail: '',
                      amount: '',
                      term: '',
                      comments: '',
                    });
                  }}
                  className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Отправить заявку
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
