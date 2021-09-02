import React from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useDialogTitleStyles } from './dialogTitle.styles';

export const DialogTitle = props => {
  const { children, onClose } = props;
  const classes = useDialogTitleStyles();
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant='h6' className={classes.title} >{children}</Typography>
      {onClose ? (
        <IconButton aria-label='Close' className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};
