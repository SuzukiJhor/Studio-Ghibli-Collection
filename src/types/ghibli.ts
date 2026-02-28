export interface Film {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  image: string;
  movie_banner: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
}

export type FilterMode = 'all' | 'favorites' | 'watched' | 'withNotes' | 'rating';

export type UserData = {
  userRating: number;
  notes: string;
};

export type UserNotesMap = Record<string, UserData>;