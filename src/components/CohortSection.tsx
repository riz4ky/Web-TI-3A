import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  MessageSquare,
  CheckCircle2,
  Camera,
  Maximize2,
  RotateCcw,
  X,
  Upload,
  Check,
} from 'lucide-react';
import {
  LEADERSHIP_STUDENTS,
  BENDAHARA_STUDENTS,
  PJ_STUDENTS,
  MEMBER_STUDENTS,
} from '../data.ts';
import { CoursePJ } from '../types.ts';

interface CohortSectionProps {
  onOpenWhatsAppModalWithPJ: (pj: CoursePJ) => void;
  onOpenDirectLeaderChat: (name: string, role: string) => void;
}

interface PhotoLightboxState {
  isOpen: boolean;
  name: string;
  role: string;
  photoUrl: string;
}

export const CohortSection: React.FC<CohortSectionProps> = ({
  onOpenWhatsAppModalWithPJ,
  onOpenDirectLeaderChat,
}) => {
  // Store custom uploaded photos by student name in state and localStorage
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<PhotoLightboxState>({
    isOpen: false,
    name: '',
    role: '',
    photoUrl: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [targetStudentForUpload, setTargetStudentForUpload] = useState<string | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  // Load custom photos from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('averion_custom_photos');
      if (saved) {
        setCustomPhotos(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save custom photos
  const updateCustomPhoto = (name: string, dataUrl: string) => {
    const updated = { ...customPhotos, [name]: dataUrl };
    setCustomPhotos(updated);
    try {
      localStorage.setItem('averion_custom_photos', JSON.stringify(updated));
    } catch {
      // storage full or blocked
    }
  };

  const handleResetPhotos = () => {
    if (confirm('Kembalikan semua foto mahasiswa ke foto default?')) {
      setCustomPhotos({});
      try {
        localStorage.removeItem('averion_custom_photos');
      } catch {
        // ignore
      }
    }
  };

  const triggerUploadFor = (e: React.MouseEvent, studentName: string) => {
    e.stopPropagation();
    setTargetStudentForUpload(studentName);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && targetStudentForUpload) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          updateCustomPhoto(targetStudentForUpload, result);
        }
      };
      reader.readAsDataURL(file);
    }
    // reset input
    if (e.target) e.target.value = '';
  };

  const openLightbox = (e: React.MouseEvent, name: string, role: string, photoUrl: string) => {
    e.stopPropagation();
    setLightbox({
      isOpen: true,
      name,
      role,
      photoUrl,
    });
  };

  const getEffectivePhoto = (name: string, fallbackUrl?: string) => {
    return customPhotos[name] || fallbackUrl || '';
  };

  const ketua = LEADERSHIP_STUDENTS[0];
  const wakil = LEADERSHIP_STUDENTS[1];
  const sekretaris = LEADERSHIP_STUDENTS[2];

  return (
    <section
      className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 scroll-mt-20"
      id="struktur-organisasi"
    >
      {/* Hidden file input for custom photo uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b2b3f] border border-[#45464d]/30 text-[#4cd7f6] font-mono text-xs uppercase tracking-wider mb-3 font-semibold">
          <Users className="w-3.5 h-3.5" />
          Academic Cohort
        </div>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#d3e4fe] tracking-tight">
          Struktur Organisasi &amp; Direktori Mahasiswa
        </h2>
        <p className="text-sm sm:text-base text-[#c6c6cd] mt-2 leading-relaxed">
          24 mahasiswa aktif Kelas Teknik Informatika 3A UMMI berdasarkan tugas, jabatan, dan
          penanggungjawab mata kuliah.
        </p>

        {/* Quick action: Reset photos button if any custom photos uploaded */}
        {Object.keys(customPhotos).length > 0 && (
          <div className="mt-3 flex justify-center">
            <button
              onClick={handleResetPhotos}
              className="text-xs font-mono text-[#909097] hover:text-[#4cd7f6] flex items-center gap-1 px-3 py-1 rounded-lg bg-[#1b2b3f]/50 border border-[#45464d]/30 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Foto ke Default
            </button>
          </div>
        )}
      </div>

      {/* TIER 1: PENGURUS INTI (5 MAHASISWA) */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-[#4cd7f6] bg-[#4cd7f6]/10 px-3 py-1 rounded-md border border-[#4cd7f6]/20 font-bold">
            TIER 1
          </span>
          <h3 className="font-headline font-semibold text-xl sm:text-2xl text-[#d3e4fe]">
            Badan Pengurus Inti Kelas
          </h3>
          <div className="flex-1 h-px bg-[#45464d]/20"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {/* Ketua Kelas with Shift & Enlarge Effect */}
          <div
            onClick={() => setSelectedStudent(ketua.name)}
            className={`rounded-2xl p-5 bg-[#102034]/95 border-2 backdrop-blur-xl flex flex-col justify-between group transition-all duration-300 ease-out cursor-pointer hover:-translate-y-3 hover:scale-[1.02] hover:border-[#4cd7f6] hover:shadow-2xl hover:shadow-[#4cd7f6]/30 ${
              selectedStudent === ketua.name
                ? '-translate-y-3 border-[#4cd7f6] shadow-2xl shadow-[#4cd7f6]/35 ring-2 ring-[#4cd7f6]/50'
                : 'border-[#4cd7f6]/70 shadow-xl'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#4cd7f6] text-[#000f21] font-bold uppercase tracking-wider">
                  {ketua.role}
                </span>
                <button
                  onClick={(e) => triggerUploadFor(e, ketua.name)}
                  title="Ganti Foto"
                  className="text-[#909097] hover:text-[#4cd7f6] transition-colors p-1"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Photo with Shift & Hover Enlarge */}
              <div
                onClick={(e) =>
                  openLightbox(
                    e,
                    ketua.name,
                    ketua.role,
                    getEffectivePhoto(ketua.name, ketua.photoUrl)
                  )
                }
                className="relative w-full aspect-[3/4] rounded-xl bg-[#1b2b3f] border-2 border-[#4cd7f6]/60 overflow-hidden mb-3.5 group/photo cursor-pointer shadow-md transform transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-105 sm:hover:scale-110 hover:z-30 hover:border-[#4cd7f6] hover:shadow-2xl hover:shadow-[#4cd7f6]/40"
              >
                <img
                  src={getEffectivePhoto(ketua.name, ketua.photoUrl)}
                  alt={ketua.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/photo:scale-110"
                />
                <div className="absolute inset-0 bg-[#000f21]/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-[#000f21]/85 backdrop-blur-sm text-[#4cd7f6] font-mono text-[11px] border border-[#4cd7f6]/30">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Perbesar</span>
                  </div>
                </div>
              </div>

              <span className="font-mono text-[11px] text-[#4cd7f6] uppercase tracking-wider font-semibold block mb-0.5">
                {ketua.title}
              </span>
              <h4 className="font-headline font-bold text-base sm:text-lg text-[#d3e4fe] group-hover:text-[#4cd7f6] transition-colors">
                {ketua.name}
              </h4>
              <p className="text-xs sm:text-sm text-[#c6c6cd] mt-1 leading-snug">
                {ketua.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#45464d]/30 flex items-center justify-between gap-2">
              <span className="font-mono text-xs text-[#c6c6cd]">{ketua.status}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDirectLeaderChat(ketua.name, ketua.role);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-[#1b2b3f] hover:bg-[#4cd7f6]/20 text-[#4cd7f6] border border-[#4cd7f6]/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Kontak</span>
              </button>
            </div>
          </div>

          {/* Wakil Ketua with Shift & Enlarge Effect */}
          <div
            onClick={() => setSelectedStudent(wakil.name)}
            className={`rounded-2xl p-5 bg-[#102034]/80 border backdrop-blur-xl flex flex-col justify-between group transition-all duration-300 ease-out cursor-pointer hover:-translate-y-3 hover:scale-[1.02] hover:border-[#4cd7f6] hover:shadow-2xl hover:shadow-[#4cd7f6]/25 ${
              selectedStudent === wakil.name
                ? '-translate-y-3 border-[#4cd7f6] shadow-2xl shadow-[#4cd7f6]/30 ring-2 ring-[#4cd7f6]/50'
                : 'border-[#45464d]/30 shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#1b2b3f] text-[#4cd7f6] border border-[#4cd7f6]/20 font-semibold">
                  {wakil.role}
                </span>
                <button
                  onClick={(e) => triggerUploadFor(e, wakil.name)}
                  title="Ganti Foto"
                  className="text-[#909097] hover:text-[#4cd7f6] transition-colors p-1"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Photo with Shift & Hover Enlarge */}
              <div
                onClick={(e) =>
                  openLightbox(
                    e,
                    wakil.name,
                    wakil.role,
                    getEffectivePhoto(wakil.name, wakil.photoUrl)
                  )
                }
                className="relative w-full aspect-[3/4] rounded-xl bg-[#1b2b3f] border border-[#4cd7f6]/30 overflow-hidden mb-3.5 group/photo cursor-pointer shadow-md transform transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-105 sm:hover:scale-110 hover:z-30 hover:border-[#4cd7f6] hover:shadow-2xl hover:shadow-[#4cd7f6]/40"
              >
                <img
                  src={getEffectivePhoto(wakil.name, wakil.photoUrl)}
                  alt={wakil.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/photo:scale-110"
                />
                <div className="absolute inset-0 bg-[#000f21]/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-[#000f21]/85 backdrop-blur-sm text-[#4cd7f6] font-mono text-[11px] border border-[#4cd7f6]/30">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Perbesar</span>
                  </div>
                </div>
              </div>

              <span className="font-mono text-[11px] text-[#4cd7f6] uppercase tracking-wider font-semibold block mb-0.5">
                {wakil.title}
              </span>
              <h4 className="font-headline font-bold text-base sm:text-lg text-[#d3e4fe] group-hover:text-[#4cd7f6] transition-colors">
                {wakil.name}
              </h4>
              <p className="text-xs sm:text-sm text-[#c6c6cd] mt-1 leading-snug">{wakil.description}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#45464d]/20 font-mono text-xs text-[#c6c6cd]">
              {wakil.status}
            </div>
          </div>

          {/* Sekretaris with Shift & Enlarge Effect */}
          <div
            onClick={() => setSelectedStudent(sekretaris.name)}
            className={`rounded-2xl p-5 bg-[#102034]/80 border backdrop-blur-xl flex flex-col justify-between group transition-all duration-300 ease-out cursor-pointer hover:-translate-y-3 hover:scale-[1.02] hover:border-[#4cd7f6] hover:shadow-2xl hover:shadow-[#4cd7f6]/25 ${
              selectedStudent === sekretaris.name
                ? '-translate-y-3 border-[#4cd7f6] shadow-2xl shadow-[#4cd7f6]/30 ring-2 ring-[#4cd7f6]/50'
                : 'border-[#45464d]/30 shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#1b2b3f] text-[#4cd7f6] border border-[#4cd7f6]/20 font-semibold">
                  {sekretaris.role}
                </span>
                <button
                  onClick={(e) => triggerUploadFor(e, sekretaris.name)}
                  title="Ganti Foto"
                  className="text-[#909097] hover:text-[#4cd7f6] transition-colors p-1"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Photo with Shift & Hover Enlarge */}
              <div
                onClick={(e) =>
                  openLightbox(
                    e,
                    sekretaris.name,
                    sekretaris.role,
                    getEffectivePhoto(sekretaris.name, sekretaris.photoUrl)
                  )
                }
                className="relative w-full aspect-[3/4] rounded-xl bg-[#1b2b3f] border border-[#4cd7f6]/30 overflow-hidden mb-3.5 group/photo cursor-pointer shadow-md transform transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-105 sm:hover:scale-110 hover:z-30 hover:border-[#4cd7f6] hover:shadow-2xl hover:shadow-[#4cd7f6]/40"
              >
                <img
                  src={getEffectivePhoto(sekretaris.name, sekretaris.photoUrl)}
                  alt={sekretaris.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/photo:scale-110"
                />
                <div className="absolute inset-0 bg-[#000f21]/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-[#000f21]/85 backdrop-blur-sm text-[#4cd7f6] font-mono text-[11px] border border-[#4cd7f6]/30">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Perbesar</span>
                  </div>
                </div>
              </div>

              <span className="font-mono text-[11px] text-[#4cd7f6] uppercase tracking-wider font-semibold block mb-0.5">
                {sekretaris.title}
              </span>
              <h4 className="font-headline font-bold text-base sm:text-lg text-[#d3e4fe] group-hover:text-[#4cd7f6] transition-colors">
                {sekretaris.name}
              </h4>
              <p className="text-xs sm:text-sm text-[#c6c6cd] mt-1 leading-snug">{sekretaris.description}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#45464d]/20 font-mono text-xs text-[#c6c6cd]">
              {sekretaris.status}
            </div>
          </div>

          {/* Bendahara 1 & Bendahara 2 (Separate Full Cards with Large Photos) */}
          {BENDAHARA_STUDENTS.map((bendahara) => (
            <div
              key={bendahara.name}
              onClick={() => setSelectedStudent(bendahara.name)}
              className={`rounded-2xl p-5 bg-[#102034]/80 border backdrop-blur-xl flex flex-col justify-between group transition-all duration-300 ease-out cursor-pointer hover:-translate-y-3 hover:scale-[1.02] hover:border-[#4edea3] hover:shadow-2xl hover:shadow-[#4edea3]/25 ${
                selectedStudent === bendahara.name
                  ? '-translate-y-3 border-[#4edea3] shadow-2xl shadow-[#4edea3]/30 ring-2 ring-[#4edea3]/50'
                  : 'border-[#45464d]/30 shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#1b2b3f] text-[#4edea3] border border-[#4edea3]/20 font-semibold">
                    {bendahara.role}
                  </span>
                  <button
                    onClick={(e) => triggerUploadFor(e, bendahara.name)}
                    title="Ganti Foto"
                    className="text-[#909097] hover:text-[#4edea3] transition-colors p-1"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Photo with Shift & Hover Enlarge */}
                <div
                  onClick={(e) =>
                    openLightbox(
                      e,
                      bendahara.name,
                      bendahara.role,
                      getEffectivePhoto(bendahara.name, bendahara.photoUrl)
                    )
                  }
                  className="relative w-full aspect-[3/4] rounded-xl bg-[#1b2b3f] border border-[#4edea3]/40 overflow-hidden mb-3.5 group/photo cursor-pointer shadow-md transform transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-105 sm:hover:scale-110 hover:z-30 hover:border-[#4edea3] hover:shadow-2xl hover:shadow-[#4edea3]/40"
                >
                  <img
                    src={getEffectivePhoto(bendahara.name, bendahara.photoUrl)}
                    alt={bendahara.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/photo:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#000f21]/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-[#000f21]/85 backdrop-blur-sm text-[#4edea3] font-mono text-[11px] border border-[#4edea3]/30">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Perbesar</span>
                    </div>
                  </div>
                </div>

                <span className="font-mono text-[11px] text-[#4edea3] uppercase tracking-wider font-semibold block mb-0.5">
                  {bendahara.title}
                </span>
                <h4 className="font-headline font-bold text-base sm:text-lg text-[#d3e4fe] group-hover:text-[#4edea3] transition-colors">
                  {bendahara.name}
                </h4>
                <p className="text-xs sm:text-sm text-[#c6c6cd] mt-1 leading-snug">{bendahara.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#45464d]/20 font-mono text-xs text-[#c6c6cd]">
                {bendahara.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TIER 2: 8 PENANGGUNG JAWAB MATA KULIAH (PJ MATKUL) */}
      <div className="mb-16 scroll-mt-20" id="kontak-pj">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-[#4edea3] bg-[#4edea3]/10 px-3 py-1 rounded-md border border-[#4edea3]/20 font-bold">
            TIER 2
          </span>
          <h3 className="font-headline font-semibold text-xl sm:text-2xl text-[#d3e4fe]">
            8 Penanggung Jawab Mata Kuliah (PJ Matkul)
          </h3>
          <div className="flex-1 h-px bg-[#45464d]/20"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PJ_STUDENTS.map((pj) => {
            const photoSrc = getEffectivePhoto(pj.name, pj.photoUrl);
            const isSelected = selectedStudent === pj.name;
            return (
              <div
                key={pj.role}
                onClick={() => {
                  setSelectedStudent(pj.name);
                  onOpenWhatsAppModalWithPJ(pj);
                }}
                className={`p-5 rounded-2xl bg-[#102034]/70 border transition-all duration-300 ease-out flex flex-col justify-between group shadow-lg cursor-pointer transform hover:-translate-y-3 hover:scale-[1.02] hover:border-[#4cd7f6] hover:shadow-2xl hover:shadow-[#4cd7f6]/30 ${
                  isSelected
                    ? '-translate-y-3 border-[#4cd7f6] shadow-2xl shadow-[#4cd7f6]/35 ring-2 ring-[#4cd7f6]/50'
                    : 'border-[#45464d]/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[11px] text-[#4cd7f6] bg-[#4cd7f6]/10 px-2 py-0.5 rounded border border-[#4cd7f6]/20 font-semibold truncate">
                      {pj.role}
                    </span>
                    <button
                      onClick={(e) => triggerUploadFor(e, pj.name)}
                      title="Ganti Foto"
                      className="text-[#909097] hover:text-[#4cd7f6] p-1 shrink-0 transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Photo Container with Choose Shift & Hover Enlarge */}
                  <div
                    onClick={(e) => {
                      if (photoSrc) {
                        openLightbox(e, pj.name, pj.role, photoSrc);
                      } else {
                        triggerUploadFor(e, pj.name);
                      }
                    }}
                    className="relative w-full aspect-[3/4] rounded-xl border border-[#4cd7f6]/30 overflow-hidden mb-3.5 group/photo shadow-md bg-[#000f21] transform transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-105 sm:hover:scale-110 hover:z-30 hover:border-[#4cd7f6] hover:shadow-2xl hover:shadow-[#4cd7f6]/40"
                  >
                    {photoSrc ? (
                      <img
                        src={photoSrc}
                        alt={pj.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/photo:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1b2b3f]/70 text-[#4cd7f6] p-4 text-center">
                        <div className="w-16 h-16 rounded-full bg-[#4cd7f6]/10 border-2 border-[#4cd7f6]/30 flex items-center justify-center font-mono font-bold text-xl text-[#4cd7f6] mb-2 shadow-inner">
                          {pj.name
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </div>
                        <span className="font-mono text-xs text-[#c6c6cd]">Belum ada foto</span>
                        <span className="text-[11px] text-[#4edea3] mt-1 flex items-center gap-1 font-mono">
                          <Upload className="w-3 h-3" /> Klik unggah foto
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-[#000f21]/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-[#000f21]/85 backdrop-blur-sm text-[#4cd7f6] font-mono text-[11px] border border-[#4cd7f6]/30">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>{photoSrc ? 'Perbesar' : 'Unggah Foto'}</span>
                      </div>
                    </div>
                  </div>

                  <h4 className="font-headline font-bold text-base sm:text-lg text-[#d3e4fe] group-hover:text-[#4cd7f6] transition-colors">
                    {pj.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#c6c6cd] mt-1 leading-snug">
                    Dosen: {pj.dosen}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#45464d]/20 flex items-center justify-between font-mono text-xs text-[#909097]">
                  <span>Hari: {pj.day}</span>
                  <span className="text-[#4cd7f6] font-medium">{pj.room}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TIER 3: 11 MAHASISWA ANGGOTA KELAS */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-[#c6c6cd] bg-[#1b2b3f] px-3 py-1 rounded-md border border-[#45464d]/20 font-bold">
            TIER 3
          </span>
          <h3 className="font-headline font-semibold text-xl sm:text-2xl text-[#d3e4fe]">
            Anggota Mahasiswa Aktif TI-3A (11 Rekan Mahasiswa)
          </h3>
          <div className="flex-1 h-px bg-[#45464d]/20"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {MEMBER_STUDENTS.map((student) => {
            const photoSrc = getEffectivePhoto(student.name, student.photoUrl);
            const isSelected = selectedStudent === student.name;
            return (
              <div
                key={student.name}
                onClick={() => setSelectedStudent(student.name)}
                className={`p-3.5 rounded-xl bg-[#102034]/60 border transition-all duration-300 ease-out flex flex-col justify-between group shadow-sm cursor-pointer transform hover:-translate-y-2.5 hover:scale-[1.03] hover:border-[#4cd7f6] hover:shadow-xl hover:shadow-[#4cd7f6]/25 ${
                  isSelected
                    ? '-translate-y-2.5 border-[#4cd7f6] shadow-xl shadow-[#4cd7f6]/30 ring-1 ring-[#4cd7f6]/50'
                    : 'border-[#45464d]/25'
                }`}
              >
                <div>
                  {/* Photo Container with Shift & Hover Enlarge */}
                  <div
                    onClick={(e) => {
                      if (photoSrc && !brokenImages[student.name]) {
                        openLightbox(e, student.name, student.role, photoSrc);
                      } else {
                        triggerUploadFor(e, student.name);
                      }
                    }}
                    className="relative w-full aspect-[3/4] rounded-lg bg-[#1b2b3f] border border-[#45464d]/30 overflow-hidden mb-2.5 cursor-pointer group/photo shadow-inner transform transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-110 sm:hover:scale-115 hover:z-30 hover:border-[#4cd7f6] hover:shadow-xl hover:shadow-[#4cd7f6]/40"
                  >
                    {photoSrc && !brokenImages[student.name] ? (
                      <img
                        src={photoSrc}
                        alt={student.name}
                        referrerPolicy="no-referrer"
                        onError={() => setBrokenImages((prev) => ({ ...prev, [student.name]: true }))}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/photo:scale-115"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1b2b3f]/70 text-[#4cd7f6] p-2 text-center">
                        <div className="w-12 h-12 rounded-full bg-[#4cd7f6]/10 border border-[#4cd7f6]/30 flex items-center justify-center font-mono font-bold text-sm text-[#4cd7f6] mb-1.5 shadow-inner">
                          {student.initials || student.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-mono text-[10px] text-[#909097]">Belum ada foto</span>
                        <span className="text-[10px] text-[#4edea3] mt-0.5 flex items-center gap-0.5 font-mono">
                          <Upload className="w-2.5 h-2.5" /> Unggah
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-[#000f21]/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 className="w-3.5 h-3.5 text-[#4cd7f6]" />
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-1">
                    <h5 className="text-xs sm:text-sm font-semibold text-[#d3e4fe] leading-snug truncate flex-1 group-hover:text-[#4cd7f6] transition-colors">
                      {student.name}
                    </h5>
                    <div className="flex items-center gap-1 shrink-0">
                      {customPhotos[student.name] && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const updated = { ...customPhotos };
                            delete updated[student.name];
                            setCustomPhotos(updated);
                            try {
                              localStorage.setItem('averion_custom_photos', JSON.stringify(updated));
                            } catch {}
                          }}
                          title="Kembalikan ke foto data.ts"
                          className="text-[10px] text-[#f43f5e] hover:text-[#fb7185] px-1 py-0.5 rounded bg-[#f43f5e]/10 border border-[#f43f5e]/20"
                        >
                          Reset
                        </button>
                      )}
                      <button
                        onClick={(e) => triggerUploadFor(e, student.name)}
                        title="Ganti Foto"
                        className="text-[#909097] hover:text-[#4cd7f6] p-0.5 transition-colors"
                      >
                        <Camera className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-[#45464d]/20 flex items-center justify-between font-mono text-[11px] text-[#909097]">
                  <span>{student.role}</span>
                  <span className="text-[#4cd7f6] font-semibold">{student.initials}</span>
                </div>
              </div>
            );
          })}

          {/* Total Count Badge Tile */}
          <div className="p-4 rounded-xl bg-[#4cd7f6]/10 border border-[#4cd7f6]/30 flex flex-col items-center justify-center text-center gap-2 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#4cd7f6]/20">
            <CheckCircle2 className="w-6 h-6 text-[#4cd7f6]" />
            <span className="font-mono text-xs text-[#4cd7f6] font-bold">
              24 Total Mahasiswa
            </span>
            <span className="font-mono text-[11px] text-[#909097]">Angkatan 2025</span>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal for viewing high-res student photos */}
      {lightbox.isOpen && (
        <div
          onClick={() => setLightbox({ isOpen: false, name: '', role: '', photoUrl: '' })}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000f21]/85 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full bg-[#102034] border border-[#4cd7f6]/40 rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#45464d]/30">
              <div>
                <h3 className="font-headline font-bold text-lg text-[#d3e4fe]">{lightbox.name}</h3>
                <span className="font-mono text-xs text-[#4cd7f6]">{lightbox.role}</span>
              </div>
              <button
                onClick={() => setLightbox({ isOpen: false, name: '', role: '', photoUrl: '' })}
                className="p-1 rounded-lg text-[#909097] hover:text-[#d3e4fe] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-[#000f21] border border-[#45464d]/30 shadow-inner">
              <img
                src={lightbox.photoUrl}
                alt={lightbox.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="font-mono text-xs text-[#c6c6cd]">TI-3A UMMI • 2025</span>
              <button
                onClick={(e) => {
                  setLightbox({ isOpen: false, name: '', role: '', photoUrl: '' });
                  triggerUploadFor(e, lightbox.name);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#1b2b3f] hover:bg-[#4cd7f6]/20 text-[#4cd7f6] border border-[#4cd7f6]/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                Ganti Foto Ini
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
