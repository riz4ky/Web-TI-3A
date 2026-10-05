import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  RotateCw,
  Users,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Sparkles,
  Trophy,
  ArrowRight,
  Shuffle,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import { GROUP_DIV_STUDENTS } from '../data.ts';

// Cyberpunk neon palette for wheel segments and group cards
const SLICE_COLORS = [
  '#0284c7', // Sky Blue
  '#0d9488', // Teal
  '#16a34a', // Emerald
  '#d97706', // Amber
  '#ea580c', // Orange
  '#dc2626', // Red
  '#c026d3', // Fuchsia
  '#7c3aed', // Violet
  '#2563eb', // Blue
  '#059669', // Mint
  '#e11d48', // Rose
  '#4f46e5', // Indigo
];

const GROUP_COLORS = [
  { border: 'border-[#4cd7f6]/60', bg: 'bg-[#4cd7f6]/10', text: 'text-[#4cd7f6]', glow: 'shadow-[#4cd7f6]/20' },
  { border: 'border-[#4edea3]/60', bg: 'bg-[#4edea3]/10', text: 'text-[#4edea3]', glow: 'shadow-[#4edea3]/20' },
  { border: 'border-[#38bdf8]/60', bg: 'bg-[#38bdf8]/10', text: 'text-[#38bdf8]', glow: 'shadow-[#38bdf8]/20' },
  { border: 'border-[#f59e0b]/60', bg: 'bg-[#f59e0b]/10', text: 'text-[#f59e0b]', glow: 'shadow-[#f59e0b]/20' },
  { border: 'border-[#ec4899]/60', bg: 'bg-[#ec4899]/10', text: 'text-[#ec4899]', glow: 'shadow-[#ec4899]/20' },
  { border: 'border-[#a855f7]/60', bg: 'bg-[#a855f7]/10', text: 'text-[#a855f7]', glow: 'shadow-[#a855f7]/20' },
  { border: 'border-[#14b8a6]/60', bg: 'bg-[#14b8a6]/10', text: 'text-[#14b8a6]', glow: 'shadow-[#14b8a6]/20' },
  { border: 'border-[#f43f5e]/60', bg: 'bg-[#f43f5e]/10', text: 'text-[#f43f5e]', glow: 'shadow-[#f43f5e]/20' },
  { border: 'border-[#818cf8]/60', bg: 'bg-[#818cf8]/10', text: 'text-[#818cf8]', glow: 'shadow-[#818cf8]/20' },
  { border: 'border-[#fbbf24]/60', bg: 'bg-[#fbbf24]/10', text: 'text-[#fbbf24]', glow: 'shadow-[#fbbf24]/20' },
  { border: 'border-[#2dd4bf]/60', bg: 'bg-[#2dd4bf]/10', text: 'text-[#2dd4bf]', glow: 'shadow-[#2dd4bf]/20' },
  { border: 'border-[#c084fc]/60', bg: 'bg-[#c084fc]/10', text: 'text-[#c084fc]', glow: 'shadow-[#c084fc]/20' },
];

