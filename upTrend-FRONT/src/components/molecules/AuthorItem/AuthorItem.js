import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import { Avatar, ListItemAvatar } from '@material-ui/core';

import { GET_USER } from 'graphql/users';

import { useAuthorItemStyles } from './authorItem.styles';

const AuthorItem = ({ userId }) => {
  const classes = useAuthorItemStyles();
  const { data, loading, error } = useQuery(GET_USER, { variables: { userId } });

  if (loading) {
    return <div />;
  }
  if (error) {
    return <div>Oops an error has occured...</div>;
  }

  const fullName = `${data.getUser.user.firstName} ${data.getUser.user.lastName}`;
  return (
    <div className={classes.authorItem}>
      <ListItemAvatar >
        <Avatar
          alt={fullName}
          src={data.getUser.user.avatar}
          className={classes.avatar}
        />
      </ListItemAvatar>
      <span>{fullName}</span>
    </div>
  );
};

export default AuthorItem;
