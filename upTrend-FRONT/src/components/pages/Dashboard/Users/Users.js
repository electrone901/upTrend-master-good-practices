import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { useQuery } from 'react-apollo-hooks';
import { useStoreState } from 'easy-peasy';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Typography,
  Container
} from '@material-ui/core';

import {
  RemoveRedEye as SeeIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@material-ui/icons/';

import { useUserStyles } from './user.styles';
import { GET_ALL_USERS, DELETE_USER, CREATE_USER, UPDATE_USER } from 'graphql/users';
import ConfirmPopover from 'components/molecules/ConfirmPopover/ConfirmPopover';
import { renderGender } from 'utils/helpers';
import UserFormDialog from 'components/templates/UserForm/UserForm';
import useToggle from 'utils/hooks/useToggle';

const Users = () => {
  const classes = useUserStyles();
  const {
    isOpen: isCreateDialogOpen,
    handleToggle: setToggleCreateDialog
  } = useToggle();
  const {
    isOpen: isEditDialogOpen,
    handleToggle: setToggleEditDialog
  } = useToggle();

  const [user, setUser] = useState({
    userId: null,
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    gender: ''
  });

  const isAdmin = useStoreState(state => state.user.user.role === 'admin');
  const { data, error, loading } = useQuery(GET_ALL_USERS);
  const users = data.allUsers;

  const handleEditUser = (user) => {
    const { __typename, ...userFields } = user;
    setUser(userFields);
    setToggleEditDialog();
  };

  if (loading) {
    return <div />;
  }
  if (error) {
    return <div>Oops an error has occured...</div>;
  }
  return (
    <>
      <CssBaseline />
      <div className={classes.heroContent}>
        <Container maxWidth='sm'>
          <Typography
            component='h1'
            variant='h2'
            align='center'
            color='textPrimary'
            gutterBottom
          >
            Users
          </Typography>
          <Typography
            variant='h5'
            align='center'
            color='textSecondary'
            paragraph
          >
            You can browse through all the users.
          </Typography>
          {isAdmin && (
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify='center'>
                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={setToggleCreateDialog}
                  >
                    Create a user
                  </Button>
                </Grid>
              </Grid>
            </div>
          )}
        </Container>
      </div>
      {isAdmin && isCreateDialogOpen && (
        <UserFormDialog
          isOpen={isCreateDialogOpen}
          mutation={CREATE_USER}
          initialValues={{
            firstName: '',
            lastName: '',
            role: '',
            email: '',
            avatar: '',
            gender: ''
          }}
          toggleDialog={setToggleCreateDialog}
        />
      )}
      {isAdmin && isEditDialogOpen && (
        <UserFormDialog
          mode='edit'
          mutation={UPDATE_USER}
          isOpen={isEditDialogOpen}
          toggleDialog={setToggleEditDialog}
          initialValues={user}
        />
      )}
      <Container className={classes.cardGrid} maxWidth='md'>
        <Grid container spacing={4}>
          {users.map(user => (
            <Grid item key={user.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={
                    user.avatar ||
                    'https://source.unsplash.com/random/400x200'
                  }
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant='h5' component='h2'>
                    {user.gender && renderGender(user.gender)}{' '}
                    {user.firstName && user.firstName}{' '}
                    {user.lastName && user.lastName}
                  </Typography>
                  <Typography>{user.email && user.email}</Typography>
                  <Typography>
                    {user.role && <span>Permissions: {user.role}</span>}
                  </Typography>
                </CardContent>
                {isAdmin && (
                  <CardActions className={classes.cardActions}>
                    <Button size='small' color='primary'>
                      <SeeIcon color='primary' />
                    </Button>
                    <Button size='small' onClick={() => handleEditUser(user)}>
                      <EditIcon color='secondary' />
                    </Button>
                    <Mutation mutation={DELETE_USER}>
                      {deleteUser => (
                        <ConfirmPopover
                          confirmAction='Delete user'
                          onConfirmation={() => {
                            return deleteUser({
                              variables: {
                                id: user.id
                              },
                              refetchQueries: [{ query: GET_ALL_USERS }]
                            });
                          }}
                        >
                          <DeleteIcon color='error' />
                        </ConfirmPopover>
                      )}
                    </Mutation>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Users;