export const GroupSpinSection: React.FC = () => {
  const [numGroups, setNumGroups] = useState<number>(4);
  const [subjectName, setSubjectName] = useState<string>('Tugas Perkuliahan');
  const [remainingStudents, setRemainingStudents] = useState<string[]>([...GROUP_DIV_STUDENTS]);
  const [groups, setGroups] = useState<string[][]>(Array.from({ length: 4 }, () => []));
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0); // 0 = Kelompok 1, 1 = Kelompok 2, etc.
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [lastSelected, setLastSelected] = useState<{ student: string; groupNum: number } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotationAngleRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize group arrays when number of groups changes (only if no students assigned yet)
  const handleGroupCountChange = (newCount: number) => {
    if (isSpinning) return;
    const clamped = Math.max(2, Math.min(12, newCount));
    setNumGroups(clamped);
    // Reset groups
    setGroups(Array.from({ length: clamped }, () => []));
    setRemainingStudents([...GROUP_DIV_STUDENTS]);
    setCurrentRoundIndex(0);
    setLastSelected(null);
  };

  // Sound generator using Web Audio API
  const playClickSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio might be blocked on some browsers
    }
  }, [soundEnabled]);

  const playWinSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const notes = [440, 554.37, 659.25, 880]; // A major arpeggio
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
      });
    } catch {
      // ignore
    }
  }, [soundEnabled]);

  // Draw wheel on canvas
  const drawWheel = useCallback((currentRotation: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 16;

    ctx.clearRect(0, 0, width, height);

    const count = remainingStudents.length;
    if (count === 0) {
      // Wheel finished state
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#102034';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#4edea3';
      ctx.stroke();

      ctx.fillStyle = '#4edea3';
      ctx.font = 'bold 18px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Semua 24 Mahasiswa', centerX, centerY - 14);
      ctx.fillStyle = '#d3e4fe';
      ctx.font = '14px Inter, sans-serif';
      ctx.fillText('Telah Terbagi Selesai!', centerX, centerY + 14);
      return;
    }

    const arcSize = (2 * Math.PI) / count;

    // Draw slices
    for (let i = 0; i < count; i++) {
      const angle = currentRotation + i * arcSize;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle, angle + arcSize);
      ctx.closePath();

      // Alternating slice colors
      ctx.fillStyle = SLICE_COLORS[i % SLICE_COLORS.length];
      ctx.fill();

      // Slice inner border
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#000f21';
      ctx.stroke();

      // Text label inside slice
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle + arcSize / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';

      // Adjust font size based on number of remaining students
      const fontSize = count > 16 ? 10 : count > 10 ? 11 : 13;
      ctx.font = `600 ${fontSize}px Inter, sans-serif`;

      // Truncate name if long to fit slice
      const fullName = remainingStudents[i];
      let displayName = fullName;
      if (count > 16 && fullName.length > 14) {
        displayName = fullName.split(' ').slice(0, 2).join(' ');
      }
      ctx.fillText(displayName, radius - 18, 0);
      ctx.restore();
    }

    // Outer glow ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#4cd7f6';
    ctx.stroke();

    // Center Hub
    ctx.beginPath();
    ctx.arc(centerX, centerY, 34, 0, 2 * Math.PI);
    ctx.fillStyle = '#000f21';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#4cd7f6';
    ctx.stroke();

    // Center Hub Glow Text
    ctx.fillStyle = '#4cd7f6';
    ctx.font = 'bold 11px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TI-3A', centerX, centerY - 6);
    ctx.fillStyle = '#4edea3';
    ctx.font = 'bold 9px JetBrains Mono, monospace';
    ctx.fillText(`K-${(currentRoundIndex % numGroups) + 1}`, centerX, centerY + 8);
  }, [remainingStudents, currentRoundIndex, numGroups]);

  // Redraw when remainingStudents or roundIndex changes
  useEffect(() => {
    drawWheel(rotationAngleRef.current);
  }, [drawWheel, remainingStudents]);

  // Main Spin action
  const handleSpin = () => {
    if (isSpinning || remainingStudents.length === 0) return;

    setIsSpinning(true);
    setLastSelected(null);

    const totalStudents = remainingStudents.length;
    const sliceAngle = (2 * Math.PI) / totalStudents;

    // Pick random winning student index
    const winningIndex = Math.floor(Math.random() * totalStudents);

    // Target pointer is at the TOP (angle = 3 * Math.PI / 2 or -Math.PI / 2)
    // When wheel rotates by totalRotation, slice at index `i` is between
    // totalRotation + i * sliceAngle and totalRotation + (i + 1) * sliceAngle
    // To land on winningIndex:
    // (totalRotation + winningIndex * sliceAngle + sliceAngle / 2) % (2 * PI) = 3 * PI / 2
    const targetPointerAngle = (3 * Math.PI) / 2;
    const currentRot = rotationAngleRef.current % (2 * Math.PI);

    // Full spins between 5 and 8 revolutions
    const extraSpins = (5 + Math.floor(Math.random() * 3)) * 2 * Math.PI;

    // Calculate exact target rotation
    let targetAngle = targetPointerAngle - (winningIndex * sliceAngle + sliceAngle / 2);
    while (targetAngle < currentRot) {
      targetAngle += 2 * Math.PI;
    }
    const finalRotation = targetAngle + extraSpins;

    const startRotation = rotationAngleRef.current;
    const totalDistance = finalRotation - startRotation;
    const duration = 4000; // 4 seconds
    const startTime = performance.now();
    let lastTickAngle = startRotation;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Ease out cubic deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentAngle = startRotation + totalDistance * easeOut;
      rotationAngleRef.current = currentAngle;

      drawWheel(currentAngle);

      // Ticker sound on crossing each slice
      if (Math.abs(currentAngle - lastTickAngle) >= sliceAngle * 0.75) {
        playClickSound();
        lastTickAngle = currentAngle;
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Spin finished!
        setIsSpinning(false);
        playWinSound();

        const selectedStudent = remainingStudents[winningIndex];
        const assignedGroup = (currentRoundIndex % numGroups);

        // Put student into group
        setGroups((prev) => {
          const updated = prev.map((grp) => [...grp]);
          updated[assignedGroup].push(selectedStudent);
          return updated;
        });

        // Remove student from remaining
        const nextRemaining = remainingStudents.filter((_, idx) => idx !== winningIndex);
        setRemainingStudents(nextRemaining);

        // Set last selected notification
        setLastSelected({
          student: selectedStudent,
          groupNum: assignedGroup + 1,
        });

        // Advance to next round index
        setCurrentRoundIndex((prev) => prev + 1);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Quick Randomize All (Fast Auto-Spin to divide all remaining students in round-robin)
  const handleAutoDivideAll = () => {
    if (isSpinning || remainingStudents.length === 0) return;

    // Fisher-Yates shuffle remaining students for true randomness
    const shuffled = [...remainingStudents];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const updatedGroups = groups.map((g) => [...g]);
    let round = currentRoundIndex;

    shuffled.forEach((student) => {
      const targetGroup = round % numGroups;
      updatedGroups[targetGroup].push(student);
      round++;
    });

    setGroups(updatedGroups);
    setRemainingStudents([]);
    setCurrentRoundIndex(round);
    setLastSelected({
      student: `Semua ${shuffled.length} Mahasiswa`,
      groupNum: numGroups,
    });
    playWinSound();
  };

  // Reset everything
  const handleReset = () => {
    if (isSpinning) return;
    setGroups(Array.from({ length: numGroups }, () => []));
    setRemainingStudents([...GROUP_DIV_STUDENTS]);
    setCurrentRoundIndex(0);
    setLastSelected(null);
    rotationAngleRef.current = 0;
    drawWheel(0);
  };

  // Copy to WhatsApp message
  const handleCopyWhatsApp = () => {
    let text = `HASIL PEMBAGIAN KELOMPOK KELAS-3A TI\n`;
    text += `Mata Kuliah / Kegiatan: ${subjectName}\n`;
    text += `Total Mahasiswa: 24 Orang | Jumlah Kelompok: ${numGroups} Kelompok\n`;
    text += `Sistem: Polling Acak Spin Wheel\n`;
    text += `Universitas Muhammadiyah Sukabumi\n\n`;

    groups.forEach((grp, idx) => {
      text += `*👥 KELOMPOK ${idx + 1} (${grp.length} Anggota):*\n`;
      if (grp.length === 0) {
        text += `   _(Belum ada anggota)_\n`;
      } else {
        grp.forEach((name, sIdx) => {
          text += `   ${sIdx + 1}. ${name}\n`;
        });
      }
      text += `\n`;
    });

    text += `Dibuat secara adil melalui Portal TI-3A Averion Tech.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const nextTargetGroupNumber = (currentRoundIndex % numGroups) + 1;
  const isComplete = remainingStudents.length === 0;

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 scroll-mt-20" id="bagi-kelompok">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b2b3f] border border-[#4cd7f6]/30 text-[#4cd7f6] font-mono text-xs uppercase tracking-wider mb-3 font-semibold shadow-md">
          <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Interactive Spin Polling</span>
        </div>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-[#d3e4fe] tracking-tight">
          Polling Pembagian Kelompok Mata Kuliah
        </h2>
        <p className="text-sm sm:text-base text-[#c6c6cd] mt-2 leading-relaxed">
          Pembagian kelompok secara adil dan transparan menggunakan model roda putar.
          Setiap putaran akan memasukkan mahasiswa yang terpilih ke kelompok secara bergiliran.
        </p>
      </div>

      {/* Control Configuration Bar */}
      <div className="mb-10 p-5 rounded-2xl bg-[#102034]/80 border border-[#45464d]/30 backdrop-blur-xl shadow-xl flex flex-col lg:flex-row items-center justify-between gap-5">
        {/* Subject Name Input */}
        <div className="w-full lg:w-auto flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <label className="font-mono text-xs text-[#909097] flex items-center gap-1.5 shrink-0">
            <BookOpen className="w-4 h-4 text-[#4cd7f6]" />
            <span>Mata Kuliah / Tugas:</span>
          </label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            placeholder="Contoh: Rekayasa Perangkat Lunak / IMK"
            className="w-full sm:max-w-xs px-3.5 py-2 rounded-xl bg-[#000f21] border border-[#45464d]/40 text-sm text-[#d3e4fe] focus:border-[#4cd7f6] focus:outline-none font-sans"
          />
        </div>

        {/* Number of Groups Preset Selector */}
        <div className="w-full lg:w-auto flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-[#909097] mr-1">Jumlah Kelompok:</span>
          {[2, 3, 4, 6, 8].map((count) => (
            <button
              key={count}
              disabled={isSpinning}
              onClick={() => handleGroupCountChange(count)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
                numGroups === count
                  ? 'bg-[#4cd7f6] text-[#000f21] shadow-md shadow-[#4cd7f6]/30'
                  : 'bg-[#1b2b3f] text-[#c6c6cd] hover:text-[#4cd7f6] border border-[#45464d]/30'
              }`}
            >
              {count} Kelompok
            </button>
          ))}

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Matikan Suara Spin' : 'Nyalakan Suara Spin'}
            className="p-2 rounded-lg bg-[#1b2b3f] hover:bg-[#2a3a4f] text-[#909097] hover:text-[#4cd7f6] border border-[#45464d]/30 transition-colors ml-2 cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#4edea3]" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Grid: Wheel on Left & Group Cards on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Spin Wheel Canvas & Target Indicator */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#102034]/70 border border-[#45464d]/40 backdrop-blur-xl shadow-2xl flex flex-col items-center">
            {/* Target Round Notification Banner */}
            <div className="w-full mb-4 py-2 px-3 rounded-xl bg-[#000f21] border border-[#4cd7f6]/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-ping"></span>
                <span className="font-mono text-[#909097]">Target Putaran Ini:</span>
              </div>
              <span className="font-mono font-bold text-sm text-[#4edea3] px-2 py-0.5 rounded bg-[#4edea3]/10 border border-[#4edea3]/20">
                Kelompok {nextTargetGroupNumber}
              </span>
            </div>

            {/* Spin Wheel Container with Pointer Needle */}
            <div className="relative w-full aspect-square max-w-[360px] flex items-center justify-center my-2">
              {/* Top Pointer Indicator Arrow */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none drop-shadow-lg">
                <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-[#ffb4ab]"></div>
                <div className="w-2 h-2 rounded-full bg-[#ffb4ab] -mt-1 shadow-md"></div>
              </div>

              {/* HTML5 Canvas */}
              <canvas
                ref={canvasRef}
                width={700}
                height={700}
                className="w-full h-full rounded-full transition-transform duration-75 select-none"
              />
            </div>

            {/* Status Statistics */}
            <div className="w-full grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#45464d]/30 text-center font-mono text-xs">
              <div className="flex flex-col">
                <span className="text-[#909097] text-[10px]">Sisa Roda</span>
                <span className="text-sm font-bold text-[#d3e4fe]">{remainingStudents.length}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#909097] text-[10px]">Terbagi</span>
                <span className="text-sm font-bold text-[#4edea3]">
                  {GROUP_DIV_STUDENTS.length - remainingStudents.length}/24
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#909097] text-[10px]">Total Kelompok</span>
                <span className="text-sm font-bold text-[#4cd7f6]">{numGroups}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full flex flex-col gap-2.5 mt-5">
              <button
                disabled={isSpinning || isComplete}
                onClick={handleSpin}
                className={`w-full py-3.5 px-4 rounded-xl font-headline font-bold text-base flex items-center justify-center gap-2 shadow-xl transition-all duration-200 active:scale-95 cursor-pointer ${
                  isComplete
                    ? 'bg-[#1b2b3f] text-[#909097] cursor-not-allowed border border-[#45464d]/30'
                    : 'bg-gradient-to-r from-[#4cd7f6] to-[#4edea3] hover:from-[#acedff] hover:to-[#7cf1be] text-[#000f21] shadow-[#4cd7f6]/25 hover:shadow-[#4cd7f6]/40'
                }`}
              >
                <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>
                  {isComplete
                    ? 'Semua Mahasiswa Terbagi'
                    : isSpinning
                    ? 'Sedang Memutar Roda...'
                    : `Putar Spin untuk Kelompok ${nextTargetGroupNumber}`}
                </span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  disabled={isSpinning || isComplete}
                  onClick={handleAutoDivideAll}
                  title="Bagi otomatis seluruh sisa mahasiswa"
                  className="py-2.5 px-3 rounded-lg bg-[#1b2b3f] hover:bg-[#22354c] text-[#4cd7f6] hover:text-[#acedff] border border-[#4cd7f6]/40 hover:border-[#4cd7f6] font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md hover:shadow-[#4cd7f6]/20"
                >
                  <Shuffle className="w-3.5 h-3.5 text-[#4edea3]" />
                  <span>Acak Otomatis</span>
                </button>

                <button
                  disabled={isSpinning}
                  onClick={handleReset}
                  title="Kembalikan semua mahasiswa ke roda spin"
                  className="py-2.5 px-3 rounded-lg bg-[#1b2b3f] hover:bg-[#f43f5e]/20 text-[#c6c6cd] hover:text-[#fb7185] border border-[#45464d]/30 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Reset Roda</span>
                </button>
              </div>
            </div>

            {/* Last Won Announcement Banner */}
            {lastSelected && (
              <div className="w-full mt-4 p-3 rounded-xl bg-[#4edea3]/10 border border-[#4edea3]/30 flex items-center gap-3 animate-bounce">
                <div className="w-8 h-8 rounded-lg bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3] shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left text-xs leading-snug">
                  <div className="text-[#c6c6cd]">Putaran Berhasil:</div>
                  <div className="text-[#d3e4fe] font-bold">
                    {lastSelected.student}{' '}
                    <span className="text-[#4edea3]"> Kelompok {lastSelected.groupNum}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Divided Groups Grid & Export Toolbar */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Header Action Row */}
          <div className="p-4 rounded-xl bg-[#102034]/70 border border-[#45464d]/30 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#4cd7f6]" />
              <span className="font-headline font-semibold text-sm sm:text-base text-[#d3e4fe]">
                Hasil Pembagian Kelompok ({numGroups} Kelompok)
              </span>
            </div>

            <button
              onClick={handleCopyWhatsApp}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#4edea3] hover:bg-[#7cf1be] text-[#000f21] font-mono text-xs font-bold shadow-lg shadow-[#4edea3]/20 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#000f21]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Format WhatsApp'}</span>
            </button>
          </div>

          {/* Group Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {groups.map((members, groupIndex) => {
              const groupNum = groupIndex + 1;
              const isTargetNext = !isComplete && nextTargetGroupNumber === groupNum;
              const color = GROUP_COLORS[groupIndex % GROUP_COLORS.length];
              const idealCount = Math.ceil(GROUP_DIV_STUDENTS.length / numGroups);

              return (
                <div
                  key={groupIndex}
                  className={`p-4 rounded-xl bg-[#102034]/80 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                    isTargetNext
                      ? `${color.border} ring-2 ring-[#4cd7f6]/50 shadow-xl ${color.glow}`
                      : 'border-[#45464d]/30 hover:border-[#4cd7f6]/40'
                  }`}
                >
                  {/* Target Badge on Card */}
                  {isTargetNext && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 font-mono text-[10px] text-[#4cd7f6] bg-[#4cd7f6]/10 px-2 py-0.5 rounded border border-[#4cd7f6]/30">
                      <ArrowRight className="w-3 h-3" />
                      <span>Target Berikutnya</span>
                    </div>
                  )}

                  <div>
                    {/* Group Header */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`w-7 h-7 rounded-lg ${color.bg} ${color.text} border ${color.border} flex items-center justify-center font-mono font-bold text-xs`}
                      >
                        {groupNum}
                      </span>
                      <div>
                        <h4 className="font-headline font-bold text-sm text-[#d3e4fe]">
                          Kelompok {groupNum}
                        </h4>
                        <span className="font-mono text-[11px] text-[#909097]">
                          {members.length} / ~{idealCount} Mahasiswa
                        </span>
                      </div>
                    </div>

                    {/* Member List */}
                    <div className="space-y-1.5 min-h-[110px]">
                      {members.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center py-6 text-center text-[#909097] font-mono text-xs border border-dashed border-[#45464d]/30 rounded-lg">
                          <span>Menunggu giliran putaran spin...</span>
                        </div>
                      ) : (
                        members.map((name, mIdx) => (
                          <div
                            key={mIdx}
                            className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-[#000f21]/70 border border-[#45464d]/20 text-xs text-[#d3e4fe] animate-fadeIn"
                          >
                            <span className="flex items-center gap-2">
                              <span className="font-mono text-[10px] text-[#909097] w-4">
                                {mIdx + 1}.
                              </span>
                              <span className="font-medium truncate">{name}</span>
                            </span>
                            <span className="font-mono text-[10px] text-[#4edea3]">Terpilih</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Card Footer Progress */}
                  <div className="mt-3 pt-2.5 border-t border-[#45464d]/20 flex items-center justify-between text-[11px] font-mono text-[#909097]">
                    <span>Status:</span>
                    <span className={members.length >= idealCount ? 'text-[#4edea3] font-semibold' : 'text-[#c6c6cd]'}>
                      {members.length >= idealCount ? 'Lengkap' : `Mengisi...`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Informational Guidance Accordion / Notes */}
          <div className="p-4 rounded-xl bg-[#000f21]/60 border border-[#45464d]/30 text-xs text-[#c6c6cd] flex items-start gap-3">
            <HelpCircle className="w-4 h-4 text-[#4cd7f6] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-[#d3e4fe]">Mekanisme Polling Spin Averion Tech:</span>
              <p className="text-[11px] text-[#909097] leading-relaxed">
                Setiap kali tombol <b className="text-[#4cd7f6]">Putar Spin</b> ditekan, nama mahasiswa yang terpilih akan langsung dialokasikan ke kelompok target secara berurutan sampai seluruh 24 mahasiswa terbagi rata.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
