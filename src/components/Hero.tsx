import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Users, Zap, Camera, Maximize2, Upload, X, RotateCcw } from 'lucide-react';
import { CLASS_GROUP_PHOTO } from '../data.ts';

interface HeroProps {
  currentDateFormatted: string;
  onOpenWhatsAppModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentDateFormatted, onOpenWhatsAppModal }) => {
  const [customPhoto, setCustomPhoto] = useState<string>('');
  const [imgError, setImgError] = useState<boolean>(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('averion_class_group_photo');
      if (saved) {
        setCustomPhoto(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCustomPhoto(result);
          setImgError(false);
          try {
            localStorage.setItem('averion_class_group_photo', result);
          } catch {
            // ignore
          }
        }
      };
      reader.readAsDataURL(file);
    }
    if (e.target) e.target.value = '';
  };

  const handleResetPhoto = () => {
    setCustomPhoto('');
    setImgError(false);
    try {
      localStorage.removeItem('averion_class_group_photo');
    } catch {
      // ignore
    }
  };

  const activePhoto = customPhoto || CLASS_GROUP_PHOTO || '';

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 sm:pt-14 pb-16" id="beranda">
      {/* Hidden File Input for Class Photo Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Greeting Pill Banner */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b2b3f]/80 border border-[#4cd7f6]/30 backdrop-blur-md mb-6">
        <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
        <span className="font-mono text-xs text-[#4cd7f6]">Welcome to Portal TI-3A</span>
        <span className="text-[#45464d]">•</span>
        <span className="font-mono text-xs text-[#c6c6cd]">{currentDateFormatted}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Hero Copy */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs sm:text-sm text-[#4cd7f6] tracking-widest uppercase font-semibold">
              INFORMATICS ENGINEERING 25'
            </span>
            <h1 className="font-headline font-bold text-4xl sm:text-5xl lg:text-6xl text-[#d3e4fe] tracking-tight leading-none">
              Averion{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4cd7f6] to-[#4edea3]">
                Tech
              </span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-[#c6c6cd] max-w-xl leading-relaxed">
            Website Kelas 3A Teknik Informatika Angkatan 2025 Universitas Muhammadiyah Sukabumi
            (UMMI). Website ini berisikan pusat informasi jadwal Perkuliahan terpadu dan struktur
            organisasi kelas kami.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#jadwal-kuliah"
              className="px-6 py-3.5 rounded-xl bg-[#4cd7f6] text-[#000f21] font-headline font-semibold text-base inline-flex items-center gap-2 shadow-xl shadow-[#4cd7f6]/25 hover:shadow-[#4cd7f6]/40 hover:bg-[#acedff] transition-all duration-200 active:scale-95"
            >
              <span>Lihat Jadwal Kuliah</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="#struktur-organisasi"
              className="px-6 py-3.5 rounded-xl bg-[#1b2b3f]/60 hover:bg-[#1b2b3f] text-[#d3e4fe] border border-[#45464d]/40 font-headline font-semibold text-base inline-flex items-center gap-2 backdrop-blur-md transition-all duration-200 active:scale-95"
            >
              <Users className="w-5 h-5 text-[#4cd7f6]" />
              <span>Struktur Kelas</span>
            </a>
          </div>

          {/* Hero Metrics Bar */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#45464d]/30 max-w-lg">
            <div className="flex flex-col">
              <span className="font-headline text-2xl sm:text-3xl font-bold text-[#d3e4fe]">24</span>
              <span className="font-mono text-xs text-[#c6c6cd]">Mahasiswa Aktif</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-2xl sm:text-3xl font-bold text-[#4cd7f6]">7</span>
              <span className="font-mono text-xs text-[#c6c6cd]">Mata Kuliah</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-2xl sm:text-3xl font-bold text-[#4edea3]">6</span>
              <span className="font-mono text-xs text-[#c6c6cd]">Lab &amp; Teori</span>
            </div>
          </div>
        </div>

        {/* Right Hero: 16:9 Class Group Photo Showcase (Never Cropped) */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-2xl p-4 sm:p-5 bg-[#102034]/70 border border-[#45464d]/40 backdrop-blur-xl shadow-2xl overflow-hidden group">
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-[#4cd7f6]/15 rounded-full blur-3xl pointer-events-none"></div>

            {/* Header Toolbar */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#45464d]/30 mb-3.5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ffb4ab]"></span>
                <span className="w-3 h-3 rounded-full bg-[#4cd7f6]"></span>
                <span className="w-3 h-3 rounded-full bg-[#4edea3]"></span>
                <span className="ml-2 font-mono text-xs text-[#c6c6cd]">
                  Take a picture with 3A
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#4edea3] bg-[#4edea3]/10 px-2 py-0.5 rounded border border-[#4edea3]/20 font-bold">
                </span>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  title="Unggah / Ganti Foto Kelas"
                  className="font-mono text-[11px] text-[#4cd7f6] hover:text-[#acedff] bg-[#4cd7f6]/10 px-2 py-0.5 rounded border border-[#4cd7f6]/20 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Camera className="w-3 h-3" />
                  <span>Ganti Foto</span>
                </button>
              </div>
            </div>

            {/* 16:9 Photo Frame: Guaranteed no cropping with object-contain */}
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#000f21] border border-[#4cd7f6]/30 shadow-inner group/photo">
              {activePhoto && !imgError ? (
                <>
                  {/* Ambient blurred backdrop for aesthetic depth */}
                  <img
                    src={activePhoto}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-xl opacity-25 scale-110 pointer-events-none"
                  />
                  {/* Clean 16:9 photo rendered with object-contain so NO faces or borders are ever cropped */}
                  <img
                    src={activePhoto}
                    alt="Foto Bersama Kelas TI-3A"
                    onError={() => setImgError(true)}
                    className="relative w-full h-full object-contain transition-transform duration-500 ease-out group-hover/photo:scale-[1.02]"
                  />
                  {/* Hover Overlay with Action Buttons */}
                  <div className="absolute inset-0 bg-[#000f21]/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => setIsLightboxOpen(true)}
                      className="py-1.5 px-3 rounded-lg bg-[#000f21]/85 backdrop-blur-md text-[#4cd7f6] font-mono text-xs border border-[#4cd7f6]/40 flex items-center gap-1.5 hover:bg-[#4cd7f6] hover:text-[#000f21] transition-all cursor-pointer shadow-lg"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Perbesar</span>
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="py-1.5 px-3 rounded-lg bg-[#000f21]/85 backdrop-blur-md text-[#4edea3] font-mono text-xs border border-[#4edea3]/40 flex items-center gap-1.5 hover:bg-[#4edea3] hover:text-[#000f21] transition-all cursor-pointer shadow-lg"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Pilih Foto</span>
                    </button>
                  </div>
                </>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer bg-[#102034]/70 hover:bg-[#102034] transition-colors border border-dashed border-[#4cd7f6]/40 rounded-xl"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#4cd7f6]/10 border border-[#4cd7f6]/30 flex items-center justify-center text-[#4cd7f6] mb-3 group-hover/photo:scale-110 transition-transform">
                    <Users className="w-7 h-7" />
                  </div>
                  <h4 className="font-headline font-bold text-base text-[#d3e4fe]">
                    Foto Bersama Kelas TI-3A (16:9)
                  </h4>
                  <p className="text-xs text-[#c6c6cd] mt-1 max-w-xs leading-relaxed">
                    Tampilan rasio 16:9 penuh tanpa terpotong. Klik di sini untuk mengunggah foto kelas bersama.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4cd7f6]/15 text-[#4cd7f6] font-mono text-xs border border-[#4cd7f6]/30 font-semibold">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Unggah Foto Kelas</span>
                  </div>
                </div>
              )}
            </div>

            {/* Caption & Quick Reset Footer */}
            <div className="mt-3.5 pt-3 border-t border-[#45464d]/25 flex items-center justify-between text-xs">
              <div>
                <h5 className="font-headline font-semibold text-[#d3e4fe]">
                  Keluarga Besar Kelas Teknik Informatika 3A
                </h5>
                <p className="text-[11px] text-[#909097] font-mono">
                  Universitas Muhammadiyah Sukabumi • 2025
                </p>
              </div>

              <div className="flex items-center gap-2">
                {customPhoto && (
                  <button
                    onClick={handleResetPhoto}
                    title="Kembalikan ke foto bawaan"
                    className="text-[11px] font-mono text-[#f43f5e] hover:text-[#fb7185] flex items-center gap-1 px-2 py-1 rounded bg-[#f43f5e]/10 border border-[#f43f5e]/20 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
                <button
                  onClick={onOpenWhatsAppModal}
                  className="font-mono text-[11px] text-[#4edea3] hover:text-[#acedff] flex items-center gap-1 bg-[#4edea3]/10 px-2.5 py-1 rounded border border-[#4edea3]/25 transition-colors"
                >
                  <Zap className="w-3 h-3 fill-current" />
                  <span>Format WA</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Full High-Resolution View */}
      {isLightboxOpen && activePhoto && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-[#000f21]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#102034] border border-[#4cd7f6]/40 rounded-2xl p-4 shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#45464d]/30 mb-3">
              <div>
                <h4 className="font-headline font-bold text-base sm:text-lg text-[#d3e4fe]">
                  Foto Bersama Kelas TI-3A (16:9 Penuh)
                </h4>
                <p className="font-mono text-xs text-[#4cd7f6]">
                  Universitas Muhammadiyah Sukabumi • Angkatan 2025
                </p>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="w-8 h-8 rounded-lg bg-[#1b2b3f] hover:bg-[#ffb4ab]/20 hover:text-[#ffb4ab] text-[#c6c6cd] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full aspect-[16/9] bg-[#000f21] rounded-xl overflow-hidden flex items-center justify-center border border-[#45464d]/30">
              <img
                src={activePhoto}
                alt="Foto Bersama Kelas TI-3A"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

