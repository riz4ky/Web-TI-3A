import React, { useState } from 'react';
import { Terminal, Calendar, MessageSquare, Menu, X } from 'lucide-react';

interface NavbarProps {
  onScrollToSchedule: () => void;
  onOpenWhatsAppModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onScrollToSchedule,
  onOpenWhatsAppModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#102034]/90 backdrop-blur-xl border-b border-[#45464d]/30 shadow-2xl shadow-[#000f21]/50 sticky top-0 z-40">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-20">
        {/* Brand Logo Cluster */}
        <a
          href="#beranda"
          className="flex items-center gap-2 group transition-all duration-200 active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-[#1b2b3f] border border-[#4cd7f6]/40 flex items-center justify-center shadow-lg shadow-[#4cd7f6]/10 group-hover:border-[#4cd7f6] transition-colors">
            <Terminal className="w-5 h-5 text-[#4cd7f6]" />
          </div>
          <div className="flex flex-col">
            <span className="font-headline font-bold text-lg sm:text-xl tracking-tight text-[#4cd7f6] flex items-center gap-2">
              Averion Tech
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
            </span>
            <span className="font-mono text-[11px] text-[#c6c6cd] flex items-center gap-1">
              TI-3A <span className="text-[#909097]">/</span> UNIVERSITAS MUHAMMADIYAH SUKABUMI
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#beranda"
            className="text-[#4cd7f6] text-sm font-semibold border-b-2 border-[#4cd7f6] pb-1 transition-colors"
          >
            Beranda
          </a>
          <a
            href="#struktur-organisasi"
            className="text-[#c6c6cd] text-sm font-semibold hover:text-[#4cd7f6] transition-colors"
          >
            Struktur Kelas
          </a>
          <a
            href="#jadwal-kuliah"
            className="text-[#c6c6cd] text-sm font-semibold hover:text-[#4cd7f6] transition-colors"
          >
            Jadwal Kuliah
          </a>
          <a
            href="#bagi-kelompok"
            className="text-[#c6c6cd] text-sm font-semibold hover:text-[#4cd7f6] transition-colors flex items-center gap-1.5"
          >
            <span>Bagi Kelompok</span>
            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#4edea3]/20 text-[#4edea3] font-bold">SPIN</span>
          </a>
          <a
            href="#kontak-pj"
            className="text-[#c6c6cd] text-sm font-semibold hover:text-[#4cd7f6] transition-colors"
          >
            Kontak PJ
          </a>
        </nav>

        {/* Trailing Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onScrollToSchedule}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1b2b3f] hover:bg-[#2a3a4f] text-[#4cd7f6] border border-[#4cd7f6]/30 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95"
          >
            <Calendar className="w-4 h-4 text-[#4cd7f6]" />
            <span>Jadwal Hari Ini</span>
          </button>

          <button
            onClick={onOpenWhatsAppModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4cd7f6] hover:bg-[#acedff] text-[#000f21] text-xs sm:text-sm font-bold shadow-lg shadow-[#4cd7f6]/20 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-current text-[#000f21]" />
            <span>Hubungi Dosen</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#1b2b3f] text-[#d3e4fe] border border-[#45464d]/40"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-[#102034] border-b border-[#45464d]/30 space-y-2">
          <a
            href="#beranda"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-[#4cd7f6] font-medium bg-[#1b2b3f]/50"
          >
            Beranda
          </a>
          <a
            href="#struktur-organisasi"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-[#c6c6cd] hover:text-[#4cd7f6] font-medium"
          >
            Struktur Kelas
          </a>
          <a
            href="#jadwal-kuliah"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-[#c6c6cd] hover:text-[#4cd7f6] font-medium"
          >
            Jadwal Kuliah
          </a>
          <a
            href="#bagi-kelompok"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-[#c6c6cd] hover:text-[#4cd7f6] font-medium"
          >
            Bagi Kelompok (Spin)
          </a>
          <a
            href="#kontak-pj"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-[#c6c6cd] hover:text-[#4cd7f6] font-medium"
          >
            Kontak PJ
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onScrollToSchedule();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 mt-2 rounded-lg bg-[#1b2b3f] text-[#4cd7f6] border border-[#4cd7f6]/30 text-sm font-semibold"
          >
            <Calendar className="w-4 h-4" />
            <span>Jadwal Hari Ini</span>
          </button>
        </div>
      )}
    </header>
  );
};
