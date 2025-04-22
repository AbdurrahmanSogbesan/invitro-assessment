export interface TimeSlot {
  id: string;
  date: string;
  time: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  photoUrl: string;
  rating: number;
  location: string;
  availableSlots: TimeSlot[];
}

export interface Appointment {
  id: string;
  doctor: Doctor;
  timeSlot: TimeSlot;
  date: Date;
}
