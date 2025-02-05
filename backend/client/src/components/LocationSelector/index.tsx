"use client";

import { Location } from "@/types/menuTypes";

interface LocationSelectorProps {
  locations: Location[];
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

const LocationSelector = ({
  locations,
  selectedLocation,
  onLocationChange,
}: LocationSelectorProps) => {
  return (
    <div className="w-full mb-6">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {locations.map((location) => (
          <button
            key={location.title}
            onClick={() => onLocationChange(location.title)}
            className={`px-6 py-3 rounded-lg whitespace-nowrap transition-colors ${
              selectedLocation === location.title
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            {location.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocationSelector;
