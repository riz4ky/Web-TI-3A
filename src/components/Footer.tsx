import React from 'react';

interface FooterProps {
  onOpenWhatsAppModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWhatsAppModal }) => {
  return (
    <footer className="bg-[#000f21] border-t border-[#45464d]/20 relative z-10 mt-12">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="font-headline font-bold text-lg text-[#d3e4fe]">Averion Tech</span>
            <span className="font-mono text-xs text-[#4cd7f6] bg-[#4cd7f6]/10 px-2 py-0.5 rounded">
              TI-3A
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#c6c6cd] text-center md:text-left">
            © 2024–2026 Averion Tech • Teknik Informatika TI-3A Universitas Muhammadiyah Sukabumi
            (UMMI). All rights reserved.
          </p>
          <span className="font-mono text-xs text-[#909097]">
            Class Motto: &quot;Innovate, Collaborate, Elevate&quot;
          </span>
        </div>

        {/* Navigation & Action Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs sm:text-sm">
          <a
            href="#struktur-organisasi"
            className="text-[#c6c6cd] hover:text-[#4cd7f6] transition-colors"
          >
            Struktur Organisasi
          </a>
          <a
            href="#jadwal-kuliah"
            className="text-[#c6c6cd] hover:text-[#4cd7f6] transition-colors"
          >
            Jadwal Perkuliahan
          </a>
          <button
            onClick={onOpenWhatsAppModal}
            className="text-[#4cd7f6] font-mono hover:underline cursor-pointer"
          >
            Template Pesan WhatsApp
          </button>
          <a
            href="https://ummi.ac.id"
            target="_blank"
            rel="noreferrer"
            className="text-[#c6c6cd] hover:text-[#4cd7f6] transition-colors"
          >
            Portal Akademik UMMI
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-[#c6c6cd] hover:text-[#4cd7f6] transition-colors"
          >
            Repositori GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};
