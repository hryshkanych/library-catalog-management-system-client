export type Filters = {
  availability: Record<string, boolean>;
  languages: Record<string, boolean>;
  genres: Record<string, boolean>;
};

export type FilterCategory = 'availability' | 'languages' | 'genres';
