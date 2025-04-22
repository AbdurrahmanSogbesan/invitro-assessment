import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Doctor, TimeSlot } from "@/types";

interface BookingModalProps {
  doctor: Doctor;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (timeSlot: TimeSlot) => void;
}

export default function BookingModal({
  doctor,
  isOpen,
  onClose,
  onConfirm,
}: BookingModalProps) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );

  // Group time slots by date
  const timeSlotsByDate = doctor.availableSlots.reduce((acc, slot) => {
    const dateStr = new Date(slot.date).toDateString();
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  const handleConfirm = () => {
    if (selectedTimeSlot) {
      onConfirm(selectedTimeSlot);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Book an Appointment</DialogTitle>
        </DialogHeader>

        <div className="flex items-center space-x-4 mb-4">
          <img
            src={
              doctor.photoUrl
                ? `${import.meta.env.BASE_URL}doctors/${doctor.photoUrl}`
                : "/placeholder.svg"
            }
            alt={`Dr. ${doctor.name}`}
            className="object-cover h-16 w-16 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{doctor.name}</h3>
            <p className="text-sm text-gray-500">{doctor.specialty}</p>
          </div>
        </div>

        <div className="max-h-[300px] overflow-y-auto pr-2">
          {Object.entries(timeSlotsByDate).map(([dateStr, slots]) => (
            <div key={dateStr} className="mb-4">
              <h4 className="font-medium mb-2">
                {format(new Date(dateStr), "EEEE, MMMM d, yyyy")}
              </h4>

              <RadioGroup
                value={selectedTimeSlot?.id}
                onValueChange={(value) => {
                  const slot = doctor.availableSlots.find(
                    (s) => s.id === value
                  );
                  if (slot) setSelectedTimeSlot(slot);
                }}
              >
                <div className="grid grid-cols-2 gap-2">
                  {slots.map((slot) => (
                    <div key={slot.id} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={slot.id}
                        id={slot.id}
                        aria-label={`Select time slot at ${slot.time}`}
                      />
                      <Label htmlFor={slot.id} className="cursor-pointer py-1">
                        {slot.time}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          ))}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedTimeSlot}>
            Confirm Appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
