import React from 'react';
import { Calendar, Clock, MapPin, User, MessageSquare } from 'lucide-react';
import { CourseItem, DayKey } from '../types.ts';
import { SCHEDULE_DATABASE } from '../data.ts';

interface ScheduleSectionProps {
  activeDay: DayKey;
  onSelectDay: (day: DayKey) => void;
  todayDayName: string;
  onOpenWhatsAppModal: (course: CourseItem) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  activeDay,
  onSelectDay,
  todayDayName,
  onOpenWhatsAppModal,
}) => {
  const days: { key: DayKey; count: number }[] = [
    { key: 'SENIN', count: 1 },
    { key: 'SELASA', count: 1 },
    { key: 'RABU', count: 3 },
    { key: 'KAMIS', count: 1 },
    { key: 'JUMAT', count: 2 },
  ];

  const currentCourses = SCHEDULE_DATABASE[activeDay] || [];

  return (
    <section
      className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 scroll-mt-20"
      id="jadwal-kuliah"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#4cd7f6] font-mono text-xs uppercase tracking-wider mb-1 font-semibold">
            <Calendar className="w-4 h-4" />
            Timetable Matrix
          </div>
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#d3e4fe] tracking-tight">
            Jadwal Perkuliahan Terpadu TI-3A
          </h2>
          <p className="text-sm sm:text-base text-[#c6c6cd] mt-1">
            Jadwal mata kuliah, lokasi pembelajaran, dosen pengampu, dan kontak PJ.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#c6c6cd]">Hari ini:</span>
          <span className="px-3 py-1 rounded-md bg-[#4cd7f6]/10 border border-[#4cd7f6]/30 text-[#4cd7f6] font-mono text-xs uppercase font-semibold">
            {todayDayName} • HARI INI
          </span>
        </div>
      </div>

      {/* Segmented Glass Weekday Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-[#45464d]/30 mb-8 scrollbar-none">
        {days.map(({ key, count }) => {
          const isActive = activeDay === key;
          return (
            <button
              key={key}
              onClick={() => onSelectDay(key)}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-[#1b2b3f] text-[#4cd7f6] border border-[#4cd7f6]/40 shadow-lg shadow-[#4cd7f6]/15'
                  : 'text-[#c6c6cd] hover:text-[#d3e4fe] hover:bg-[#1b2b3f]/50 border border-transparent'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isActive ? 'bg-[#4cd7f6]' : 'bg-[#45464d]'
                }`}
              ></span>
              <span>
                {key} ({count} Matkul)
              </span>
            </button>
          );
        })}
      </div>

      {/* Schedule Content Cards */}
      <div className="space-y-4">
        {currentCourses.length === 0 ? (
          <div className="p-8 text-center text-[#c6c6cd] bg-[#102034]/50 rounded-2xl border border-[#45464d]/30">
            Tidak ada perkuliahan pada hari ini.
          </div>
        ) : (
          currentCourses.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl p-6 bg-[#102034]/70 border border-[#45464d]/30 backdrop-blur-xl hover:border-[#4cd7f6]/50 transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group shadow-lg"
            >
              {/* Left Info: Time & Title */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6 flex-1">
                {/* Time Monospace Badge */}
                <div className="min-w-[170px] p-3 rounded-xl bg-[#000f21]/80 border border-[#4cd7f6]/20 flex flex-col justify-center">
                  <span className="font-mono text-xs text-[#4cd7f6] flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#4cd7f6]" />
                    Waktu Kuliah
                  </span>
                  <span className="font-mono text-sm sm:text-base font-semibold text-[#d3e4fe] mt-0.5">
                    {item.time}
                  </span>
                </div>

                {/* Main Course Details */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#1b2b3f] text-[#4cd7f6] border border-[#4cd7f6]/20 font-medium">
                      {item.type}
                    </span>
                    <span className="font-mono text-xs text-[#909097]">•</span>
                    <span className="font-mono text-xs text-[#4edea3] flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.room}
                    </span>
                  </div>

                  <h3 className="font-headline font-bold text-xl sm:text-2xl text-[#d3e4fe] group-hover:text-[#4cd7f6] transition-colors">
                    {item.matkul}
                  </h3>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-[#c6c6cd] pt-1">
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-[#4cd7f6]" />
                      Dosen: <strong className="text-[#d3e4fe] font-medium">{item.dosen}</strong>
                    </span>
                    <span className="text-[#45464d]">•</span>
                    <span className="font-mono text-xs text-[#909097]">Telp: {item.phone}</span>
                  </div>
                </div>
              </div>

              {/* Right: PJ In-Charge Badge & WhatsApp Action */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#45464d]/30 shrink-0">
                <div className="flex flex-col text-left sm:text-right">
                  <span className="font-mono text-xs text-[#909097]">Penanggung Jawab (PJ)</span>
                  <span className="text-sm sm:text-base font-semibold text-[#4cd7f6]">
                    {item.pjName}
                  </span>
                </div>

                <button
                  onClick={() => onOpenWhatsAppModal(item)}
                  className="px-5 py-3 rounded-xl bg-[#4edea3] hover:bg-[#6ffbbe] text-[#000f21] font-headline font-semibold text-sm inline-flex items-center gap-2 shadow-lg shadow-[#4edea3]/20 hover:shadow-[#4edea3]/35 transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current text-[#000f21]" />
                  <span>Konfirmasi Dosen (Form PJ)</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
