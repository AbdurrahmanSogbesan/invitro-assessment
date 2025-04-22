import { Doctor } from "@/types";

// Helper function to generate time slots for the next 7 days
const generateTimeSlots = (count = 5) => {
  const slots = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + Math.floor(i / 3)); // Distribute across next few days

    const hours = 9 + (i % 8); // 9 AM to 4 PM
    const minutes = (i % 2) * 30; // 0 or 30 minutes

    const timeString = `${hours}:${minutes === 0 ? "00" : minutes} ${
      hours >= 12 ? "PM" : "AM"
    }`;

    slots.push({
      id: `slot-${i}`,
      date: date.toISOString(),
      time: timeString,
    });
  }

  return slots;
};

export const mockDoctors: Doctor[] = [
  {
    id: "doctor-1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    photoUrl: "doctor-1.jpg",
    rating: 4.8,
    location: "Medical Center, New York",
    availableSlots: generateTimeSlots(8),
  },
  {
    id: "doctor-2",
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    photoUrl: "doctor-2.jpg",
    rating: 4.6,
    location: "Health Plaza, Boston",
    availableSlots: generateTimeSlots(6),
  },
  {
    id: "doctor-3",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    photoUrl: "doctor-3.jpg",
    rating: 4.9,
    location: "Children's Hospital, Chicago",
    availableSlots: generateTimeSlots(10),
  },
  {
    id: "doctor-4",
    name: "Dr. James Wilson",
    specialty: "Neurologist",
    photoUrl: "doctor-4.jpg",
    rating: 4.7,
    location: "Neuroscience Center, San Francisco",
    availableSlots: generateTimeSlots(4),
  },
  {
    id: "doctor-5",
    name: "Dr. Olivia Thompson",
    specialty: "Orthopedic Surgeon",
    photoUrl: "doctor-5.jpg",
    rating: 4.5,
    location: "Orthopedic Institute, Seattle",
    availableSlots: [], // Currently unavailable
  },
  {
    id: "doctor-6",
    name: "Dr. David Kim",
    specialty: "Psychiatrist",
    photoUrl: "doctor-6.jpg",
    rating: 4.8,
    location: "Mental Health Center, Los Angeles",
    availableSlots: generateTimeSlots(7),
  },
  {
    id: "doctor-7",
    name: "Dr. Lisa Patel",
    specialty: "Ophthalmologist",
    photoUrl: "doctor-7.jpg",
    rating: 4.6,
    location: "Vision Care, Miami",
    availableSlots: generateTimeSlots(5),
  },
  {
    id: "doctor-8",
    name: "Dr. Robert Garcia",
    specialty: "Endocrinologist",
    photoUrl: "doctor-8.jpg",
    rating: 4.7,
    location: "Diabetes Center, Houston",
    availableSlots: [], // Currently unavailable
  },
  {
    id: "doctor-9",
    name: "Dr. Jennifer Lee",
    specialty: "Dermatologist",
    photoUrl: "doctor-9.jpg",
    rating: 4.9,
    location: "Skin Care Clinic, Atlanta",
    availableSlots: generateTimeSlots(9),
  },
];
