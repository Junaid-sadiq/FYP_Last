import React from 'react';
import { AntDesign } from '@expo/vector-icons';

export const Icon = ({ name, size, color, style }) => {
  return (
    <AntDesign
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
};
