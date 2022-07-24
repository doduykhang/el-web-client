import React from 'react';

interface props {
  icon: React.ReactNode;
  title: string;
  link: string;
}

const HeaderItem = ({ icon, title, link }: props) => {
  return (
    <li className="list-none flex items-center text-gray-400 group cursor-pointer">
      <span>{icon}</span>
      <span className="font-bold text-2xl group-hover:text-black">{title}</span>
    </li>
  );
};

export default HeaderItem;
