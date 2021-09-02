import React, { useState } from 'react';
import { useStoreState } from 'easy-peasy';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import EditIcon from '@material-ui/icons/Edit';
import { Grid, Typography, Button } from '@material-ui/core';

import { UPDATE_POST, DELETE_POST, GET_ALL_POSTS } from 'graphql/posts';
import { sliceContent } from 'utils/helpers';
import useToggle from 'utils/hooks/useToggle';
import PostDetails from 'components/templates/PostDetails/PostDetails';
import DeleteButton from 'components/molecules/DeleteButton/DeleteButton';
import CommentsIndicator from 'components/molecules/CommentsIndicator/CommentsIndicator';
import LikeButton from 'components/molecules/LikeButton/LikeButton';
import PostFormDialog from 'components/templates/PostForm/PostFormDialog';

import { usePostStyles } from './post.styles';

const PostItem = ({
  id,
  userId,
  title,
  category,
  content,
  cover,
  likes,
  commentsCount,
  createdAt
}) => {
  const classes = usePostStyles();
  const currentUser = useStoreState(state => state.user.user.id);
  const {
    isOpen: isReadDialogOpen,
    handleToggle: setToggleReadDialog
  } = useToggle();
  const {
    isOpen: isEditDialogOpen,
    handleToggle: setToggleEditDialog
  } = useToggle();

  const [post, setPost] = useState({
    postId: null,
    title: '',
    category: '',
    content: '',
    cover: ''
  });

  const handleEditPost = (postId, title, category, content, cover) => {
    setPost({ postId, title, category, content, cover });
    setToggleEditDialog();
  };

  return (
    <>
      {isEditDialogOpen && (
        <PostFormDialog
          mode='edit'
          initialValues={post}
          mutation={UPDATE_POST}
          isOpen={isEditDialogOpen}
          toggleDialog={setToggleEditDialog}
        />
      )}
      {isReadDialogOpen && (
        <PostDetails
          isOpen={isReadDialogOpen}
          toggleDialog={setToggleReadDialog}
          title={title}
          cover={cover}
          category={category}
          likes={likes}
          commentsCount={commentsCount}
          content={content}
          postId={id}
          author={userId}
          createdAt={createdAt}
        />
      )}
      <Grid item key={id} xs={12} sm={12} md={4} lg={3}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardCategoryBanner}
            image={`https://source.unsplash.com/random/?${category}`}
            children={
              <Typography
                className={classes.cardCategoryBannerText}
                gutterBottom
                variant='h4'
                component='h3'
              >
                {category}
              </Typography>
            }
          />
          <CardMedia
            onClick={setToggleReadDialog}
            className={classes.cardMedia}
            image={cover}
            title={title}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant='h4' component='h3'>
              {title}
            </Typography>
            <Typography gutterBottom variant='body1'>
              {sliceContent(content, 200)}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions} disableSpacing>
            <LikeButton postId={id} likes={likes} count={likes.length} />
            <CommentsIndicator
              onClick={setToggleReadDialog}
              postId={id}
              count={commentsCount}
            />
            {userId === currentUser && (
              <>
                <Button
                  size='small'
                  onClick={() =>
                    handleEditPost(id, title, category, content, cover)
                  }
                >
                  <EditIcon color='secondary' />
                </Button>
                <DeleteButton
                  actionTitle='Delete post'
                  mutation={DELETE_POST}
                  variables={{
                    postId: id
                  }}
                  refetchQueries={[{ query: GET_ALL_POSTS }]}
                />
              </>
            )}
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default PostItem;
