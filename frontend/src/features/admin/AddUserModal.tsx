import React, { useState } from 'react';
import { useI18n } from '../../i18n';
import { Role, AdminUserItem } from '../../types';
import {
  X,
  UserPlus,
  Shield,
  Mail,
  User,
  Phone,
  CheckCircle,
  Building,
  Calendar,
  Ticket,
} from 'lucide-react';
import clsx from 'clsx';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (userData: Omit<AdminUserItem, 'id' | 'joinedDate'>) => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onAddUser }) => {
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [role, setRole] = useState<Role>('attendee');
  const [name, setName] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [active, setActive] = useState(true);
  const [avatar] = useState(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  );

  if (!isOpen) return null;

  const roleOptions: {
    id: Role;
    labelEn: string;
    labelAr: string;
    descEn: string;
    descAr: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }[] = [
    {
      id: 'attendee',
      labelEn: 'Attendee',
      labelAr: 'حاضر / جمهور',
      descEn: 'Can discover events, buy tickets and check in',
      descAr: 'استكشاف الفعاليات وحجز التذاكر واستخدام الـ QR',
      icon: Ticket,
      color: 'border-slate-300 text-slate-800 bg-slate-50',
    },
    {
      id: 'organizer',
      labelEn: 'Organizer',
      labelAr: 'منظم فعاليات',
      descEn: 'Can publish events, issue RFQs and view ticket sales',
      descAr: 'نشر الفعاليات، طرح طلبات الـ RFQ ومتابعة المبيعات',
      icon: Calendar,
      color: 'border-blue-300 text-blue-700 bg-blue-50/50',
    },
    {
      id: 'vendor',
      labelEn: 'B2B Vendor',
      labelAr: 'شركة تنفيذ / مورد',
      descEn: 'Can submit KYC, quote RFQs and fulfill equipment contracts',
      descAr: 'رفع وثائق التوثيق، تقديم عروض الأسعار وتجهيز المعدات',
      icon: Building,
      color: 'border-purple-300 text-purple-700 bg-purple-50/50',
    },
    {
      id: 'admin',
      labelEn: 'Administrator',
      labelAr: 'مشرف عام / حوكمة',
      descEn: 'Full governance, moderation and telemetry controls',
      descAr: 'صلاحيات الحوكمة الكاملة ومراجعة الطوابير والسياسات',
      icon: Shield,
      color: 'border-slate-900 text-slate-900 bg-slate-100',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    onAddUser({
      name: name.trim(),
      nameAr: nameAr.trim() || name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim() || '+20 100 000 0000',
      avatar,
      role,
      active,
      eventsCount: role === 'organizer' ? 0 : undefined,
      bookingsCount: role === 'attendee' ? 0 : undefined,
      rfqsCount: role === 'vendor' ? 0 : undefined,
      spentOrEarned: '0 EGP',
      auditLog: [
        {
          id: `LOG-${Date.now()}`,
          action: 'Account Created',
          actionAr: 'إنشاء الحساب وتعيين الدور',
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
          details: `Provisioned by Super Admin with role: ${role}`,
          detailsAr: `تم إنشاء الحساب بواسطة المشرف العام بالدور: ${role}`,
          actor: 'Super Admin',
        },
      ],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
              <UserPlus className="size-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                {isAr ? 'إضافة مستخدم جديد للمنظومة' : 'Create & Provision New User'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {isAr
                  ? 'حدد الدور المطلوب وأدخل بيانات الحساب والصلاحيات الأساسية'
                  : 'Assign role permissions and basic user credentials'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Role Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              {isAr ? 'اختر دور المستخدم والصلاحية *' : 'Select User Role & Permissions *'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {roleOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = role === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRole(opt.id)}
                    className={clsx(
                      'flex items-start gap-3 p-3 rounded-xl border text-start transition',
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    )}
                  >
                    <div
                      className={clsx(
                        'size-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5',
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      )}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">
                        {isAr ? opt.labelAr : opt.labelEn}
                      </div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        {isAr ? opt.descAr : opt.descEn}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {isAr ? 'الاسم بالإنجليزية (Name in English) *' : 'Full Name (English) *'}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Tarek El-Sayed"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 ps-9 pe-3 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {isAr ? 'الاسم بالعربية (الاسم الثلاثي)' : 'Name in Arabic'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  placeholder="مثال: د. طارق السيد"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 px-3 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
                />
              </div>
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {isAr ? 'البريد الإلكتروني *' : 'Email Address *'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 ps-9 pe-3 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {isAr ? 'رقم الهاتف المحمول' : 'Phone Number'}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+20 100 123 4567"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 ps-9 pe-3 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
                />
              </div>
            </div>
          </div>

          {/* Status Toggle */}
          <div className="pt-2">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer">
              <div className="space-y-0.5">
                <span className="font-bold text-xs text-slate-900 block">
                  {isAr ? 'حالة الحساب المبدئية (نشط / معلق):' : 'Initial Account Status:'}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  {active
                    ? isAr
                      ? 'الحساب مفعل فوراً ويمكن للمستخدم تسجيل الدخول'
                      : 'Account active immediately and allowed to authenticate'
                    : isAr
                      ? 'الحساب مجمد إدارياً بانتظار التحقق'
                      : 'Account created in suspended state pending audit'}
                </span>
              </div>
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="size-4 rounded text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2 text-xs font-bold text-white transition shadow-xs"
            >
              <CheckCircle className="size-4" />
              <span>{isAr ? 'إضافة المستخدم واعتماد الحساب' : 'Create & Provision Account'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};