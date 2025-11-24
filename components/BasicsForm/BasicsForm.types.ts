import { Species } from "@/types/species";
import { Classes } from "@/types/classes";

export interface BasicsFormProps {
  speciesList: Species[];
  selectedSpecies: Species | null;
  setSelectedSpecies: React.Dispatch<React.SetStateAction<Species | null>>;
  selectedClass: Classes | null;
  setSelectedClass: React.Dispatch<React.SetStateAction<Classes | null>>;
  classesList: Classes[];
}
