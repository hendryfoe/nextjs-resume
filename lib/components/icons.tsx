import cn, { Argument } from 'classnames';

export const LinkIcon = (className?: Argument) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={cn('h-5 w-5', className)} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
      clipRule="evenodd"
    />
  </svg>
);

export const PhoneIcon = (className?: Argument) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={cn('h-5 w-5', className)} viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

export const EmailIcon = (className?: Argument) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={cn('h-5 w-5', className)} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
      clipRule="evenodd"
    />
  </svg>
);
