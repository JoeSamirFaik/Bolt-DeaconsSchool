import React from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import Select from 'react-select';
import { AcademicYear } from '../../../types/user';

const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: '44px',
    border: state.isFocused ? '2px solid #f59e0b' : '1px solid #d1d5db',
    borderRadius: '12px',
    boxShadow: state.isFocused ? '0 0 0 3px rgba(245, 158, 11, 0.1)' : 'none',
    '&:hover': {
      borderColor: '#f59e0b'
    },
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif'
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? '#f59e0b' 
      : state.isFocused 
        ? '#fef3c7' 
        : 'white',
    color: state.isSelected ? 'white' : '#374151',
    padding: '10px 14px',
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif',
    textAlign: 'right' as const,
    '&:hover': {
      backgroundColor: state.isSelected ? '#f59e0b' : '#fef3c7'
    }
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#9ca3af',
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif',
    textAlign: 'right' as const
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#374151',
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif',
    textAlign: 'right' as const
  })
};

interface UserManagementFiltersProps {
  activeTab: 'users' | 'assignments';
  selectedRole: string;
  selectedYear: string;
  academicYears: AcademicYear[];
  onRoleChange: (role: string) => void;
  onYearChange: (year: string) => void;
}

const UserManagementFilters: React.FC<UserManagementFiltersProps> = ({
  activeTab,
  selectedRole,
  selectedYear,
  academicYears,
  onRoleChange,
  onYearChange
}) => {
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'deacon': return 'شماس';
      case 'servant': return 'خادم';
      case 'parent': return 'ولي أمر';
      case 'admin': return 'مدير';
      default: return role;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse mb-4">
        <FunnelIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 font-cairo">تصفية البيانات</h3>
      </div>
      
      <div className="space-y-4">
        {activeTab === 'users' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              نوع المستخدم
            </label>
            <Select
              value={selectedRole ? { value: selectedRole, label: getRoleLabel(selectedRole) } : null}
              onChange={(option) => onRoleChange(option ? option.value : '')}
              options={[
                { value: '', label: '-- جميع المستخدمين --' },
                { value: 'deacon', label: 'شماس' },
                { value: 'servant', label: 'خادم' },
                { value: 'parent', label: 'ولي أمر' }
              ]}
              styles={customSelectStyles}
              placeholder="-- اختر نوع المستخدم --"
              isSearchable={false}
              isClearable
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              السنة الأكاديمية
            </label>
            <Select
              value={selectedYear ? { value: selectedYear, label: selectedYear } : null}
              onChange={(option) => onYearChange(option ? option.value : '')}
              options={[
                { value: '', label: '-- جميع السنوات --' },
                ...academicYears.map(year => ({ value: year.year, label: year.year }))
              ]}
              styles={customSelectStyles}
              placeholder="-- اختر السنة الأكاديمية --"
              isSearchable={false}
              isClearable
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementFilters;