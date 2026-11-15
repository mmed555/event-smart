import React, { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import clsx from 'clsx';
import { useI18n } from '../../i18n';

export interface SelectOption {
  value: string;
  label: string;
  labelAr?: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: 'default' | 'ghost' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  menuClassName?: string;
  align?: 'start' | 'end';
  id?: string;
  'aria-label'?: string;
}

/**
 * Impeccable Custom Select component
 * Provides high-end styling, smooth chevron animation, full keyboard navigation,
 * and zero reliance on OS-native select controls.
 */
export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  icon: LeadingIcon,
  variant = 'default',
  size = 'md',
  disabled = false,
  className,
  menuClassName,
  align = 'start',
  id,
  'aria-label': ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const selectId = id || generatedId;
  const { language } = useI18n();

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown on click outside
  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handlePointerDown);
      document.addEventListener('touchstart', handlePointerDown);
    }

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'Escape') {
      setIsOpen(false);
      e.stopPropagation();
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      const currentIndex = options.findIndex((opt) => opt.value === value);
      const nextOption = options[currentIndex + 1] || options[0];
      if (nextOption && !nextOption.disabled) {
        onChange(nextOption.value);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      const currentIndex = options.findIndex((opt) => opt.value === value);
      const prevOption = options[currentIndex - 1] || options[options.length - 1];
      if (prevOption && !prevOption.disabled) {
        onChange(prevOption.value);
      }
    }
  };

  const displayLabel = selectedOption
    ? (language === 'ar' && selectedOption.labelAr ? selectedOption.labelAr : selectedOption.label)
    : placeholder || '';

  // Trigger size styles
  const sizeClasses = {
    sm: 'text-xs py-1.5 px-2.5 rounded-lg gap-1.5',
    md: 'text-xs sm:text-sm py-2 px-3 rounded-xl gap-2',
    lg: 'text-sm py-2.5 px-4 rounded-xl gap-2.5',
  }[size];

  // Trigger variant styles
  const variantClasses = {
    default:
      'border border-slate-200/90 bg-white text-slate-700 shadow-xs hover:border-slate-300 hover:bg-slate-50/50 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15',
    ghost:
      'border-0 bg-transparent text-slate-700 hover:bg-slate-100/70 focus:bg-slate-100/70',
    minimal:
      'border-0 bg-transparent text-slate-800 font-semibold p-0 hover:text-[#2563EB] focus:text-[#2563EB]',
  }[variant];

  return (
    <div
      ref={containerRef}
      className={clsx('relative inline-block text-start select-none', className)}
    >
      {/* Trigger Button */}
      <button
        id={selectId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={clsx(
          'flex items-center justify-between font-semibold transition-all duration-200 focus:outline-none cursor-pointer',
          sizeClasses,
          variantClasses,
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
        )}
      >
        <span className="flex items-center gap-2 truncate">
          {LeadingIcon && (
            <LeadingIcon className="size-4 shrink-0 text-slate-400 group-hover:text-slate-600 transition-colors" />
          )}
          <span className="truncate">{displayLabel}</span>
        </span>

        {/* Animated Chevron */}
        <ChevronDown
          className={clsx(
            'size-3.5 shrink-0 text-slate-400 transition-transform duration-200 ms-1.5',
            isOpen && 'rotate-180 text-[#2563EB]'
          )}
        />
      </button>

      {/* Floating Menu Portal / Dropdown Popover */}
      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          aria-labelledby={selectId}
          className={clsx(
            'absolute z-50 mt-1.5 min-w-[200px] w-max max-w-[320px] rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-1.5 shadow-2xl shadow-slate-900/10 anim-page overflow-hidden',
            align === 'end' ? 'end-0' : 'start-0',
            menuClassName
          )}
        >
          <div className="max-h-60 overflow-y-auto space-y-0.5 [scrollbar-width:thin] scrollbar-thumb-slate-200">
            {options.map((option) => {
              const isSelected = option.value === value;
              const OptionIcon = option.icon;
              const optionLabel =
                language === 'ar' && option.labelAr ? option.labelAr : option.label;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={option.disabled}
                  onClick={() => {
                    if (!option.disabled) {
                      onChange(option.value);
                      setIsOpen(false);
                    }
                  }}
                  className={clsx(
                    'w-full flex items-center justify-between rounded-xl px-3 py-2 text-start text-xs sm:text-sm font-medium transition-all duration-150',
                    isSelected
                      ? 'bg-[#EFF6FF] text-[#2563EB] font-bold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900',
                    option.disabled &&
                      'opacity-40 cursor-not-allowed hover:bg-transparent'
                  )}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {OptionIcon && (
                      <OptionIcon
                        className={clsx(
                          'size-4 shrink-0',
                          isSelected ? 'text-[#2563EB]' : 'text-slate-400'
                        )}
                      />
                    )}
                    <div className="truncate">
                      <div className="truncate">{optionLabel}</div>
                      {option.description && (
                        <div className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                          {option.description}
                        </div>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="size-4 shrink-0 text-[#2563EB] ms-3" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
