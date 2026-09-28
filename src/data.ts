import { CourseItem, DayKey, CoursePJ, StudentLeader, StudentMember } from './types.ts';

// Import portrait photos
import aryaImg from './img/ARYA.JPG';
import ketuaAryaImg from './assets/images/ketua_arya_1790599009635.jpg';
import wakilTriyanaImg from './img/yana.JPG';
import sekretarisOmarImg from './img/gabriel.JPG';
import bendaharaPajarImg from './img/jey.JPG';
import bendaharaRaihannisaImg from './img/nisa.JPG';

import radenImg from './img/Raden.JPG';
import pjWirayudhaImg from './img/yuda.JPG';
import pjAlifImg from './img/alif.JPG';
import pjSuciImg from './img/suci.JPG';
import pjFitriaImg from './img/pipit.JPG';
import pjAlfhasaImg from './img/alfhasa.JPG';
import pjMutiiImg from './img/muti.JPG';
import pjKhailaImg from './img/aila.JPG';

// Foto Anggota Mahasiswa (Tier 3)
import memberFaujiImg from './img/fauji.JPG';
import memberFarellImg from './img/farel.JPG';
import memberZahranImg from './img/erga.JPG';
import memberGianImg from './img/gian.JPG';
import memberRaihanImg from './img/raihan.JPG';
import memberFauzanImg from './img/aden.JPG';
import memberWardiImg from './img/gugun.JPG';
import memberAzizahImg from './img/azizah.JPG';
import memberRizkiImg from './img/iki.JPG';
import memberGalihImg from './img/galih.JPG';
import memberSaepulImg from './img/saepul.JPG';

// Foto Bersama Seluruh Kelas TI-3A (Aspek Rasio 16:9)
// Anda dapat memasukkan URL foto online (misal: 'https://.../foto-kelas.jpg')
// atau mengimpor file gambar dari folder './img/kelas.JPG'
import classGroupImg from './img/FOTO BARENG.JPG';
export const CLASS_GROUP_PHOTO = classGroupImg;


export const SCHEDULE_DATABASE: Record<DayKey, CourseItem[]> = {
  SENIN: [
    {
      id: 'senin-1',
      matkul: 'Kewirausahaan',
      time: '07.00 – 08.40 WIB',
      rawTime: '07.00 – 08.40',
      room: 'A12 (Gedung A)',
      roomCode: 'A12',
      dosen: 'Aris Juliansyah, M.I.Kom.',
      phone: '0815-6301-178',
      cleanPhone: '628156301178',
      pjName: 'Raden Muhammad Rizky',
      type: 'Teori',
      typeColor: 'secondary',
    },
  ],
  SELASA: [
    {
      id: 'selasa-1',
      matkul: 'Statistika Informatika',
      time: '07.00 – 09.30 WIB',
      rawTime: '07.00 – 09.30',
      room: 'D13 Lab Statistika',
      roomCode: 'D13 Lab',
      dosen: 'Dr. Iwan Rizal Setiawan, M.T., M.Kom.',
      phone: '0812-9931-6799',
      cleanPhone: '6281299316799',
      pjName: "Muti'I Khairunnisaa",
      type: 'Praktikum / Komputasi',
      typeColor: 'tertiary',
    },
  ],
  RABU: [
    {
      id: 'rabu-1',
      matkul: 'Struktur Data',
      time: '07.50 – 10.20 WIB',
      rawTime: '07.50 – 10.20',
      room: 'E17 Lab Dasar',
      roomCode: 'E17 Lab Dasar',
      dosen: 'Asep Budiman Kusdinar, M.T.',
      phone: '0888-0114-8230',
      cleanPhone: '6288801148230',
      pjName: 'Alfhasa Pratama',
      type: 'Praktikum Inti',
      typeColor: 'tertiary',
    },
    {
      id: 'rabu-2',
      matkul: 'Pemrograman Berorientasi Objek',
      time: '13.00 - 15.30 WIB',
      rawTime: '13.00 - 15.30',
      room: 'E15 Lab Lanjut',
      roomCode: 'E15 Lab Lanjut',
      dosen: 'Prajoko, S.Pd.I., M.Kom.',
      phone: '0813-1421-3870',
      cleanPhone: '6281314213870',
      pjName: 'Khaila Salinaza',
      type: 'Praktikum Rekayasa',
      typeColor: 'tertiary',
    },
    {
      id: 'rabu-3',
      matkul: 'Interaksi Manusia dan Komputer',
      time: '15.30 - 18.00 WIB',
      rawTime: '15.30 - 18.00',
      room: 'D12 Lab Desain',
      roomCode: 'D12 Lab Desain',
      dosen: 'Winda Apriandari, S.T., M.Kom.',
      phone: '0812-8046-3656',
      cleanPhone: '6281280463656',
      pjName: 'Suci Aulia',
      type: 'Praktikum UI/UX',
      typeColor: 'secondary',
    },
  ],
  KAMIS: [
    {
      id: 'kamis-1',
      matkul: 'Kemuhamadiyahan',
      time: '10.20 - 12.00 WIB',
      rawTime: '10.20 - 12.00',
      room: 'B11 (Gedung B)',
      roomCode: 'B11',
      dosen: 'Wahyu Jati Purwito, M.Pd.',
      phone: '0856-2672-095',
      cleanPhone: '628562672095',
      pjName: 'Muhammad Alif',
      type: 'Kuliah Umum Karakter',
      typeColor: 'secondary',
    },
  ],
  JUMAT: [
    {
      id: 'jumat-1',
      matkul: 'Basis Data',
      time: '07.00 - 09.30 WIB',
      rawTime: '07.00 - 09.30',
      room: 'E17 Lab Dasar',
      roomCode: 'E17 Lab Dasar',
      dosen: 'Agung Pambudi, S.Kom., M.Cs.',
      phone: '0851-5508-1881',
      cleanPhone: '6285155081881',
      pjName: 'Fitria Nur Ramadhani',
      type: 'Praktikum Database',
      typeColor: 'tertiary',
    },
    {
      id: 'jumat-2',
      matkul: 'Rekayasa Perangkat Lunak',
      time: '15.30 - 18.00 WIB',
      rawTime: '15.30 - 18.00',
      room: 'E15 Lab Lanjut',
      roomCode: 'E15 Lab Lanjut',
      dosen: 'Asril Adi Sunarto, M.Kom.',
      phone: '0857-1717-0131',
      cleanPhone: '6285717170131',
      pjName: 'Wirayudhabuana Putra',
      type: 'Praktikum Software',
      typeColor: 'secondary',
    },
  ],
};

