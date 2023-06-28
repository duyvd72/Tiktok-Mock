import React from 'react';
import defaultAva from '@/assets/images/default-ava.png';

const LikeItem = () => {
  return (
    <div className="flex items-center gap-3">
      <img className="w-[50px] h-[50px]" src={defaultAva} alt="" />
      <p>duyvd0702</p>
    </div>
  );
};

export default LikeItem;
