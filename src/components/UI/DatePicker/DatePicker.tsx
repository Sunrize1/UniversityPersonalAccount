import React, { useState, useRef, useEffect, ReactElement } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { DatePickerProps } from '../../../types/components/UI/datePicker';
import CalendarIcon from '../../../assets/icons/Icon/Interface/black/Date.svg?react';
import styles from './DatePicker.module.css';

import ChevronLeftIcon from '../../../assets/icons/Arrow/black/Chevron_Left_MD.svg?react';
import ChevronRightIcon from '../../../assets/icons/Arrow/black/Chevron_Right_MD.svg?react';

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  placeholder = '',
  name,
  className
}) => {
  const intl = useIntl();
  
  const MONTHS = [
    intl.formatMessage({ id: 'monthJanuary' }),
    intl.formatMessage({ id: 'monthFebruary' }),
    intl.formatMessage({ id: 'monthMarch' }),
    intl.formatMessage({ id: 'monthApril' }),
    intl.formatMessage({ id: 'monthMay' }),
    intl.formatMessage({ id: 'monthJune' }),
    intl.formatMessage({ id: 'monthJuly' }),
    intl.formatMessage({ id: 'monthAugust' }),
    intl.formatMessage({ id: 'monthSeptember' }),
    intl.formatMessage({ id: 'monthOctober' }),
    intl.formatMessage({ id: 'monthNovember' }),
    intl.formatMessage({ id: 'monthDecember' })
  ];

  const WEEKDAYS = [
    intl.formatMessage({ id: 'weekdayMonday' }),
    intl.formatMessage({ id: 'weekdayTuesday' }),
    intl.formatMessage({ id: 'weekdayWednesday' }),
    intl.formatMessage({ id: 'weekdayThursday' }),
    intl.formatMessage({ id: 'weekdayFriday' }),
    intl.formatMessage({ id: 'weekdaySaturday' }),
    intl.formatMessage({ id: 'weekdaySunday' })
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(value || null);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowMonthPicker(false);
        setShowYearPicker(false);
        setTempSelectedDate(selectedDate); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedDate]);

  useEffect(() => {
    setSelectedDate(value || null);
    setTempSelectedDate(value || null);
  }, [value]);

  const toggleCalendar = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setShowMonthPicker(false);
      setShowYearPicker(false);
      if (!isOpen && selectedDate) {
        setCurrentMonth(selectedDate.getMonth());
        setCurrentYear(selectedDate.getFullYear());
      }
    }
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePreviousYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const handleNextYear = () => {
    setCurrentYear(currentYear + 1);
  };

  const handleDateClick = (date: Date) => {
    setTempSelectedDate(date);
  };

  const handleOk = () => {
    setSelectedDate(tempSelectedDate);
    onChange(tempSelectedDate);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempSelectedDate(selectedDate);
    setIsOpen(false);
  };

  const handleMonthSelect = (monthIndex: number) => {
    setCurrentMonth(monthIndex);
    setShowMonthPicker(false);
  };

  const handleYearSelect = (year: number) => {
    setCurrentYear(year);
    setShowYearPicker(false);
  };

  const generateYearRange = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear - 50; year <= currentYear + 50; year++) {
      years.push(year);
    }
    return years;
  };

  const renderWeekdaysHeader = () => {
    return (
      <div className={styles.weekdaysHeader}>
        {WEEKDAYS.map((weekday) => (
          <div key={weekday} className={styles.weekday}>
            <span className={styles.weekdayText}>{weekday}</span>
          </div>
        ))}
      </div>
    );
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number): number => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInPrevMonth = getDaysInMonth(
      currentMonth === 0 ? 11 : currentMonth - 1,
      currentMonth === 0 ? currentYear - 1 : currentYear
    );

    const days: ReactElement[] = [];
    const today = new Date();
    
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const date = new Date(
        currentMonth === 0 ? currentYear - 1 : currentYear,
        currentMonth === 0 ? 11 : currentMonth - 1,
        day
      );
      
      days.push(
        <div key={`prev-${day}`} className={styles.day} onClick={() => handleDateClick(date)}>
          <div className={styles.dayContainer}>
            <span className={`${styles.dateText} ${styles.otherMonth}`}>{day}</span>
          </div>
        </div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = 
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
      
      const isSelected = 
        selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();

      const isTempSelected = 
        tempSelectedDate &&
        date.getDate() === tempSelectedDate.getDate() &&
        date.getMonth() === tempSelectedDate.getMonth() &&
        date.getFullYear() === tempSelectedDate.getFullYear();

      const isActive = !isSelected && isTempSelected;

      let containerClasses = [styles.dayContainer];
      let textClasses = [styles.dateText];

      if (isSelected) {
        containerClasses.push(styles.selected);
        textClasses.push(styles.selected);
      } else if (isActive) {
        containerClasses.push(styles.active);
        textClasses.push(styles.active);
      } else if (isToday) {
        containerClasses.push(styles.today);
      }

      days.push(
        <div key={`current-${day}`} className={styles.day} onClick={() => handleDateClick(date)}>
          <div className={containerClasses.join(' ')}>
            <span className={textClasses.join(' ')}>{day}</span>
          </div>
        </div>
      );
    }

    const totalCells = 42; 
    const remainingCells = totalCells - days.length;
    
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(
        currentMonth === 11 ? currentYear + 1 : currentYear,
        currentMonth === 11 ? 0 : currentMonth + 1,
        day
      );
      
      days.push(
        <div key={`next-${day}`} className={styles.day} onClick={() => handleDateClick(date)}>
          <div className={styles.dayContainer}>
            <span className={`${styles.dateText} ${styles.otherMonth}`}>{day}</span>
          </div>
        </div>
      );
    }

    const weeks: ReactElement[] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(
        <div key={`week-${i / 7}`} className={styles.dayRow}>
          {days.slice(i, i + 7)}
        </div>
      );
    }

    return weeks;
  };

  return (
    <div className={`${styles.container} ${className ? className : ''}`} ref={containerRef}>
      <div className={styles.input} onClick={toggleCalendar}>
        <label className={styles.labelText}>
          <FormattedMessage id={label} />
        </label>
        <div className={styles.stateLayer}>
          <div className={styles.content}>
            <input
              type="text"
              className={styles.inputText}
              value={formatDate(isOpen ? tempSelectedDate : selectedDate)}
              placeholder={intl.formatMessage( {id: placeholder}) }
              readOnly
              disabled={disabled}
              name={name}
            />
          </div>
          <CalendarIcon className={styles.calendarIcon} />
        </div>
      </div>

      <div className={`${styles.calendar} ${!isOpen ? styles.hidden : ''}`}>
        <div className={styles.calendarHeader}>
          <div className={styles.monthNavigation}>
            <ChevronLeftIcon 
              className={styles.navigationArrow} 
              onClick={handlePreviousMonth}
            />
            <span 
              className={`${styles.monthText} ${showMonthPicker ? styles.activeSelector : ''}`}
              onClick={() => {
                setShowMonthPicker(!showMonthPicker);
                setShowYearPicker(false);
              }}
            >
              {MONTHS[currentMonth]}
            </span>
            <ChevronRightIcon 
              className={styles.navigationArrow} 
              onClick={handleNextMonth}
            />
          </div>
          <div className={styles.yearNavigation}>
            <ChevronLeftIcon 
              className={styles.navigationArrow} 
              onClick={handlePreviousYear}
            />
            <span 
              className={`${styles.yearText} ${showYearPicker ? styles.activeSelector : ''}`}
              onClick={() => {
                setShowYearPicker(!showYearPicker);
                setShowMonthPicker(false);
              }}
            >
              {currentYear}
            </span>
            <ChevronRightIcon 
              className={styles.navigationArrow} 
              onClick={handleNextYear}
            />
          </div>
        </div>

        <div className={styles.separator} />

        {showMonthPicker ? (
          <div className={styles.pickerMenu}>
            <div className={styles.menuList}>
              {MONTHS.map((month, index) => (
                <div key={month} className={styles.menuItem} onClick={() => handleMonthSelect(index)}>
                  <div className={styles.menuItemContent}>
                    <span className={styles.menuItemText}>{month}</span>
                  </div>
                  {index < MONTHS.length - 1 && <div className={styles.menuItemSeparator} />}
                </div>
              ))}
            </div>
          </div>
        ) : showYearPicker ? (
          <div className={styles.pickerMenu}>
            <div className={styles.menuList}>
              {generateYearRange().map((year) => (
                <div key={year} className={styles.menuItem} onClick={() => handleYearSelect(year)}>
                  <div className={styles.menuItemContent}>
                    <span className={styles.menuItemText}>{year}</span>
                  </div>
                  <div className={styles.menuItemSeparator} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.calendarGrid}>
            {renderWeekdaysHeader()}
            {renderCalendarDays()}
          </div>
        )}

        <div className={styles.actions}>
          <button className={`${styles.actionButton} ${styles.okButton}`} onClick={handleOk}>
            <FormattedMessage id="datePickerOk" />
          </button>
          <button className={`${styles.actionButton} ${styles.cancelButton}`} onClick={handleCancel}>
            <FormattedMessage id="datePickerCancel" />
          </button>
        </div>
      </div>
    </div>
  );
}; 