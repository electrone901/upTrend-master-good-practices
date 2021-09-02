import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import BookmarksIcon from '@material-ui/icons/BookmarksOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PostsIcon from '@material-ui/icons/LibraryBooksOutlined';
import LikesIcon from '@material-ui/icons/ThumbUpAltOutlined';
import CodeIcon from '@material-ui/icons/CodeOutlined';
import SecurityIcon from '@material-ui/icons/SecurityOutlined';
import NetworkIcon from '@material-ui/icons/NetworkCheckOutlined';
import TestingIcon from '@material-ui/icons/AssignmentOutlined';
import AIIcon from '@material-ui/icons/GraphicEqOutlined';
import AllIcon from '@material-ui/icons/AllInclusiveOutlined';

import { resetLinkStyle } from 'utils/styles';

export const MainNavItems = withRouter(({ history, match }) => {
  const isActive = (path) => history.location.pathname.includes(path);
  return (
    <>
      <Link style={resetLinkStyle} to='/app/posts'>
        <ListItem button selected={isActive('/app/posts')}>
          <ListItemIcon>
            <PostsIcon color={isActive('/app/posts') ? 'secondary' : 'primary'} />
          </ListItemIcon>
          <ListItemText primary='Posts' />
        </ListItem>
      </Link>
      <Link style={resetLinkStyle} to='/app/liked'>
        <ListItem button selected={isActive('/app/liked')}>
          <ListItemIcon>
            <LikesIcon color={isActive('/app/liked') ? 'secondary' : 'primary'} />
          </ListItemIcon>
          <ListItemText primary='Liked posts' />
        </ListItem>
      </Link>
      <Link style={resetLinkStyle} to='/app/bookmarks'>
        <ListItem button selected={isActive('/app/bookmarks')}>
          <ListItemIcon>
            <BookmarksIcon color={isActive('/app/bookmarks') ? 'secondary' : 'primary'} />
          </ListItemIcon>
          <ListItemText primary='Bookmarks' />
        </ListItem>
      </Link>
      <Link style={resetLinkStyle} to='/app/users'>
        <ListItem button selected={isActive('/app/users')}>
          <ListItemIcon>
            <PeopleIcon color={isActive('/app/users') ? 'secondary' : 'primary'} />
          </ListItemIcon>
          <ListItemText primary='Users' />
        </ListItem>
      </Link>
      <Link style={resetLinkStyle} to='/app/profile'>
        <ListItem button selected={isActive('/app/profile')}>
          <ListItemIcon>
            <SettingsIcon color={isActive('/app/profile') ? 'secondary' : 'primary'} />
          </ListItemIcon>
          <ListItemText primary='Profile' />
        </ListItem>
      </Link>
    </>
  );
});

export const SecondaryNavItems = withRouter(({ history }) => {
  const setCategoryToBrowse = useStoreActions(actions => actions.posts.setCategoryToBrowse);
  const selectedCategory = useStoreState(state => state.posts.selectedCategory);
  const isActive = category => category === selectedCategory;
  const isOnPosts =
    history.location.pathname.includes('/app/posts') ||
    history.location.pathname.includes('/app/liked');

  const handleCategoryChange = category => {
    setCategoryToBrowse(category);
    const elmnt = document.getElementById('posts-section');
    return elmnt.scrollIntoView(({ block: 'end', behavior: 'smooth' }));
  };
  return isOnPosts && (
    <>
      <ListItem
        button
        onClick={() => handleCategoryChange('')}
        selected={isActive('')}
      >
        <ListItemIcon>
          <AllIcon color={isActive('') ? 'secondary' : 'primary'} />
        </ListItemIcon>
        <ListItemText primary='All Categories' />
      </ListItem>
      <ListItem
        button
        onClick={() => handleCategoryChange('software')}
        selected={isActive('software')}
      >
        <ListItemIcon>
          <CodeIcon color={isActive('software') ? 'secondary' : 'primary'} />
        </ListItemIcon>
        <ListItemText primary='Software' />
      </ListItem>
      <ListItem button onClick={() => handleCategoryChange('security')} selected={isActive('security')}>
        <ListItemIcon>
          <SecurityIcon color={isActive('security') ? 'secondary' : 'primary'} />
        </ListItemIcon>
        <ListItemText primary='Security' />
      </ListItem>
      <ListItem button onClick={() => handleCategoryChange('network')} selected={isActive('network')}>
        <ListItemIcon>
          <NetworkIcon color={isActive('network') ? 'secondary' : 'primary'} />
        </ListItemIcon>
        <ListItemText primary='Network' />
      </ListItem>
      <ListItem button onClick={() => handleCategoryChange('AI')} selected={isActive('AI')}>
        <ListItemIcon>
          <AIIcon color={isActive('AI') ? 'secondary' : 'primary'} />
        </ListItemIcon>
        <ListItemText primary='Artificial Intelligence' />
      </ListItem>
      <ListItem button onClick={() => handleCategoryChange('testing')} selected={isActive('testing')}>
        <ListItemIcon>
          <TestingIcon color={isActive('testing') ? 'secondary' : 'primary'} />
        </ListItemIcon>
        <ListItemText primary='Testing &amp; QA' />
      </ListItem>
    </>
  );
});
