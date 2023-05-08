import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

export interface Profile {
  id?: string;
  first?: string;
  lastname?: string;
  birthYear?: number | '';
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: string;
}
