import { Species } from "@/types/species";

export interface BasicsFormProps {
  speciesList: Species[];
  selectedSpecies: Species | null;
  setSelectedSpecies: React.Dispatch<React.SetStateAction<Species | null>>;
}