// URL foto untuk PJ Kewirausahaan (Raden Muhammad Rizky)
// Anda dapat memasukkan tautan (URL) foto online di sini (misal: 'https://.../foto.jpg')
// atau mengimpor file gambar dari folder './img/...'
export const PJ_RADEN_PHOTO_URL = radenImg;
export const HOTLINKED_RADEN_PHOTO = PJ_RADEN_PHOTO_URL;

export const LEADERSHIP_STUDENTS: StudentLeader[] = [
  {
    role: 'Ketua Kelas',
    title: 'Ketua Kelas',
    name: 'Mohamad Arya Zulhaz',
    description: 'Ketua Kelas 3A Tahun Ajaran Ganjil',
    status: 'Status: Pengurus Terpilih',
    phone: '6281200000000',
    photoUrl: aryaImg,
  },
  {
    role: 'Wakil Ketua',
    title: 'Wakil Ketua Kelas',
    name: 'Muhammad Widya Triyana',
    description: 'Wakil Ketuua Kelas 3A Tahun Ajaran Ganjil',
    status: 'TIF-3A • Pengurus',
    photoUrl: wakilTriyanaImg,
  },
  {
    role: 'Sekretaris',
    title: 'Sekretaris, Arsip Dokumen, dan Notulensi Akademik',
    name: 'Ahmad Gabriel Omar',
    description: 'Notulensi Akademik',
    status: 'TIF-3A • Pengurus',
    photoUrl: sekretarisOmarImg,
  },
];

export const BENDAHARA_STUDENTS: StudentLeader[] = [
  {
    role: 'Bendahara 1',
    title: 'Pengelolaan Kas Kelas',
    name: 'Muhammad Pajar',
    description: 'Pengelolaan Kas Kelas',
    status: 'TIF-3A • Pengurus',
    photoUrl: bendaharaPajarImg,
  },
  {
    role: 'Bendahara 2',
    title: 'Pengelolaan Kas & Pembukuan',
    name: 'Raihannisa Fadhilah',
    description: 'Pengelolaan Kas & Pembukuan Kelas',
    status: 'TIF-3A • Pengurus',
    photoUrl: bendaharaRaihannisaImg,
  },
];

