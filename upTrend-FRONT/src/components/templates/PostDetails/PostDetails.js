import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  Dialog,
  Button,
  AppBar,
  Toolbar,
  Chip
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import GoBackIcon from '@material-ui/icons/ArrowBack';

import useToggle from 'utils/hooks/useToggle';
import { GET_ALL_COMMENTS_BY_POST, CREATE_COMMENT } from 'graphql/comments';
import CommentsList from 'components/organisms/CommentsList/CommentsList';
import LikeButton from 'components/molecules/LikeButton/LikeButton';
import AuthorItem from 'components/molecules/AuthorItem/AuthorItem';
import { Transition } from 'components/atoms/Transition/Transition';

import { usePostDetailsStyles } from './postDetails.styles';
import CommentFormDialog from '../CommentForm/CommentForm';
import Moment from 'react-moment';

export default function PostDetails ({ isOpen, toggleDialog, title, cover, category,
  content, author, postId, likes, commentsCount, createdAt }) {
  const classes = usePostDetailsStyles();
  const { data, loading, error } = useQuery(GET_ALL_COMMENTS_BY_POST, {
    variables: { postId }
  });
  const { isOpen: isCreateDialogOpen, handleToggle: setToggleCreateDialog } = useToggle();

  if (loading) return <div />;
  if (error) return <h4>Oops, an error has occured</h4>;

  return (
    <Card>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={toggleDialog}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <IconButton
              edge='start'
              color='inherit'
              onClick={toggleDialog}
              aria-label='close'
            >
              <GoBackIcon />
            </IconButton>
            <Chip label={category.toUpperCase()} />

            <Chip label={
              <Moment format='DD/MM/YYYY HH:mm'>
                {Number(createdAt)}
              </Moment>
            } />
          </Toolbar>
        </AppBar>
        <img src={cover} className={classes.coverImage} alt={title} />
        <List className={classes.list}>
          <ListItem alignItems='center'>
            <AuthorItem userId={author} />
            <ListItemText
              className={classes.postActions}
              classes={{ primary: classes.likeButtonWrapper }}
              primary={
                <LikeButton
                  likes={likes}
                  count={likes.length}
                  postId={postId}
                />
              }
              secondary={
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={setToggleCreateDialog}
                  className={classes.addCommentBtn}
                >
                  Add comment
                </Button>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText primary={title} secondary={content} />
          </ListItem>
        </List>
        <Divider />
        <CommentsList comments={data.allCommentsByPostId.comments} postId={postId} />
        {isCreateDialogOpen && (
          <CommentFormDialog
            initialValues={{
              postId,
              title: '',
              content: ''
            }}
            postId={postId}
            mutation={CREATE_COMMENT}
            isOpen={isCreateDialogOpen}
            toggleDialog={setToggleCreateDialog}
          />
        )}
      </Dialog>
    </Card>
  );
}
