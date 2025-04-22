import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MapPin, Star, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Doctor } from "@/types";

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
}

export default function DoctorCard({
  doctor,
  onBookAppointment,
}: DoctorCardProps) {
  const hasAvailability = doctor.availableSlots.length > 0;

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md border">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <img
            src={
              doctor.photoUrl
                ? `${import.meta.env.BASE_URL}doctors/${doctor.photoUrl}`
                : "/placeholder.svg"
            }
            alt={`Dr. ${doctor.name}`}
            className="object-cover size-14 lg:size-16 shrink-0 rounded-full border"
          />
          <div>
            <h3 className="font-semibold text-lg">{doctor.name}</h3>
            <p className="text-sm text-gray-500">{doctor.specialty}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="flex items-center mb-2">
          <div className="flex items-center text-amber-500 mr-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < doctor.rating
                    ? "fill-current"
                    : "stroke-current fill-none"
                }`}
              />
            ))}
          </div>
          <span className="text-sm">{doctor.rating.toFixed(1)}</span>
        </div>

        <div className="flex items-start space-x-1 text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{doctor.location}</span>
        </div>

        <div className="mt-2">
          <Badge
            variant={hasAvailability ? "default" : "outline"}
            className="mb-2"
          >
            {hasAvailability ? "Available" : "Currently Unavailable"}
          </Badge>

          {hasAvailability && (
            <div className="flex items-center mt-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-1 text-primary" />
              <span>
                Next available:{" "}
                {new Date(doctor.availableSlots[0]?.date).toLocaleDateString()}{" "}
                at {doctor.availableSlots[0]?.time}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 border-t">
        <Button
          onClick={() => onBookAppointment(doctor)}
          className="w-full"
          disabled={!hasAvailability}
          aria-label={`Book appointment with Dr. ${doctor.name}`}
        >
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
}
