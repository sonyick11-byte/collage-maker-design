import { useState } from 'react';
import { Search, Filter, Plus, X, User, Phone, Mail, Calendar, Wallet, CreditCard, TrendingUp } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  code: string;
  phone: string;
  email: string;
  segment: string;
  segmentColor: string;
  balance: string;
  lastVisit: string;
  address?: string;
  birthDate?: string;
  registrationDate?: string;
  products?: string[];
  creditHistory?: { date: string; product: string; amount: string; status: string }[];
}

export function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showSegmentFilter, setShowSegmentFilter] = useState(false);
  const [newClientForm, setNewClientForm] = useState({
    name: '',
    phone: '',
    email: '',
    segment: 'Стандарт',
    address: '',
    birthDate: '',
  });
  const [clientsList, setClientsList] = useState<Client[]>([

    {
      id: '1',
      name: 'Иванов Иван Петрович',
      code: 'ИИП',
      phone: '+375 (29) 123-45-67',
      email: 'ivanov@example.com',
      segment: 'VIP',
      segmentColor: 'bg-purple-100 text-purple-700',
      balance: '5 420 000 Br',
      lastVisit: '28.03.2026',
      address: 'г. Минск, пр-т Независимости, д. 10, кв. 25',
      birthDate: '15.05.1985',
      registrationDate: '12.01.2020',
      products: ['Премиум карта', 'Накопительный вклад', 'Потребительский кредит'],
      creditHistory: [
        { date: '15.01.2024', product: 'Потребительский кредит', amount: '1 500 000 Br', status: 'Активен' },
        { date: '10.06.2023', product: 'Автокредит', amount: '2 000 000 Br', status: 'Погашен' },
      ],
    },
    {
      id: '2',
      name: 'Сидорова Мария Александровна',
      code: 'СМА',
      phone: '+375 (44) 234-56-78',
      email: 'sidorova@example.com',
      segment: 'Премиум',
      segmentColor: 'bg-blue-100 text-blue-700',
      balance: '1 250 000 Br',
      lastVisit: '28.03.2026',
      address: 'г. Минск, ул. Ленина, д. 45, кв. 12',
      birthDate: '22.09.1990',
      registrationDate: '05.03.2021',
      products: ['Дебетовая карта', 'Срочный вклад'],
      creditHistory: [],
    },
    {
      id: '3',
      name: 'Козлов Дмитрий Сергеевич',
      code: 'КДС',
      phone: '+375 (33) 345-67-89',
      email: 'kozlov@example.com',
      segment: 'Стандарт',
      segmentColor: 'bg-gray-100 text-gray-700',
      balance: '350 000 Br',
      lastVisit: '25.03.2026',
      address: 'г. Гомель, ул. Советская, д. 8, кв. 56',
      birthDate: '10.12.1988',
      registrationDate: '20.07.2022',
      products: ['Дебетовая карта'],
      creditHistory: [],
    },
    {
      id: '4',
      name: 'Петрова Елена Викторовна',
      code: 'ПЕВ',
      phone: '+375 (25) 456-78-90',
      email: 'petrova@example.com',
      segment: 'Премиум',
      segmentColor: 'bg-blue-100 text-blue-700',
      balance: '980 000 Br',
      lastVisit: '30.03.2026',
      address: 'г. Витебск, ул. Замковая, д. 33, кв. 78',
      birthDate: '05.07.1992',
      registrationDate: '18.11.2021',
      products: ['Премиум карта', 'Накопительный вклад'],
      creditHistory: [],
    },
    {
      id: '5',
      name: 'Смирнов Алексей Николаевич',
      code: 'САН',
      phone: '+375 (29) 567-89-01',
      email: 'smirnov@example.com',
      segment: 'VIP',
      segmentColor: 'bg-purple-100 text-purple-700',
      balance: '7 300 000 Br',
      lastVisit: '30.03.2026',
      address: 'г. Минск, пр-т Дзержинского, д. 12, кв. 101',
      birthDate: '28.03.1978',
      registrationDate: '08.05.2019',
      products: ['Премиум карта', 'Срочный вклад', 'Ипотека'],
      creditHistory: [
        { date: '10.05.2023', product: 'Ипотека', amount: '15 000 000 Br', status: 'Активен' },
      ],
    },
  ]);

  const handleAddClient = () => {
    if (!newClientForm.name || !newClientForm.phone || !newClientForm.email) {
      alert('Пожалуйста, заполните обязательные поля');
      return;
    }

    const nameParts = newClientForm.name.trim().split(' ');
    const code = nameParts.length >= 2
      ? `${nameParts[0][0]}${nameParts[1][0]}${nameParts[2]?.[0] || ''}`.toUpperCase()
      : newClientForm.name.substring(0, 3).toUpperCase();

    const segmentColor =
      newClientForm.segment === 'VIP'
        ? 'bg-purple-100 text-purple-700'
        : newClientForm.segment === 'Премиум'
        ? 'bg-blue-100 text-blue-700'
        : 'bg-gray-100 text-gray-700';

    const newClient: Client = {
      id: String(Date.now()),
      name: newClientForm.name,
      code: code,
      phone: newClientForm.phone,
      email: newClientForm.email,
      segment: newClientForm.segment,
      segmentColor: segmentColor,
      balance: '0 Br',
      lastVisit: new Date().toLocaleDateString('ru-RU'),
      address: newClientForm.address,
      birthDate: newClientForm.birthDate,
      registrationDate: new Date().toLocaleDateString('ru-RU'),
      products: [],
      creditHistory: [],
    };

    setClientsList([...clientsList, newClient]);
    setNewClientForm({
      name: '',
      phone: '',
      email: '',
      segment: 'Стандарт',
      address: '',
      birthDate: '',
    });
    setShowAddClient(false);
  };

  const filteredClients = clientsList.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSegment = selectedSegment === 'all' || client.segment === selectedSegment;

    return matchesSearch && matchesSegment;
  });

  const vipCount = clientsList.filter(c => c.segment === 'VIP').length;
  const premiumCount = clientsList.filter(c => c.segment === 'Премиум').length;
  const standardCount = clientsList.filter(c => c.segment === 'Стандарт').length;

  const segmentStats = [
    { label: 'Всего клиентов', value: String(clientsList.length), color: 'text-gray-900' },
    { label: 'VIP', value: String(vipCount), color: 'text-purple-600' },
    { label: 'Премиум', value: String(premiumCount), color: 'text-blue-600' },
    { label: 'Стандарт', value: String(standardCount), color: 'text-gray-600' },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Клиенты</h1>
        <p className="text-sm text-gray-600 mt-1">Управление базой клиентов</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {segmentStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="p-5 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по имени, телефону или email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3 relative">
            <div className="relative">
              <button
                onClick={() => setShowSegmentFilter(!showSegmentFilter)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Filter className="size-4" />
                <span className="text-sm font-medium">
                  {selectedSegment === 'all' ? 'Все сегменты' : selectedSegment}
                </span>
              </button>
              {showSegmentFilter && (
                <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]">
                  <button
                    onClick={() => {
                      setSelectedSegment('all');
                      setShowSegmentFilter(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg"
                  >
                    Все сегменты
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSegment('VIP');
                      setShowSegmentFilter(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    VIP
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSegment('Премиум');
                      setShowSegmentFilter(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    Премиум
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSegment('Стандарт');
                      setShowSegmentFilter(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 last:rounded-b-lg"
                  >
                    Стандарт
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowAddClient(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="size-4" />
              <span className="text-sm font-medium">Добавить клиента</span>
            </button>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Клиент
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Контакты
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Сегмент
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Баланс
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Последний визит
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedClient(client)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-blue-600">{client.code}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{client.name}</p>
                        <p className="text-sm text-gray-500">ID: {client.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm text-gray-900">{client.phone}</p>
                      <p className="text-sm text-gray-500">{client.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${client.segmentColor}`}>
                      {client.segment}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-medium text-gray-900">{client.balance}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-600">{client.lastVisit}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Подробнее →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Details Modal */}
      {selectedClient && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedClient(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="size-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">{selectedClient.code}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedClient.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedClient.segmentColor}`}>
                      {selectedClient.segment}
                    </span>
                    <span className="text-sm text-gray-500">ID: {selectedClient.code}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="size-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="size-5 text-blue-600" />
                  Контактная информация
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Phone className="size-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Телефон</p>
                      <p className="text-sm font-medium text-gray-900">{selectedClient.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="size-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <p className="text-sm font-medium text-gray-900">{selectedClient.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="size-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Дата рождения</p>
                      <p className="text-sm font-medium text-gray-900">{selectedClient.birthDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="size-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Клиент с</p>
                      <p className="text-sm font-medium text-gray-900">{selectedClient.registrationDate}</p>
                    </div>
                  </div>
                  <div className="md:col-span-2 flex items-start gap-3">
                    <User className="size-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Адрес</p>
                      <p className="text-sm font-medium text-gray-900">{selectedClient.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Wallet className="size-5 text-blue-600" />
                  Финансовая информация
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                  <p className="text-sm text-gray-600 mb-2">Общий баланс</p>
                  <p className="text-4xl font-bold text-gray-900">{selectedClient.balance}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <TrendingUp className="size-4 text-green-600" />
                    <span className="text-green-600 font-medium">+12.5%</span>
                    <span className="text-gray-500">за последний месяц</span>
                  </div>
                </div>
              </div>

              {/* Active Products */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="size-5 text-blue-600" />
                  Активные продукты
                </h3>
                <div className="space-y-2">
                  {selectedClient.products && selectedClient.products.length > 0 ? (
                    selectedClient.products.map((product, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard className="size-5 text-blue-600" />
                          <span className="font-medium text-gray-900">{product}</span>
                        </div>
                        <span className="text-xs text-green-600 font-medium">Активен</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">Нет активных продуктов</p>
                  )}
                </div>
              </div>

              {/* Credit History */}
              {selectedClient.creditHistory && selectedClient.creditHistory.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="size-5 text-blue-600" />
                    История кредитов
                  </h3>
                  <div className="space-y-2">
                    {selectedClient.creditHistory.map((credit, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-gray-900">{credit.product}</p>
                            <p className="text-sm text-gray-500">{credit.date}</p>
                          </div>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                              credit.status === 'Активен'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {credit.status}
                          </span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{credit.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                  Редактировать
                </button>
                <button className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
                  Создать задачу
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {showAddClient && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowAddClient(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Добавить клиента</h2>
                <p className="text-sm text-gray-600 mt-1">Заполните информацию о новом клиенте</p>
              </div>
              <button
                onClick={() => setShowAddClient(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="size-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ФИО *</label>
                <input
                  type="text"
                  value={newClientForm.name}
                  onChange={(e) => setNewClientForm({ ...newClientForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Введите полное имя"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Телефон *</label>
                  <input
                    type="tel"
                    value={newClientForm.phone}
                    onChange={(e) => setNewClientForm({ ...newClientForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+375 (__)  ___-__-__"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={newClientForm.email}
                    onChange={(e) => setNewClientForm({ ...newClientForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Сегмент *</label>
                  <select
                    value={newClientForm.segment}
                    onChange={(e) => setNewClientForm({ ...newClientForm, segment: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Стандарт">Стандарт</option>
                    <option value="Премиум">Премиум</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Дата рождения</label>
                  <input
                    type="date"
                    value={newClientForm.birthDate}
                    onChange={(e) => setNewClientForm({ ...newClientForm, birthDate: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Адрес</label>
                <input
                  type="text"
                  value={newClientForm.address}
                  onChange={(e) => setNewClientForm({ ...newClientForm, address: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Введите адрес"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddClient}
                  className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Добавить клиента
                </button>
                <button
                  onClick={() => setShowAddClient(false)}
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
