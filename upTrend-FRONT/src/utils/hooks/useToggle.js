import { useState, useCallback } from 'react';

const useToggle = () => {
  const [isOpen, setOpenOrClose] = useState(false);

  const handleToggle = useCallback(
    () => {
      setOpenOrClose(!isOpen);
    },
    [isOpen]
  );

  return {
    isOpen,
    handleToggle
  };
};

export default useToggle;
