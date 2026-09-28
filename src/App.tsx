/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ScheduleSection } from './components/ScheduleSection.tsx';
import { CohortSection } from './components/CohortSection.tsx';
import { Footer } from './components/Footer.tsx';
import { WhatsAppModal, ModalInitialData } from './components/WhatsAppModal.tsx';
import { CourseItem, CoursePJ, DayKey } from './types.ts';

export default function App() {
  const [activeDay, setActiveDay] = useState<DayKey>('SENIN');
  const [todayDayName, setTodayDayName] = useState<string>('SENIN');
  const [formattedDate, setFormattedDate] = useState<string>('Senin, 28 September 2026');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalInitialData, setModalInitialData] = useState<ModalInitialData | null>(null);

  // Initialize current day and formatted date in Indonesian
  useEffect(() => {
    const now = new Date();
    const dayIndex = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
    const indonesianDays: Record<number, DayKey | null> = {
      1: 'SENIN',
      2: 'SELASA',
      3: 'RABU',
      4: 'KAMIS',
      5: 'JUMAT',
    };

    const currentKey = indonesianDays[dayIndex] || 'SENIN';
    const dayNames = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
    setTodayDayName(dayNames[dayIndex]);
    setActiveDay(currentKey);

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    try {
      const dateStr = now.toLocaleDateString('id-ID', options);
      setFormattedDate(dateStr);
    } catch {
      setFormattedDate('Senin, 28 September 2026');
    }
  }, []);

  const handleScrollToSchedule = () => {
    const el = document.getElementById('jadwal-kuliah');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenGeneralWhatsApp = () => {
    setModalInitialData({
      matkul: 'Kewirausahaan',
      time: '07.00 – 08.40 WIB',
      room: 'A12 (Gedung A)',
      dosen: 'Aris Juliansyah, M.I.Kom.',
      phone: '0815-6301-178',
      cleanPhone: '628156301178',
      pjName: 'Raden Muhammad Rizky',
      dayText: `${activeDay}, perkuliahan`,
    });
    setIsModalOpen(true);
  };

  const handleOpenCourseWhatsApp = (course: CourseItem) => {
    setModalInitialData({
      matkul: course.matkul,
      time: course.time,
      rawTime: course.rawTime,
      room: course.room,
      roomCode: course.roomCode,
      dosen: course.dosen,
      phone: course.phone,
      cleanPhone: course.cleanPhone,
      pjName: course.pjName,
      dayText: `${activeDay}, perkuliahan`,
    });
    setIsModalOpen(true);
  };

  const handleOpenPJWhatsApp = (pj: CoursePJ) => {
    setModalInitialData({
      matkul: pj.course,
      time: 'Jam Operasional Perkuliahan',
      room: pj.room,
      dosen: pj.dosen,
      phone: pj.phone,
      cleanPhone: pj.cleanPhone,
      pjName: pj.name,
      dayText: `${pj.day}, perkuliahan`,
    });
    setIsModalOpen(true);
  };

  const handleOpenLeaderDirectChat = (name: string, role: string) => {
    setModalInitialData({
      matkul: `Koordinasi Kelas TI-3A (${role})`,
      time: 'Jam Kerja / Kampus',
      room: 'Sekretariat Prodi TI',
      dosen: 'Kaprodi Teknik Informatika UMMI',
      phone: '0812-0000-0000',
      cleanPhone: '6281200000000',
      pjName: name,
      dayText: 'Hari ini',
    });
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#031427] text-[#d3e4fe] min-h-screen relative overflow-x-hidden selection:bg-[#4cd7f6]/30 selection:text-[#4cd7f6]">
      {/* Micro Grid Overlay & Atmospheric Bloom */}
      <div className="fixed inset-0 custom-grid-pattern pointer-events-none z-0"></div>
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-[#4cd7f6]/10 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="fixed top-1/2 -right-40 w-[30rem] h-[30rem] bg-[#4edea3]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Top Navbar */}
      <Navbar
        onScrollToSchedule={handleScrollToSchedule}
        onOpenWhatsAppModal={handleOpenGeneralWhatsApp}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          currentDateFormatted={formattedDate}
          onOpenWhatsAppModal={handleOpenGeneralWhatsApp}
        />

        {/* Timetable Matrix */}
        <ScheduleSection
          activeDay={activeDay}
          onSelectDay={(day) => setActiveDay(day)}
          todayDayName={todayDayName}
          onOpenWhatsAppModal={handleOpenCourseWhatsApp}
        />

        {/* Academic Cohort & Student Directory */}
        <CohortSection
          onOpenWhatsAppModalWithPJ={handleOpenPJWhatsApp}
          onOpenDirectLeaderChat={handleOpenLeaderDirectChat}
        />
      </main>

      {/* Footer */}
      <Footer onOpenWhatsAppModal={handleOpenGeneralWhatsApp} />

      {/* WhatsApp Modal Generator */}
      <WhatsAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={modalInitialData}
      />
    </div>
  );
}
