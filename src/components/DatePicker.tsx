import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateSelect,
  minDate = new Date(),
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3)),
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week the month starts on (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateDisabled = (date: Date) => {
    return date < minDate || date > maxDate;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    
    return date.getDate() === selectedDate.getDate() && 
           date.getMonth() === selectedDate.getMonth() && 
           date.getFullYear() === selectedDate.getFullYear();
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const disabled = isDateDisabled(date);
      
      days.push(
        <button
          key={`day-${day}`}
          onClick={() => !disabled && onDateSelect(date)}
          disabled={disabled}
          className={`
            h-10 w-10 rounded-full flex items-center justify-center text-sm
            ${isSelected(date) ? 'bg-[#DD1D21] text-white' : ''}
            ${isToday(date) && !isSelected(date) ? 'border border-[#DD1D21] text-[#DD1D21]' : ''}
            ${disabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
          `}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="font-medium">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button 
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={index} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {renderCalendar()}
      </div>
      
      {selectedDate && (
        <div className="mt-4 text-sm text-gray-700">
          Selected date: <span className="font-medium">{selectedDate.toLocaleDateString()}</span>
        </div>
      )}
    </div>
  );
};

export default DatePicker;