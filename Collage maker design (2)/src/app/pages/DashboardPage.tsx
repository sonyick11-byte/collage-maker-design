import { useState } from 'react';
import { Users, Briefcase, DollarSign, FileText, TrendingUp, Clock, CheckCircle2, X } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

export function DashboardPage() {
  const { user } = useUser();
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');
  const [tasksList, setTasksList] = useState([
    {
      time: '14:00',
      text: 'Звонок клиенту Иванов И.П.',
      completed: false,
      icon: Clock,
      color: 'text-orange-600',
    },
    {
      time: '15:30',
      text: 'Оформление кредита Сидорова М.А.',
      completed: false,
      icon: Clock,
      color: 'text-orange-600',
    },
    {
      time: '16:00',
      text: 'Консультация по вкладам',
      completed: true,
      icon: CheckCircle2,
      color: 'text-green-600',
    },
  ]);

  const handleAddTask = () => {
    if (newTaskText && newTaskTime) {
      setTasksList([
        ...tasksList,
        {
          time: newTaskTime,
          text: newTaskText,
          completed: false,
          icon: Clock,
          color: 'text-orange-600',
        },
      ]);
      setNewTaskText('');
      setNewTaskTime('');
      setShowAddTask(false);
    }
  };

  const toggleTaskComplete = (index: number) => {
    const updatedTasks = [...tasksList];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    updatedTasks[index].icon = updatedTasks[index].completed ? CheckCircle2 : Clock;
    updatedTasks[index].color = updatedTasks[index].completed ? 'text-green-600' : 'text-orange-600';
    setTasksList(updatedTasks);
  };

  const stats = [
    {
      label: 'Всего клиентов',
      value: '1,245',
      change: '+12.3%',
      positive: true,
      icon: Users,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Активные продукты',
      value: '3,892',
      change: '+8.2%',
      positive: true,
      icon: Briefcase,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      label: 'Выручка за месяц',
      value: 'Br 12.4М',
      change: '+15.3%',
      positive: true,
      icon: DollarSign,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      label: 'Заявки в работе',
      value: '47',
      change: '-3.1%',
      positive: false,
      icon: FileText,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
  ];

  const recentClients = [
    {
      id: 'ИИП',
      name: 'Иванов Иван Петрович',
      phone: '+375 (29) 123-45-67',
      balance: '5 420 000 Br',
      segment: 'VIP',
      segmentColor: 'bg-purple-100 text-purple-700',
    },
    {
      id: 'СМА',
      name: 'Сидорова Мария Александровна',
      phone: '+375 (44) 234-56-78',
      balance: '1 250 000 Br',
      segment: 'Премиум',
      segmentColor: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'КДС',
      name: 'Козлов Дмитрий Сергеевич',
      phone: '+375 (33) 345-67-89',
      balance: '350 000 Br',
      segment: 'Стандарт',
      segmentColor: 'bg-gray-100 text-gray-700',
    },
    {
      id: 'ПЕВ',
      name: 'Петрова Елена Викторовна',
      phone: '+375 (25) 456-78-90',
      balance: '980 000 Br',
      segment: 'Премиум',
      segmentColor: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'САН',
      name: 'Смирнов Алексей Николаевич',
      phone: '+375 (29) 567-89-01',
      balance: '7 300 000 Br',
      segment: 'VIP',
      segmentColor: 'bg-purple-100 text-purple-700',
    },
  ];


  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Панель управления</h1>
        <p className="text-sm text-gray-600 mt-1">
          Добро пожаловать, {user?.fullName || 'Пользователь'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`size-6 ${stat.iconColor}`} />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp
                    className={`size-4 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}
                    style={{ transform: stat.positive ? 'none' : 'rotate(180deg)' }}
                  />
                  <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Clients */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Последние клиенты</h2>
            <a href="/clients" className="text-sm text-blue-600 hover:text-blue-700">
              Все клиенты →
            </a>
          </div>
          <div className="divide-y divide-gray-100">
            {recentClients.map((client, index) => (
              <div key={index} className="p-5 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="size-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-blue-600">{client.id}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${client.segmentColor}`}>
                        {client.segment}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{client.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{client.balance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks for Today */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Задачи на сегодня</h2>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {tasksList.map((task, index) => {
                const Icon = task.icon;
                return (
                  <div
                    key={index}
                    className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg -mx-2 transition-colors"
                    onClick={() => toggleTaskComplete(index)}
                  >
                    <Icon className={`size-5 flex-shrink-0 ${task.color}`} />
                    <div className="flex-1">
                      <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                        {task.text}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{task.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {showAddTask && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
                <input
                  type="time"
                  value={newTaskTime}
                  onChange={(e) => setNewTaskTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Время"
                />
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Описание задачи"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddTask}
                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Добавить
                  </button>
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            )}

            {!showAddTask && (
              <button
                onClick={() => setShowAddTask(true)}
                className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + Добавить задачу
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
