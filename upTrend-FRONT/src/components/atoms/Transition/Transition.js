import React from 'react';

import { Slide } from '@material-ui/core';

export const Transition = React.forwardRef((props, ref) => {
  return <Slide direction='up' ref={ref} {...props} />;
});
