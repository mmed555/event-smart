import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { Role } from '../../types';
import { AdminTableSkeleton } from '../../components/ui/Skeleton';
import { UserDetailsModal } from './UserDetailsModal';
import { AddUserModal } from './AddUserModal';
import {
  Search,
  CheckCircle,
  XCircle,
  Shield,
  Eye,
  Calendar,
  UserPlus,
} from 'lucide-react';
import clsx from 'clsx';

export const UsersListView: React.FC = () => {
  const { adminUsers, toggleUserStatus, addAdminUser, isLoading } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [roleFilter, setRoleFilter] = useState<'all' | Role>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectUserId, setInspectUserId] = useState<string | null>(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  if (isLoading) {
    return <AdminTableSkeleton rows={8} filterPillsCount={4} />;
  }

  const filteredUsers = useMemo(() => {
    return adminUsers.filter((u) => {
      if (roleFilter !== 'all' && u.role !== roleFilter) return false;
      if (statusFilter === 'active' && !u.active) return false;
      if (statusFilter === 'suspended' && u.active) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = u.name.toLowerCase().includes(q) || (u.nameAr && u.nameAr.includes(q));
        const matchEmail = u.email.toLowerCase().includes(q);
        const matchPhone = u.phone && u.phone.includes(q);
        if (!matchName && !matchEmail && !matchPhone) return false;
      }
      return true;
    });
  }, [adminUsers, roleFilter, statusFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Filter Toolbar */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'البحث بالاسم، البريد أو الهاتف...' : 'Search by name, email, or phone...'}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 ps-10 pe-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
            />
          </div>

          {/* Status Filters & Add User Button */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setStatusFilter('all')}
                className={clsx(
                  'rounded-lg px-3 py-1.5 text-xs font-bold transition',
                  statusFilter === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                {isAr ? 'كل الحالات' : 'All Statuses'}
              </button>
              <button
                onClick={() => setStatusFilter('active')}
                className={clsx(
                  'flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition',
                  statusFilter === 'active'
                    ? 'bg-emerald-600 text-white'
                    : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                )}
              >
                <CheckCircle className="size-3" />
                {isAr ? 'النشطة' : 'Active'}
              </button>
              <button
                onClick={() => setStatusFilter('suspended')}
                className={clsx(
                  'flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition',
                  statusFilter === 'suspended'
                    ? 'bg-red-600 text-white'
                    : 'text-red-700 bg-red-50 hover:bg-red-100'
                )}
              >
                <XCircle className="size-3" />
                {isAr ? 'المجمدة' : 'Suspended'}
              </button>
            </div>

            <button
              onClick={() => setIsAddUserModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 text-xs font-bold transition shadow-xs shrink-0 ms-auto"
            >
              <UserPlus className="size-3.5" />
              <span>{isAr ? 'إضافة مستخدم جديد' : 'Add New User'}</span>
            </button>
          </div>
        </div>

        {/* Role Tabs */}
        <div className="flex items-center gap-1.5 border-t border-slate-100 pt-3 overflow-x-auto">
          {(['all', 'attendee', 'organizer', 'vendor', 'admin'] as const).map((r) => {
            const count = r === 'all' ? adminUsers.length : adminUsers.filter((u) => u.role === r).length;
            const labels = {
              all: { en: 'All Roles', ar: 'كل الأدوار' },
              attendee: { en: 'Attendees', ar: 'الجمهور والحضور' },
              organizer: { en: 'Organizers', ar: 'منظمو الفعاليات' },
              vendor: { en: 'B2B Vendors', ar: 'شركات التنفيذ' },
              admin: { en: 'Administrators', ar: 'المشرفون' },
            };
            const isSelected = roleFilter === r;

            return (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={clsx(
                  'flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-bold transition shrink-0',
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                <span>{isAr ? labels[r].ar : labels[r].en}</span>
                <span
                  className={clsx(
                    'rounded-md px-1.5 py-0.5 text-[10px] font-mono font-bold',
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-600'
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-black uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3.5">{isAr ? 'المستخدم' : 'User'}</th>
                <th className="px-4 py-3.5">{isAr ? 'الدور والصلاحية' : 'Role'}</th>
                <th className="px-4 py-3.5">{isAr ? 'الحالة' : 'Status'}</th>
                <th className="px-4 py-3.5">{isAr ? 'النشاط' : 'Activity'}</th>
                <th className="px-4 py-3.5">{isAr ? 'تاريخ التسجيل' : 'Registered'}</th>
                <th className="px-5 py-3.5 text-end">{isAr ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                    {isAr ? 'لا يوجد مستخدمين مطابقين لمعايير البحث' : 'No users match the selected filters'}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                          alt={u.name}
                          className="size-9 rounded-xl object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            {isAr ? u.nameAr || u.name : u.name}
                            <span className="font-mono text-[10px] text-slate-400">({u.id})</span>
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={clsx(
                          'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold',
                          u.role === 'organizer' && 'bg-blue-50 text-blue-700 border border-blue-200/60',
                          u.role === 'vendor' && 'bg-purple-50 text-purple-700 border border-purple-200/60',
                          u.role === 'attendee' && 'bg-slate-100 text-slate-700 border border-slate-200',
                          u.role === 'admin' && 'bg-slate-900 text-white'
                        )}
                      >
                        <Shield className="size-3" />
                        {u.role}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={clsx(
                          'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold',
                          u.active
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        )}
                      >
                        {u.active ? (
                          <>
                            <CheckCircle className="size-3" /> {isAr ? 'نشط' : 'Active'}
                          </>
                        ) : (
                          <>
                            <XCircle className="size-3" /> {isAr ? 'مجمّد' : 'Suspended'}
                          </>
                        )}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="text-[11px] font-semibold text-slate-700">
                        {u.role === 'organizer' && `${u.eventsCount || 0} events`}
                        {u.role === 'vendor' && `${u.rfqsCount || 0} quotes`}
                        {u.role === 'attendee' && `${u.bookingsCount || 0} bookings`}
                        {u.role === 'admin' && 'Admin Governance'}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">{u.spentOrEarned || ''}</div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                        <Calendar className="size-3 text-slate-400" />
                        {u.joinedDate}
                      </div>
                    </td>

                    <td className="px-5 py-3.5 text-end">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setInspectUserId(u.id)}
                          className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition"
                          title="View User Dossier"
                        >
                          <Eye className="size-3.5 text-slate-500" />
                          <span>{isAr ? 'الملف الإداري' : 'Dossier'}</span>
                        </button>

                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className={clsx(
                            'rounded-lg px-2.5 py-1 text-[11px] font-bold transition',
                            u.active
                              ? 'text-red-600 hover:bg-red-50 border border-red-200/70'
                              : 'text-emerald-700 hover:bg-emerald-50 border border-emerald-200/70'
                          )}
                        >
                          {u.active ? (isAr ? 'تجميد' : 'Suspend') : (isAr ? 'تنشيط' : 'Activate')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Dossier Modal */}
      <UserDetailsModal
        userId={inspectUserId}
        onClose={() => setInspectUserId(null)}
      />

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAddUser={(userData) => addAdminUser(userData)}
      />
    </div>
  );
};
