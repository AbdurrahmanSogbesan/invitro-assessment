import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Appointment } from "@/types";
import SearchInput from "../../search-input";

interface AppointmentsSummaryProps {
  appointments: Appointment[];
}

export default function AppointmentsSummary({
  appointments,
}: AppointmentsSummaryProps) {
  const [searchQuery, setSearchQuery] = useState("");

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border shadow-sm">
        <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold mb-2">My Appointments</h2>
        <p className="text-gray-500 mb-6">
          You don't have any appointments scheduled yet.
        </p>
        <div className="flex justify-center">
          <Badge variant="outline" className="text-primary border-primary">
            Switch to "Find Doctors" tab to book your first appointment
          </Badge>
        </div>
      </div>
    );
  }

  // Filter appointments based on search query
  const filteredAppointments = appointments.filter(
    (appointment) =>
      searchQuery === "" ||
      appointment.doctor.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.doctor.specialty
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      format(appointment.date, "MMMM d, yyyy")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.timeSlot.time
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.doctor.location
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // Sort appointments by date (earliest first)
  const sortedAppointments = [...filteredAppointments].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 bg-white p-5 rounded-lg border shadow-sm">
        <h2 className="text-xl font-semibold mb-4 md:mb-0">My Appointments</h2>
        <div className="w-full md:w-64">
          <SearchInput
            placeholder="Search appointments"
            onSearch={(query) => setSearchQuery(query)}
          />
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-white rounded-lg border shadow-sm">
          No appointments match your search. Try different search terms.
        </div>
      ) : (
        <div className="space-y-4">
          {sortedAppointments.map((appointment) => (
            <Card
              key={appointment.id}
              className="overflow-hidden hover:shadow-md transition-all border"
            >
              <CardHeader className="border-b">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Appointment with {appointment.doctor.name}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex items-center space-x-3 mb-4 md:mb-0 md:mr-6">
                    <img
                      src={
                        appointment.doctor.photoUrl
                          ? `${import.meta.env.BASE_URL}doctors/${
                              appointment.doctor.photoUrl
                            }`
                          : "/placeholder.svg"
                      }
                      alt={`Dr. ${appointment.doctor.name}`}
                      className="object-cover size-12 rounded-full  border"
                    />
                    <div>
                      <p className="font-medium">{appointment.doctor.name}</p>
                      <p className="text-sm text-gray-500">
                        {appointment.doctor.specialty}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{format(appointment.date, "MMMM d, yyyy")}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{appointment.timeSlot.time}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{appointment.doctor.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
