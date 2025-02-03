import React from 'react';

import { AiOutlineTrademark } from 'react-icons/ai';

type TextTransform = 'capitalize' | 'uppercase' | 'lowercase' | 'none';

type DineDifferentType = {
  fontFamily?: string;
  color?: string;
  fontSize?: string;
  textTransform?: TextTransform;
  className?: any;
};

const DineDifferent = ({
  fontFamily = 'var(--secondary-font)',
  color = 'var(--primary)',
  fontSize = '16px',
  textTransform,
  className,
}: DineDifferentType) => {
  return (
    <div
      style={{
        fontFamily,
        color,
        fontSize,
        textTransform: textTransform ? textTransform : 'capitalize',
      }}
      className={className}
    >
      <h1 className='flex gap-1'>
        Dine Different <AiOutlineTrademark style={{ color, fontSize }} />
      </h1>
    </div>
  );
};

export default DineDifferent;
