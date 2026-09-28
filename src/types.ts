export interface CourseItem {
  id: string;
  matkul: string;
  time: string;
  rawTime: string;
  room: string;
  roomCode: string;
  dosen: string;
  phone: string;
  cleanPhone: string;
  pjName: string;
  type: string;
  typeColor: 'secondary' | 'tertiary';
}

export type DayKey = 'SENIN' | 'SELASA' | 'RABU' | 'KAMIS' | 'JUMAT';

export interface StudentLeader {
  role: string;
  title: string;
  name: string;
  description: string;
  status: string;
  photoUrl?: string;
  phone?: string;
}

export interface CoursePJ {
  role: string;
  name: string;
  course: string;
  dosen: string;
  day: string;
  room: string;
  phone: string;
  cleanPhone: string;
  photoUrl?: string;
}

export interface StudentMember {
  name: string;
  role: string;
  initials: string;
  photoUrl?: string;
}
