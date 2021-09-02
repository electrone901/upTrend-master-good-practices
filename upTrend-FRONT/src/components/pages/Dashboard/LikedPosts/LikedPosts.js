import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';

import { Button, Container, CssBaseline, Grid } from '@material-ui/core';

import { GET_ALL_POSTS } from 'graphql/posts';
import { usePostStyles } from 'components/organisms/PostItem/post.styles';
import HeroContainer from 'components/templates/HeroContainer/HeroContainer';
import PostList from 'components/organisms/PostList/PostList';
import { resetLinkStyle } from 'utils/styles';

const LikedPosts = () => {
  const classes = usePostStyles();

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
        title='Posts you liked'
        description='You can browse through all your the posts you liked.'
        heroButtons={
          <Grid item>
            <Link style={resetLinkStyle} to='/app/posts'>
              <Button variant='contained' color='primary'>
                See all posts
              </Button>
            </Link>
          </Grid>
        }
      />
      <Container className={classes.cardGrid} maxWidth='xl'>
        <Grid container spacing={4}>
          <PostList showOnlyLiked posts={data.allPosts} />
        </Grid>
      </Container>
    </>
  );
};

export default LikedPosts;
