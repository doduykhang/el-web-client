import { useEffect, useState } from 'react';
import { lesson1, lesson2, lesson3 } from '../../../../data/lesson.data';
import LessonCard from '../components/LessonCard/LessonCard';
import { SearchInputCommon } from '../../../common';
import { lesson } from '../../../../types/lesson';

const HomePage = () => {
  const [lessons, setLessons] = useState<lesson[]>([]);
  useEffect(() => {
    setLessons([lesson1, lesson2, lesson3]);
  }, []);

  return (
    <div className="p-3 flex justify-center">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold text-center mb-4">Lessons</h1>
        <div className="mb-4 flex justify-end">
          <SearchInputCommon />
        </div>
        <div className="grid grid-cols-3 gap-4 justify-items-center ">
          {lessons.map((lesson) => (
            <div key={lesson.id}>
              <LessonCard
                key={lesson.id}
                id={lesson.id}
                title={lesson.title}
                imageUrl={lesson.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
