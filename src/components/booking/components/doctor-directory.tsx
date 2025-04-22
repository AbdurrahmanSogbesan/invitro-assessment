import { useState, useCallback } from "react";
import SearchInput from "../../search-input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Doctor } from "@/types";
import DoctorCard from "./doctor-card";

interface DoctorDirectoryProps {
  doctors: Doctor[];
  onBookAppointment: (doctor: Doctor) => void;
}

export default function DoctorDirectory({
  doctors,
  onBookAppointment,
}: DoctorDirectoryProps) {
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Get unique specialties for filter
  const specialties = [
    "all",
    ...new Set(doctors.map((doctor) => doctor.specialty)),
  ];

  // Handle search query changes
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Filter doctors based on selected filters and search query
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialty =
      specialtyFilter === "all" || doctor.specialty === specialtyFilter;
    const matchesAvailability =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" &&
        doctor.availableSlots.length > 0) ||
      (availabilityFilter === "unavailable" &&
        doctor.availableSlots.length === 0);

    // Search by name, specialty, or location
    const matchesSearch =
      searchQuery === "" ||
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSpecialty && matchesAvailability && matchesSearch;
  });

  return (
    <div>
      <div className="mb-6 bg-white p-5 rounded-lg border shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Find a Doctor</h2>

        <SearchInput
          placeholder="Search by name, specialty, or location"
          onSearch={handleSearch}
          className="mb-4"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="specialty-filter">Specialty</Label>
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger id="specialty-filter" className="w-full">
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty === "all" ? "All Specialties" : specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="availability-filter">Availability</Label>
            <Select
              value={availabilityFilter}
              onValueChange={setAvailabilityFilter}
            >
              <SelectTrigger id="availability-filter" className="w-full">
                <SelectValue placeholder="Filter by availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredDoctors.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-white rounded-lg border shadow-sm">
          No doctors match your search criteria. Please try different filters or
          search terms.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookAppointment={onBookAppointment}
            />
          ))}
        </div>
      )}
    </div>
  );
}
