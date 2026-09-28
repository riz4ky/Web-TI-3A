import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Eye, Send, Copy, Check } from 'lucide-react';
import { ALL_PJ_OPTIONS, SCHEDULE_DATABASE, PJ_STUDENTS } from '../data.ts';
import { CourseItem, CoursePJ } from '../types.ts';

export interface ModalInitialData {
  matkul?: string;
  time?: string;
  rawTime?: string;
  room?: string;
  roomCode?: string;
  dosen?: string;
  phone?: string;
  cleanPhone?: string;
  pjName?: string;
  dayText?: string;
}

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ModalInitialData | null;
}

function getIndonesianGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 11) return 'pagi';
  if (hour >= 11 && hour < 15) return 'siang';
  if (hour >= 15 && hour < 18) return 'sore';
  return 'malam';
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [pjName, setPjName] = useState<string>('Raden Muhammad Rizky');
  const [dayDate, setDayDate] = useState<string>('Senin, 28 September 2026');
  const [matkul, setMatkul] = useState<string>('Kewirausahaan');
  const [time, setTime] = useState<string>('07.00 – 08.40 WIB');
  const [room, setRoom] = useState<string>('A12 (Gedung A)');
  const [lecturerName, setLecturerName] = useState<string>('Aris Juliansyah, M.I.Kom.');
  const [lecturerPhone, setLecturerPhone] = useState<string>('0815-6301-178');
  const [cleanPhone, setCleanPhone] = useState<string>('628156301178');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      if (initialData.pjName) setPjName(initialData.pjName);
      if (initialData.matkul) setMatkul(initialData.matkul);
      if (initialData.time || initialData.rawTime)
        setTime(initialData.time || initialData.rawTime || '07.00 - Selesai');
      if (initialData.room || initialData.roomCode)
        setRoom(initialData.room || initialData.roomCode || 'Ruang Kuliah TI');
      if (initialData.dosen) setLecturerName(initialData.dosen);
      if (initialData.phone) setLecturerPhone(initialData.phone);
      if (initialData.cleanPhone) {
        setCleanPhone(initialData.cleanPhone);
      } else if (initialData.phone) {
        setCleanPhone(initialData.phone.replace(/[^0-9]/g, ''));
      }
      if (initialData.dayText) setDayDate(initialData.dayText);
    }
  }, [initialData]);

  // Synchronize when PJ select changes
  const handlePjChange = (selectedName: string) => {
    setPjName(selectedName);

    // Look for matching course in PJ list or schedule
    const foundPj = PJ_STUDENTS.find((p) => p.name === selectedName);
    if (foundPj) {
      setMatkul(foundPj.course);
      setLecturerName(foundPj.dosen);
      setLecturerPhone(foundPj.phone);
      setCleanPhone(foundPj.cleanPhone);
      setRoom(foundPj.room);
    }
  };

  const greeting = getIndonesianGreeting();

  const generatedMessage = `Assalamualaikum Warahmatullahi Wabarakatuh

Selamat ${greeting} bapak/ibu, Sebelumnya maaf mengganggu waktunya. Izin memperkenalkan diri nama saya ${pjName} mahasiswa dari Program Studi Teknik Informatika kelas 3A izin mengkonfirmasi bapak/ibu terkait mata kuliah ${matkul} kelas 3A akan dilaksanakan pada hari esok:

Tanggal/Hari: ${dayDate}
Pukul : ${time}
Ruangan : ${room}

Sebelumnya terimakasih bapak/ibu mohon maaf telah mengganggu waktunya dan mohon maaf apabila saya mengkonfirmasi bapak/ibu diluar jam pembelajaran🙏

Wassalamualaikum Warahmatullahi Wabarakatuh`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDispatchWhatsApp = () => {
    const rawTarget = cleanPhone.startsWith('0')
      ? '62' + cleanPhone.slice(1)
      : cleanPhone;
    const cleanNumber = rawTarget.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(generatedMessage)}`;
    window.open(waUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000f21]/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#102034] border border-[#4cd7f6]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#45464d]/30 flex items-center justify-between bg-[#1b2b3f]/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#4edea3]/20 text-[#4edea3] flex items-center justify-center">
              <MessageSquare className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg text-[#d3e4fe]">
                Generator Konfirmasi Kuliah
              </h3>
              <p className="font-mono text-xs text-[#c6c6cd]">
                Template Resmi PJ Mahasiswa TI-3A UMMI
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-[#2a3a4f] text-[#c6c6cd] hover:text-[#d3e4fe] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nama PJ / Mahasiswa Selector */}
            <div>
              <label className="block font-mono text-xs text-[#c6c6cd] mb-1.5 font-medium">
                Nama PJ / Mahasiswa:
              </label>
              <select
                value={pjName}
                onChange={(e) => handlePjChange(e.target.value)}
                className="w-full bg-[#000f21] border border-[#45464d]/40 rounded-xl px-3.5 py-2 text-[#d3e4fe] text-xs sm:text-sm focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6] outline-none"
              >
                {ALL_PJ_OPTIONS.map((opt) => (
                  <option key={opt.name} value={opt.name} className="bg-[#102034] text-[#d3e4fe]">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Pilihan Hari / Tanggal Kuliah */}
            <div>
              <label className="block font-mono text-xs text-[#c6c6cd] mb-1.5 font-medium">
                Hari &amp; Tanggal Kuliah:
              </label>
              <input
                type="text"
                value={dayDate}
                onChange={(e) => setDayDate(e.target.value)}
                placeholder="Contoh: Senin, 28 September 2026"
                className="w-full bg-[#000f21] border border-[#45464d]/40 rounded-xl px-3.5 py-2 text-[#d3e4fe] text-xs sm:text-sm focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono text-xs text-[#c6c6cd] mb-1.5 font-medium">
                Mata Kuliah:
              </label>
              <input
                type="text"
                value={matkul}
                onChange={(e) => setMatkul(e.target.value)}
                className="w-full bg-[#000f21] border border-[#45464d]/40 rounded-xl px-3.5 py-2 text-[#d3e4fe] text-xs sm:text-sm focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6] outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-[#c6c6cd] mb-1.5 font-medium">
                Jam Perkuliahan:
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#000f21] border border-[#45464d]/40 rounded-xl px-3.5 py-2 text-[#d3e4fe] text-xs sm:text-sm focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6] outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-[#c6c6cd] mb-1.5 font-medium">
                Ruangan Kuliah:
              </label>
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full bg-[#000f21] border border-[#45464d]/40 rounded-xl px-3.5 py-2 text-[#d3e4fe] text-xs sm:text-sm focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6] outline-none"
              />
            </div>
          </div>

          {/* Lecturer Info & Phone */}
          <div className="p-3 rounded-xl bg-[#000f21] border border-[#45464d]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-mono text-xs text-[#909097]">Dosen Tujuan:</span>
              <div className="text-sm sm:text-base font-semibold text-[#4cd7f6]">
                {lecturerName}
              </div>
            </div>
            <div className="sm:text-right">
              <span className="font-mono text-xs text-[#909097]">Nomor WhatsApp:</span>
              <div className="font-mono text-xs sm:text-sm text-[#4edea3] font-semibold">
                {lecturerPhone}
              </div>
            </div>
          </div>

          {/* WhatsApp Chat Simulation Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-[#4edea3] flex items-center gap-1.5 font-semibold">
                <Eye className="w-3.5 h-3.5" />
                Live Template Preview (WhatsApp Format):
              </span>
              <span className="font-mono text-xs text-[#c6c6cd]">Sesuai SOP Kelas TI-3A</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#001c10]/90 border border-[#4edea3]/20 text-[#d3e4fe] relative shadow-inner">
              <div className="font-mono text-xs text-[#6ffbbe] mb-2 flex items-center justify-between">
                <span>Pesan Terformat:</span>
                <span className="px-2 py-0.5 rounded bg-[#4edea3]/20 text-[#4edea3] text-[11px] font-semibold">
                  Salam: Selamat {greeting}
                </span>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-[#bec6e0] leading-relaxed select-all">
                {generatedMessage}
              </pre>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#45464d]/30 flex flex-wrap items-center justify-end gap-3 bg-[#1b2b3f]/30">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#45464d]/30 hover:bg-[#2a3a4f] text-[#d3e4fe] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Batal
          </button>

          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-[#1b2b3f] hover:bg-[#2a3a4f] text-[#4cd7f6] border border-[#4cd7f6]/40 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#4edea3]" />
                <span className="text-[#4edea3]">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Salin Teks</span>
              </>
            )}
          </button>

          <button
            onClick={handleDispatchWhatsApp}
            className="px-5 py-2.5 rounded-xl bg-[#4edea3] hover:bg-[#6ffbbe] text-[#000f21] font-headline font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#4edea3]/20 transition-all active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Buka WhatsApp Langsung 🚀</span>
          </button>
        </div>
      </div>
    </div>
  );
};