export const PJ_STUDENTS: CoursePJ[] = [
  {
    role: 'PJ Kewirausahaan',
    name: 'Raden Muhammad Rizky',
    course: 'Kewirausahaan',
    dosen: 'Aris Juliansyah, M.I.Kom.',
    day: 'SENIN',
    room: 'Ruang A12',
    phone: '0815-6301-178',
    cleanPhone: '628156301178',
    photoUrl: PJ_RADEN_PHOTO_URL,
  },
  {
    role: 'PJ Rekayasa Perangkat Lunak',
    name: 'Wirayudhabuana Putra',
    course: 'Rekayasa Perangkat Lunak',
    dosen: 'Asril Adi Sunarto, M.Kom.',
    day: 'JUMAT',
    room: 'Lab E15',
    phone: '0857-1717-0131',
    cleanPhone: '6285717170131',
    photoUrl: pjWirayudhaImg,
  },
  {
    role: 'PJ Kemuhamadiyahan',
    name: 'Muhammad Alif',
    course: 'Kemuhamadiyahan',
    dosen: 'Wahyu Jati Purwito, M.Pd.',
    day: 'KAMIS',
    room: 'Ruang B11',
    phone: '0856-2672-095',
    cleanPhone: '628562672095',
    photoUrl: pjAlifImg,
  },
  {
    role: 'PJ IMK',
    name: 'Suci Aulia',
    course: 'Interaksi Manusia dan Komputer',
    dosen: 'Winda Apriandari, S.T., M.Kom.',
    day: 'RABU',
    room: 'Lab D12 Desain',
    phone: '0812-8046-3656',
    cleanPhone: '6281280463656',
    photoUrl: pjSuciImg,
  },
  {
    role: 'PJ Basis Data',
    name: 'Fitria Nur Ramadhani',
    course: 'Basis Data',
    dosen: 'Agung Pambudi, S.Kom., M.Cs.',
    day: 'JUMAT',
    room: 'Lab E17 Dasar',
    phone: '0851-5508-1881',
    cleanPhone: '6285155081881',
    photoUrl: pjFitriaImg,
  },
  {
    role: 'PJ Struktur Data',
    name: 'Alfhasa Pratama',
    course: 'Struktur Data',
    dosen: 'Asep Budiman Kusdinar, M.T.',
    day: 'RABU',
    room: 'Lab E17 Dasar',
    phone: '0888-0114-8230',
    cleanPhone: '6288801148230',
    photoUrl: pjAlfhasaImg,
  },
  {
    role: 'PJ Statistika Informatika',
    name: "Muti'I Khairunnisaa",
    course: 'Statistika Informatika',
    dosen: 'Dr. Iwan Rizal Setiawan, M.T.',
    day: 'SELASA',
    room: 'Lab D13 Stat',
    phone: '0812-9931-6799',
    cleanPhone: '6281299316799',
    photoUrl: pjMutiiImg,
  },
  {
    role: 'PJ PBO',
    name: 'Khaila Salinaza',
    course: 'Pemrograman Berorientasi Objek',
    dosen: 'Prajoko, S.Pd.I., M.Kom.',
    day: 'RABU',
    room: 'Lab E15 Lanjut',
    phone: '0813-1421-3870',
    cleanPhone: '6281314213870',
    photoUrl: pjKhailaImg,
  },
];

export const MEMBER_STUDENTS: StudentMember[] = [
  { name: 'Fauji', role: 'Anggota', initials: 'FJ', photoUrl: memberFaujiImg },
  { name: 'Muhammad Farell', role: 'Anggota', initials: 'MF', photoUrl: memberFarellImg },
  { name: 'M. Zahran Erga', role: 'Anggota', initials: 'ZE', photoUrl: memberZahranImg },
  { name: 'Moch Gian', role: 'Anggota', initials: 'MG', photoUrl: memberGianImg },
  { name: 'Raihan Nafis', role: 'Anggota', initials: 'RN', photoUrl: memberRaihanImg },
  { name: 'Fauzan Mustopa P', role: 'Anggota', initials: 'FM', photoUrl: memberFauzanImg },
  { name: 'Wardiansyah M.', role: 'Anggota', initials: 'WM', photoUrl: memberWardiImg },
  { name: 'Azizah Hadiqatul', role: 'Anggota', initials: 'AH', photoUrl: memberAzizahImg },
  { name: 'Muhamad Rizki H.', role: 'Anggota', initials: 'MR', photoUrl: memberRizkiImg },
  { name: 'M. Galih Bintang', role: 'Anggota', initials: 'GB', photoUrl: memberGalihImg },
  { name: 'Saepul Aziz', role: 'Anggota', initials: 'SA', photoUrl: memberSaepulImg },
];

export const ALL_PJ_OPTIONS = [
  { name: 'Raden Muhammad Rizky', label: 'Raden Muhammad Rizky (PJ Kewirausahaan)' },
  { name: 'Wirayudhabuana Putra', label: 'Wirayudhabuana Putra (PJ RPL)' },
  { name: 'Muhammad Alif', label: 'Muhammad Alif (PJ Kemuhamadiyahan)' },
  { name: 'Suci Aulia', label: 'Suci Aulia (PJ IMK)' },
  { name: 'Fitria Nur Ramadhani', label: 'Fitria Nur Ramadhani (PJ Basis Data)' },
  { name: 'Alfhasa Pratama', label: 'Alfhasa Pratama (PJ Struktur Data)' },
  { name: "Muti'I Khairunnisaa", label: "Muti'I Khairunnisaa (PJ Statistika)" },
  { name: 'Khaila Salinaza', label: 'Khaila Salinaza (PJ PBO)' },
  { name: 'Mohamad Arya Zulhaz', label: 'Mohamad Arya Zulhaz (Ketua Kelas)' },
  { name: 'Muhammad Widya Triyana', label: 'Muhammad Widya Triyana (Wakil Ketua)' },
  { name: 'Ahmad Gabriel Omar', label: 'Ahmad Gabriel Omar (Sekretaris)' },
];
