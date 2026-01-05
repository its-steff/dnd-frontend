export interface CharacterCardProps {
  name: string;
  species: string;
  class_name: string;
  id: number;
  onDelete: (id: number) => void;
}
