import { useEffect, useState } from 'react';

export const useCssLoader = (...styleModules: any[]) => {
  const [cssLoaded, setCssLoaded] = useState(false);

  useEffect(() => {
    const checkCss = () => {
      // Kontrollera om alla CSS-moduler är laddade
      const allLoaded = styleModules.every((styles) => {
        if (!styles) return false;

        // Kontrollera om CSS-objektet har giltiga klasser
        return Object.values(styles).some((className) => typeof className === 'string' && className.length > 0);
      });

      if (allLoaded) {
        setCssLoaded(true);
      } else {
        setTimeout(checkCss, 10);
      }
    };

    checkCss();
  }, [styleModules]);

  return cssLoaded;
};
