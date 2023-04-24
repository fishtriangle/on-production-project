const interfaceStr = 'interface';

module.exports = (component) => (`import {classNames, Mods} from "shared/lib/classNames/classNames";
import classes from './$FILE$.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

${interfaceStr} ${component}Props {
  className?: string;
}

export const ${component} = memo(({className}: ${component}Props) => {
  const { t } = useTranslation();
  
    const mods: Mods = {

  };
  
  return (
    <div className={classNames(classes.${component}, mods, [className])}>
      Lorem
    </div>
  );
});`);
