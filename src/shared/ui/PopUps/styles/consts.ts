import classes from './popups.module.scss';
import { DropdownDirection } from '../../../types/ui';

export const mapDirectionClasses: Record<DropdownDirection, string> = {
  'up right': classes.optionUpRight,
  'down right': classes.optionDownRight,
  'up left': classes.optionUpLeft,
  'down left': classes.optionDownLeft,
};
