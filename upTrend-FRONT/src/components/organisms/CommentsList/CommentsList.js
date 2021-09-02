import React, { useState } from 'react';
import Moment from 'react-moment';
import { useStoreState } from 'easy-peasy';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import DeleteButton from 'components/molecules/DeleteButton/DeleteButton';
import { DELETE_COMMENT, GET_ALL_COMMENTS_BY_POST, UPDATE_COMMENT } from 'graphql/comments';
import { GET_ALL_POSTS } from 'graphql/posts';
import useToggle from 'utils/hooks/useToggle';
import CommentFormDialog from 'components/templates/CommentForm/CommentForm';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
}));

export default function CommentsList ({ comments, postId }) {
  const classes = useStyles();
  const currentUserId = useStoreState(state => state.user.user.id);

  const [editingComment, setEditingComment] = useState({
    commentId: null,
    title: '',
    content: ''
  });

  const {
    isOpen: isEditDialogOpen,
    handleToggle: setToggleEditDialog
  } = useToggle();

  const handleEditComment = (commentId, title, content) => {
    setEditingComment({ commentId, title, content });
    setToggleEditDialog();
  };

  const onDelete = (proxy, { data }) => {
    const cacheData = proxy.readQuery({ query: GET_ALL_POSTS });
    try {
      if (data.deleteComment.ok) {
        const allPosts = cacheData.allPosts.map(post => {
          return post.id !== postId
            ? post
            : {
              ...post,
              commentsCount: post.commentsCount - 1
            };
        });
        return proxy.writeQuery({ query: GET_ALL_POSTS, data: { allPosts } });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <List className={classes.root}>
      {comments.map(comment => {
        const fullName = `${comment.User.firstName} ${comment.User.lastName}`;
        return (
          <div key={comment.id}>
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar
                  alt={fullName}
                  src={comment.User.avatar}
                />
              </ListItemAvatar>
              <ListItemText
                primary={comment.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      component='span'
                      variant='body2'
                      color='textPrimary'
                    >
                      By {fullName} - &nbsp;
                      <Moment format='DD/MM/YYYY HH:mm'>
                        {comment.createdAt}
                      </Moment>
                    </Typography>
                    <Typography
                      display='block'
                      component='span'
                      variant='body1'
                      color='textPrimary'
                    >
                      {comment.content}
                    </Typography>
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                {comment.userId === currentUserId && (
                  <Button
                    size='small'
                    onClick={() =>
                      handleEditComment(comment.id, comment.title, comment.content)
                    }
                  >
                    <EditIcon color='secondary' />
                  </Button>
                )}
                {comment.userId === currentUserId && (
                  <DeleteButton
                    actionTitle='Delete comment'
                    mutation={DELETE_COMMENT}
                    variables={{
                      commentId: comment.id
                    }}
                    update={onDelete}
                    refetchQueries={[{ query: GET_ALL_COMMENTS_BY_POST, variables: { postId } }]}
                  />
                )}
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant='inset' component='li' />
          </div>
        );
      })}
      {isEditDialogOpen && (
        <CommentFormDialog
          mode='edit'
          postId={postId}
          initialValues={editingComment}
          mutation={UPDATE_COMMENT}
          isOpen={isEditDialogOpen}
          toggleDialog={setToggleEditDialog}
        />
      )}
    </List>
  );
}
