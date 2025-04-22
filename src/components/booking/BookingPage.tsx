import { useState } from "react";

import { mockDoctors } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Appointment, Doctor, TimeSlot } from "@/types";
import {
  DoctorDirectory,
  BookingModal,
  AppointmentsSummary,
} from "./components";
import { toast } from "sonner";

export default function BookingPage() {
  const [doctors] = useState<Doctor[]>(mockDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleConfirmAppointment = (timeSlot: TimeSlot) => {
    if (selectedDoctor) {
      const newAppointment: Appointment = {
        id: `appointment-${Date.now()}`,
        doctor: selectedDoctor,
        timeSlot: timeSlot,
        date: new Date(timeSlot.date),
      };

      setAppointments([...appointments, newAppointment]);
      setIsModalOpen(false);

      toast.success("Appointment booked successfully!");
    }
  };

  return (
    <>
      <Tabs defaultValue="doctors" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="doctors">Find Doctors</TabsTrigger>
          <TabsTrigger value="appointments">My Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="doctors">
          <DoctorDirectory
            doctors={doctors}
            onBookAppointment={handleBookAppointment}
          />
        </TabsContent>

        <TabsContent value="appointments">
          <AppointmentsSummary appointments={appointments} />
        </TabsContent>
      </Tabs>

      {isModalOpen && selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmAppointment}
        />
      )}
    </>
  );
}
