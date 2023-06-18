import React from 'react';
import CircleButton from '@/components/CircleButton';

const ButtonGroup = () => {
  return (
    <div className="flex flex-col gap-4">
      <CircleButton>
        <i className="fas fa-heart"></i>
      </CircleButton>
      <CircleButton>
        <i className="fas fa-comment-dots"></i>
      </CircleButton>
      <CircleButton>
        <i className="fas fa-bookmark"></i>
      </CircleButton>
      <CircleButton>
        <i className="fas fa-share"></i>
      </CircleButton>
    </div>
  );
};

export default ButtonGroup;
