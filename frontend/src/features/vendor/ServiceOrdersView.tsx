import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { VendorServiceOrderItem, ServiceOrderStatus } from '../../types';
import { OrderExecutionModal } from './OrderExecutionModal';
import {
  TrendingUp,
  Search,
  Calendar,
  MapPin,
  Phone,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import clsx from 'clsx';

export const ServiceOrdersView: React.FC = () => {
  const { vendorOrders, selectedVendorOrderId, setSelectedVendorOrderId } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState<'ALL' | ServiceOrderStatus>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<VendorServiceOrderItem | null>(null);

  // Auto-open if selected from Overview
  React.useEffect(() => {
    if (selectedVendorOrderId) {
      const found = vendorOrders.find((o) => o.id === selectedVendorOrderId);
      if (found) {
        setSelectedOrder(found);
        setIsModalOpen(true);
      }
    }
  }, [selectedVendorOrderId, vendorOrders]);

  const filteredOrders = vendorOrders.filter((order) => {
    const matchesTab = activeTab === 'ALL' || order.status === activeTab;
    const matchesSearch =
      order.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.eventTitleAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.organizerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.venueCity.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleOpenExecution = (order: VendorServiceOrderItem) => {
    setSelectedOrder(order);
    setSelectedVendorOrderId(order.id);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <TrendingUp className="size-6 text-[#2563EB]" />
            <span>{isAr ? 'أوامر وعمليات التنفيذ المسندة' : 'Service Orders & Execution Hub'}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isAr
              ? 'متابعة الفعاليات المتعاقد عليها وتحديث مراحل التسليم والتشغيل الميداني (V12 / V13)'
              : 'Manage active contracts, deliverable milestones, and on-site operation handover'}
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-soft">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isAr ? 'البحث برقم الأمر، الفعالية، المدينة...' : 'Search by order #, event, city...'}
            className="w-full rounded-xl bg-slate-50 ps-9 pe-4 py-2 text-xs border border-transparent focus:border-[#2563EB] focus:bg-white focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto py-1">
          {(
            [
              { id: 'ALL', labelEn: 'All Orders', labelAr: 'الكل' },
              { id: 'IN_PROGRESS', labelEn: 'In Progress', labelAr: 'جاري التنفيذ' },
              { id: 'COMPLETED', labelEn: 'Completed', labelAr: 'مكتمل' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-semibold transition',
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              {isAr ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft hover:shadow-md transition space-y-4"
          >
            {/* Top Row: Order Code + Status Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full">
                  {order.orderNumber}
                </span>
                <span
                  className={clsx(
                    'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold border',
                    order.status === 'COMPLETED'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  )}
                >
                  {order.status === 'COMPLETED' ? (
                    <CheckCircle2 className="size-3 text-emerald-600" />
                  ) : (
                    <Clock className="size-3 text-blue-600 animate-pulse" />
                  )}
                  <span>
                    {isAr
                      ? order.status === 'COMPLETED'
                        ? 'مكتمل ومعتمد'
                        : 'جاري العمل والتنفيذ'
                      : order.status}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="size-3.5 text-slate-400" />
                <span>
                  {isAr ? 'موعد الفعالية:' : 'Event Date:'}{' '}
                  {new Date(order.eventDate).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {/* Event & Organizer Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  {isAr ? order.eventTitleAr : order.eventTitle}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5 text-slate-400" />
                    <span>{order.venueName}, {order.venueCity}</span>
                  </span>
                  <span>•</span>
                  <span>{isAr ? 'المنظم:' : 'Organizer:'} <strong className="text-slate-800">{order.organizerName}</strong></span>
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Phone className="size-3 text-slate-400" />
                    <span>{order.organizerPhone}</span>
                  </span>
                </div>
              </div>

              <div className="text-start lg:text-end shrink-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {isAr ? 'قيمة العقد الإجمالية' : 'Contract Value'}
                </span>
                <span className="text-lg font-black text-slate-900 font-mono">
                  {order.contractValue.toLocaleString()}{' '}
                  <span className="text-xs font-bold text-slate-500">{isAr ? 'ج.م' : 'EGP'}</span>
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold block">
                  {isAr ? 'تم استلام الدفعة الأولى' : 'Advance deposit received'}
                </span>
              </div>
            </div>

            {/* Progress Slider Display */}
            <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">
                  {isAr ? 'مراحل الإنجاز والتسليم (Milestones):' : 'Milestones Completed:'}{' '}
                  <span className="text-slate-500">
                    ({order.milestones.filter((m) => m.isCompleted).length} / {order.milestones.length})
                  </span>
                </span>
                <span className="font-mono font-bold text-slate-900">{order.progressPercent}%</span>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all"
                  style={{ width: `${order.progressPercent}%` }}
                />
              </div>

              {/* Milestones chips preview */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {order.milestones.map((m) => (
                  <span
                    key={m.id}
                    className={clsx(
                      'text-[10px] font-medium px-2 py-0.5 rounded-md border',
                      m.isCompleted
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 line-through'
                        : 'bg-white text-slate-600 border-slate-200'
                    )}
                  >
                    {isAr ? m.titleAr : m.title}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-400">
                {order.notes.length} {isAr ? 'ملاحظات تشغيلية مسجلة' : 'operational notes'}
              </span>

              <button
                onClick={() => handleOpenExecution(order)}
                className="flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 text-xs transition shadow-soft"
              >
                <span>{isAr ? 'إدارة مراحل التنفيذ' : 'Manage Milestones & Execution'}</span>
                <ArrowRight className="size-3.5 rtl:rotate-180" />
              </button>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center space-y-3">
            <TrendingUp className="size-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">
              {isAr ? 'لا توجد أوامر تشغيل مطابقة' : 'No service orders found'}
            </h4>
          </div>
        )}
      </div>

      {/* Execution Modal */}
      <OrderExecutionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedVendorOrderId(null);
        }}
        order={selectedOrder}
      />
    </div>
  );
};
