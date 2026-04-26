import { useState } from 'react';
import { Calculator, X, Search } from 'lucide-react';
import { Slider } from '../components/ui/slider';

export function CalculatorsPage() {
  const [activeCalculator, setActiveCalculator] = useState<'credit' | 'deposit'>('deposit');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState('');
  const [clientSearch, setClientSearch] = useState('');

  // Deposit calculator state
  const [depositAmount, setDepositAmount] = useState(500000);
  const [depositTerm, setDepositTerm] = useState(12);
  const [depositRate, setDepositRate] = useState(15.5);
  const [depositTopUp, setDepositTopUp] = useState(0);

  // Clients list
  const clients = [
    { id: '1', name: 'Иванов Иван Петрович', code: 'ИИП', segment: 'VIP', phone: '+375 (29) 123-45-67' },
    { id: '2', name: 'Сидорова Мария Александровна', code: 'СМА', segment: 'Премиум', phone: '+375 (44) 234-56-78' },
    { id: '3', name: 'Козлов Дмитрий Сергеевич', code: 'КДС', segment: 'Стандарт', phone: '+375 (33) 345-67-89' },
    { id: '4', name: 'Петрова Елена Викторовна', code: 'ПЕВ', segment: 'Премиум', phone: '+375 (25) 456-78-90' },
    { id: '5', name: 'Смирнов Алексей Николаевич', code: 'САН', segment: 'VIP', phone: '+375 (29) 567-89-01' },
  ];

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(clientSearch.toLowerCase())
  );

  // Credit calculator state
  const [creditAmount, setCreditAmount] = useState(1000000);
  const [creditTerm, setCreditTerm] = useState(12);
  const [creditRate, setCreditRate] = useState(9.9);

  // Deposit calculations
  const depositInitial = depositAmount;
  const depositTopUpTotal = depositTopUp;
  const depositInterest = Math.round(((depositInitial + depositTopUpTotal) * depositRate * depositTerm) / 1200);
  const depositTotal = depositInitial + depositTopUpTotal + depositInterest;
  const depositEffectiveRate = depositTerm > 0 ? ((depositInterest / depositInitial) * (12 / depositTerm) * 100).toFixed(2) : '0.00';

  // Credit calculations
  const monthlyRate = creditRate / 100 / 12;
  const creditMonthlyPayment = Math.round(
    (creditAmount * monthlyRate * Math.pow(1 + monthlyRate, creditTerm)) /
      (Math.pow(1 + monthlyRate, creditTerm) - 1)
  );
  const creditTotalPayment = creditMonthlyPayment * creditTerm;
  const creditOverpayment = creditTotalPayment - creditAmount;
  const creditEffectiveRate = creditTerm > 0 ? ((creditOverpayment / creditAmount) * 100).toFixed(2) : '0.00';

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Калькуляторы</h1>
        <p className="text-sm text-gray-600 mt-1">Расчет кредитов и вкладов</p>
      </div>

      {/* Calculator Type Tabs */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setActiveCalculator('credit')}
          className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all ${
            activeCalculator === 'credit'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-600'
          }`}
        >
          <Calculator className="size-4" />
          Кредитный калькулятор
        </button>
        <button
          onClick={() => setActiveCalculator('deposit')}
          className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all ${
            activeCalculator === 'deposit'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-600'
          }`}
        >
          <Calculator className="size-4" />
          Депозитный калькулятор
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Parameters Panel */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            {activeCalculator === 'credit' ? 'Параметры кредита' : 'Параметры вклада'}
          </h2>

          {activeCalculator === 'deposit' ? (
            <div className="space-y-8">
              {/* Deposit Amount */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">Сумма вклада</label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    className="w-32 px-3 py-2 text-right border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Slider
                  value={[depositAmount]}
                  onValueChange={(values) => setDepositAmount(values[0])}
                  min={10000}
                  max={10000000}
                  step={10000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>10 000 Br</span>
                  <span>10 000 000 Br</span>
                </div>
              </div>

              {/* Deposit Term */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">Срок вклада (месяцев)</label>
                  <input
                    type="number"
                    value={depositTerm}
                    onChange={(e) => setDepositTerm(Number(e.target.value))}
                    className="w-32 px-3 py-2 text-right border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Slider
                  value={[depositTerm]}
                  onValueChange={(values) => setDepositTerm(values[0])}
                  min={3}
                  max={36}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>3 мес</span>
                  <span>36 мес</span>
                </div>
              </div>

              {/* Deposit Rate */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">Процентная ставка (%)</label>
                  <input
                    type="number"
                    value={depositRate}
                    onChange={(e) => setDepositRate(Number(e.target.value))}
                    step="0.1"
                    className="w-32 px-3 py-2 text-right border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Slider
                  value={[depositRate]}
                  onValueChange={(values) => setDepositRate(values[0])}
                  min={5}
                  max={20}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>5%</span>
                  <span>20%</span>
                </div>
              </div>

              {/* Monthly Top-up */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">Ежемесячное пополнение</label>
                  <input
                    type="number"
                    value={depositTopUp}
                    onChange={(e) => setDepositTopUp(Number(e.target.value))}
                    className="w-32 px-3 py-2 text-right border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Slider
                  value={[depositTopUp]}
                  onValueChange={(values) => setDepositTopUp(values[0])}
                  min={0}
                  max={100000}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0 Br</span>
                  <span>100 000 Br</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Credit Amount */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">Сумма кредита</label>
                  <input
                    type="number"
                    value={creditAmount}
                    onChange={(e) => setCreditAmount(Number(e.target.value))}
                    className="w-32 px-3 py-2 text-right border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Slider
                  value={[creditAmount]}
                  onValueChange={(values) => setCreditAmount(values[0])}
                  min={50000}
                  max={5000000}
                  step={10000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>50 000 Br</span>
                  <span>5 000 000 Br</span>
                </div>
              </div>

              {/* Credit Term */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">Срок кредита (месяцев)</label>
                  <input
                    type="number"
                    value={creditTerm}
                    onChange={(e) => setCreditTerm(Number(e.target.value))}
                    className="w-32 px-3 py-2 text-right border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Slider
                  value={[creditTerm]}
                  onValueChange={(values) => setCreditTerm(values[0])}
                  min={3}
                  max={60}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>3 мес</span>
                  <span>60 мес</span>
                </div>
              </div>

              {/* Credit Rate */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">Процентная ставка (%)</label>
                  <input
                    type="number"
                    value={creditRate}
                    onChange={(e) => setCreditRate(Number(e.target.value))}
                    step="0.1"
                    className="w-32 px-3 py-2 text-right border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Slider
                  value={[creditRate]}
                  onValueChange={(values) => setCreditRate(values[0])}
                  min={5}
                  max={30}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>5%</span>
                  <span>30%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Результаты расчета</h2>

          {activeCalculator === 'deposit' ? (
            <div className="space-y-6">
              {/* Total Profit */}
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-600 mb-1">Доход от вклада</p>
                <p className="text-4xl font-bold text-green-600">+{depositInterest.toLocaleString()} Br</p>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Начальная сумма</span>
                  <span className="font-medium text-gray-900">{depositInitial.toLocaleString()} Br</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Пополнения</span>
                  <span className="font-medium text-gray-900">{depositTopUpTotal.toLocaleString()} Br</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Итого на счете</span>
                    <span className="text-xl font-bold text-gray-900">{depositTotal.toLocaleString()} Br</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Срок вклада:</span>
                    <span className="text-sm font-medium text-gray-900">
                      12 мес (1 год 0 мес)
                    </span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Процентная ставка:</span>
                    <span className="text-sm font-medium text-gray-900">{depositRate}% годовых</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Эффективная доходность:</span>
                    <span className="text-sm font-medium text-green-600">{depositEffectiveRate}%</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowDepositModal(true)}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Открыть вклад
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Monthly Payment */}
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-600 mb-1">Ежемесячный платеж</p>
                <p className="text-4xl font-bold text-blue-600">{creditMonthlyPayment.toLocaleString()} Br</p>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Сумма кредита</span>
                  <span className="font-medium text-gray-900">{creditAmount.toLocaleString()} Br</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Переплата</span>
                  <span className="font-medium text-red-600">{creditOverpayment.toLocaleString()} Br</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Общая сумма выплат</span>
                    <span className="text-xl font-bold text-gray-900">{creditTotalPayment.toLocaleString()} Br</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Срок кредита:</span>
                    <span className="text-sm font-medium text-gray-900">
                      12 мес (1 год 0 мес)
                    </span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Процентная ставка:</span>
                    <span className="text-sm font-medium text-gray-900">{creditRate}% годовых</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Процент переплаты:</span>
                    <span className="text-sm font-medium text-red-600">{creditEffectiveRate}%</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                Отправить заявку на кредит
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Deposit Opening Modal */}
      {showDepositModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowDepositModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Открытие вклада</h2>
                <p className="text-sm text-gray-600 mt-1">Выберите клиента для открытия вклада</p>
              </div>
              <button
                onClick={() => setShowDepositModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="size-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Deposit Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Параметры вклада</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Сумма</p>
                    <p className="font-bold text-gray-900">{depositAmount.toLocaleString()} Br</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Срок</p>
                    <p className="font-bold text-gray-900">{depositTerm} мес</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Ставка</p>
                    <p className="font-bold text-blue-600">{depositRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Доход</p>
                    <p className="font-bold text-green-600">
                      +
                      {Math.round(
                        ((depositAmount + depositTopUp) * depositRate * depositTerm) / 1200
                      ).toLocaleString()}{' '}
                      Br
                    </p>
                  </div>
                </div>
              </div>

              {/* Client Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Поиск клиента
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type="text"
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Введите имя клиента..."
                  />
                </div>
              </div>

              {/* Clients List */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Выберите клиента *
                </label>
                <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
                  {filteredClients.length > 0 ? (
                    filteredClients.map((client) => (
                      <div
                        key={client.id}
                        onClick={() => setSelectedClient(client.id)}
                        className={`p-4 flex items-center gap-3 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 ${
                          selectedClient === client.id
                            ? 'bg-blue-50 border-l-4 border-l-blue-600'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="size-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-blue-600">{client.code}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{client.name}</p>
                          <p className="text-sm text-gray-500">{client.segment}</p>
                        </div>
                        {selectedClient === client.id && (
                          <div className="size-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-gray-500">Клиенты не найдены</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    if (selectedClient) {
                      const client = clients.find((c) => c.id === selectedClient);
                      alert(
                        `Вклад успешно открыт для клиента: ${client?.name}\n\nСумма: ${depositAmount.toLocaleString()} Br\nСрок: ${depositTerm} месяцев\nСтавка: ${depositRate}%`
                      );
                      setShowDepositModal(false);
                      setSelectedClient('');
                      setClientSearch('');
                    } else {
                      alert('Пожалуйста, выберите клиента');
                    }
                  }}
                  disabled={!selectedClient}
                  className={`flex-1 py-3.5 font-medium rounded-lg transition-colors ${
                    selectedClient
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Открыть вклад
                </button>
                <button
                  onClick={() => {
                    setShowDepositModal(false);
                    setSelectedClient('');
                    setClientSearch('');
                  }}
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
