import React from 'react';
import { Badge, Button } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import { useCommentButtonStyles } from './commentButton.styles';

const CommentsIndicator = ({ onClick, count }) => {
  const classes = useCommentButtonStyles();

  return (
    <Button size='small' color='primary' onClick={onClick}>
      <Badge
        classes={{ badge: classes.badge }}
        badgeContent={count}
        color='secondary'
      >
        <CommentIcon color='primary' />
      </Badge>
    </Button>
  );
};

export default CommentsIndicator;
