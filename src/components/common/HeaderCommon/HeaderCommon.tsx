import  { useMemo } from 'react';
import {
  BookIcon,
  FolderIcon,
  TranslateIcon,
  PresentationChartIcon,
} from '../../../icons';
import HeaderItem from './components/HeaderItem/HeaderItem';

const HeaderCommon = () => {
  const headerItems = useMemo(
    () => [
      {
        icon: <BookIcon className="header-icon" />,
        title: 'Lesson',
        link: 'temp',
      },

      {
        icon: <TranslateIcon className="header-icon" />,
        title: 'Word',
        link: 'temp',
      },
      {
        icon: <FolderIcon className="header-icon" />,
        title: 'Folder',
        link: 'temp',
      },
      {
        icon: <PresentationChartIcon className="header-icon" />,
        title: 'Statistic',
        link: 'temp',
      },
    ],
    [],
  );
  return (
    <nav className="sticky w-screen h-20 border-b-2 top-0 bg-white flex justify-center">
      <ul className="flex gap-2 items-center h-full w-1/2 justify-between">
        {headerItems.map((item,index) => (
          <HeaderItem key={index} icon={item.icon} title={item.title} link={item.link} />
        ))}
      </ul>
    </nav>
  );
};

export default HeaderCommon;
