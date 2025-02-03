import React from 'react';

import styles from './styles.module.css';

type SkeletonType = {
  width: string;
  height: string;
  backgroundColor?: string;
  className?: any;
};

const Skeleton = ({
  width,
  height,
  backgroundColor = '#212123',
  className,
}: SkeletonType) => {
  return (
    <div
      style={{ width, height, backgroundColor: backgroundColor }}
      className={`${className} ${styles.skeleton}`}
    />
  );
};

export default Skeleton;
