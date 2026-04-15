import { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";

interface ScheduleSelectorProps {
  isVisible: boolean;
  isRecurring?: boolean;
  onScheduleChange: (date: Date | null, time: string) => void;
}

const ScheduleSelector = ({
  isVisible,
  isRecurring = false,
  onScheduleChange,
}: ScheduleSelectorProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate available time slots from 9:00 AM to 8:00 PM (full hours only)
  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDate = new Date(startDate);

    while (currentDate <= lastDay || days.length < 42) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  // Check if date is available (not Saturday and not in the past)
  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = date.getDay();
    return date >= today && dayOfWeek !== 6; // 6 = Saturday
  };

  // Check if date is selected
  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  // Handle date selection
  const handleDateSelect = (date: Date, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      onScheduleChange(date, selectedTime);
    }
  };

  // Handle time selection
  const handleTimeSelect = (time: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedTime(time);
    if (selectedDate) {
      onScheduleChange(selectedDate, time);
    }
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Format month and year for header
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  if (!isVisible) return null;

  return (
    <div className="relative space-y-6 p-8 bg-gradient-to-br from-card/60 to-card/40 border-2 border-border/30 rounded-xl backdrop-blur-sm">
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-primary/40 rounded-full animate-pulse"></div>
      <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-primary/30 rounded-full animate-bounce delay-500"></div>

      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">
              Schedule Your Session
            </h3>
          </div>
        </div>
        {isRecurring && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse"></div>
            <p className="text-sm text-primary font-medium">
              Weekly recurring session at the same time
            </p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-foreground/90 uppercase tracking-wider text-sm flex items-center gap-2">
              <div className="w-6 h-6 bg-primary/20 rounded-md flex items-center justify-center">
                <Calendar className="w-3 h-3 text-primary" />
              </div>
              Select Date
            </h4>
            <div className="flex items-center gap-1 bg-background/50 rounded-lg p-1">
              <button
                onClick={goToPreviousMonth}
                className="p-2 hover:bg-primary/20 rounded-md transition-all duration-200 hover:scale-105 group"
              >
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span className="text-sm font-bold text-foreground min-w-[120px] text-center px-2">
                {formatMonthYear(currentMonth)}
              </span>
              <button
                onClick={goToNextMonth}
                className="p-2 hover:bg-primary/20 rounded-md transition-all duration-200 hover:scale-105 group"
              >
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-background/30 p-4 rounded-xl border border-border/30">
            <div className="grid grid-cols-7 gap-1 text-xs mb-3">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="p-2 text-center text-muted-foreground font-bold uppercase tracking-wider"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays().map((date, index) => {
                const isAvailable = isDateAvailable(date);
                const isSelected = isDateSelected(date);
                const isCurrentMonth =
                  date.getMonth() === currentMonth.getMonth();

                return (
                  <button
                    key={index}
                    onClick={(e) => handleDateSelect(date, e)}
                    disabled={!isAvailable}
                    className={`
                       relative p-3 text-center rounded-lg transition-all duration-200 font-medium
                       ${
                         isCurrentMonth
                           ? "text-foreground"
                           : "text-muted-foreground/40"
                       }
                       ${
                         isAvailable
                           ? "hover:bg-primary/20 cursor-pointer hover:scale-105 hover:shadow-md"
                           : "cursor-not-allowed opacity-40"
                       }
                       ${
                         isSelected
                           ? "bg-primary text-purple-900 shadow-lg scale-105 ring-2 ring-primary/30"
                           : "hover:bg-background/80"
                       }
                     `}
                  >
                    {date.getDate()}
                    {/* Selected date indicator */}
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary-foreground rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Time Selection Section */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground/90 uppercase tracking-wider text-sm flex items-center gap-2">
            <div className="w-6 h-6 bg-primary/20 rounded-md flex items-center justify-center">
              <Clock className="w-3 h-3 text-primary" />
            </div>
            Select Time
          </h4>

          <div className="bg-background/30 p-4 rounded-xl border border-border/30 max-h-72 overflow-y-auto">
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={(e) => handleTimeSelect(time, e)}
                  className={`
                       relative p-4 text-center rounded-xl border-2 transition-all duration-300 font-semibold text-lg
                       ${
                         selectedTime === time
                           ? "bg-primary text-purple-900 border-primary shadow-lg scale-105 ring-2 ring-primary/30 transform rotate-1"
                           : "bg-background/50 border-border/50 hover:border-primary/50 hover:bg-primary/10 hover:scale-105 hover:rotate-1 hover:shadow-md"
                       }
                     `}
                >
                  {time}
                  {/* Selected time indicator */}
                  {selectedTime === time && (
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-primary-foreground rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {selectedDate && selectedTime && (
            <div className="relative p-6 bg-gradient-to-br from-primary/15 to-primary/5 border-2 border-primary/30 rounded-xl">
              <div className="absolute top-3 right-3 w-3 h-3 bg-primary/40 rounded-full animate-pulse"></div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground mb-1">
                    {formatDate(selectedDate)} at {selectedTime}
                  </h4>

                  {isRecurring && (
                    <p className="text-xs text-primary mt-2 font-medium">
                      🔄 Weekly recurring on{" "}
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                      s
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleSelector;
