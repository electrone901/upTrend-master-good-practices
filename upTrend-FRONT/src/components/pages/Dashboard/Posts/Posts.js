import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import { GET_ALL_POSTS, CREATE_POST } from 'graphql/posts';
import useToggle from 'utils/hooks/useToggle';
import { usePostStyles } from 'components/organisms/PostItem/post.styles';
import PostFormDialog from 'components/templates/PostForm/PostFormDialog';
import HeroContainer from 'components/templates/HeroContainer/HeroContainer';
import PostList from 'components/organisms/PostList/PostList';

const Posts = () => {
  const classes = usePostStyles();
  const { isOpen: isCreateDialogOpen, handleToggle: setToggleCreateDialog } = useToggle();

  const { data, error, loading } = useQuery(GET_ALL_POSTS);

  if (loading) {
    return <div />;
  }
  if (error) {
    return <div>Oops an error has occured...</div>;
  }
  return (
    <>
      <CssBaseline />
      <HeroContainer
        id='posts-section'
        title='Posts'
        description='You can browse through our posts accross all categories.'
        heroButtons={
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              onClick={setToggleCreateDialog}
            >
              Create a post
            </Button>
          </Grid>
        }
      />
      {isCreateDialogOpen && (
        <PostFormDialog
          initialValues={{
            title: '',
            content: '',
            cover: ''
          }}
          mutation={CREATE_POST}
          isOpen={isCreateDialogOpen}
          toggleDialog={setToggleCreateDialog}
        />
      )}
      <Container className={classes.cardGrid} maxWidth='xl'>
        <Grid container spacing={4}>
          <PostList posts={data.allPosts} />
        </Grid>
      </Container>
    </>
  );
};

export default Posts;
