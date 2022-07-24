import { lesson } from '../../../../../types/lesson';
import { ButtonCommon } from '../../../../common/';

interface props extends lesson {}

const LessonCard = ({ imageUrl, title }: props) => {
  return (
    <div className="flex flex-col gap-2 w-60 p-2 rounded-md ring-2 ring-gray-400 shadow-lg ">
      <img src={imageUrl} alt="lesson image" className="w-60 rounded-md" />
      <span className="text-xl font-medium line-clamp-2">{title}</span>
      <ButtonCommon>Learn now</ButtonCommon>
    </div>
  );
};

export default LessonCard;
