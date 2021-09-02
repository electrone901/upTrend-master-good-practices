import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import {
  Dialog,
  DialogContent,
  Typography,
  Fade,
  Select,
  OutlinedInput,
  MenuItem
} from '@material-ui/core';

import { TextFieldGroup } from 'components/molecules/TextFieldGroup/TextFieldGroup';
import SubmitOrCancel from 'components/organisms/SubmitOrCancel/SubmitOrCancel';
import { DialogTitle } from 'components/templates/DialogTitle/DialogTitle';
import { roles, genders } from 'utils/staticLists';
import { GET_ALL_USERS } from 'graphql/users';

const UserFormDialog = ({ isOpen, toggleDialog, initialValues, mutation, mode }) => {
  const [mutationError, setMutationError] = useState(false);

  const validateFields = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    gender: Yup.string(),
    role: Yup.string().required('Role is required'),
    avatar: Yup.string(),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required')
  });

  const onSubmit = async ({ id, ...fields }, form, mutateUser) => {
    const createOrEditUser = mode === 'edit' ? 'updateUser' : 'createUser';
    if (mutateUser) {
      try {
        const mutateUserResponse = await mutateUser({
          variables: {
            input: {
              userId: id,
              ...fields
            }
          },
          refetchQueries: [{ query: GET_ALL_USERS }]
        });
        const { data } = mutateUserResponse;
        const hasData = data && data[createOrEditUser];
        const isMutationOk = hasData && data[createOrEditUser].ok;
        const hasMutationErrors =
          hasData &&
          data[createOrEditUser].errors &&
          data[createOrEditUser].errors.length > 0;

        if (hasMutationErrors || !isMutationOk) {
          return setMutationError(true);
        }

        if (isMutationOk) {
          form.resetForm();
          return toggleDialog();
        }
      } catch (err) {
        return setMutationError(true);
      }
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={toggleDialog}
      fullWidth
      aria-labelledby='user-dialog-title'
    >
      <DialogTitle id='user-dialog-title' onClose={toggleDialog}>
        {mode} user
      </DialogTitle>
      <DialogContent dividers>
        <Mutation mutation={mutation}>
          {(mutate, { loading }) => (
            <Formik
              initialValues={initialValues}
              validationSchema={validateFields}
              onSubmit={(fields, form) => onSubmit(fields, form, mutate)}
              render={({ errors, touched, handleSubmit, handleReset }) => (
                <Form onSubmit={handleSubmit}>
                  {mutationError && (
                    <Fade in={mutationError}>
                      <Typography color='error'>
                        Something went wrong while saving this user :(
                      </Typography>
                    </Fade>
                  )}
                  <Field
                    name='firstName'
                    render={({ field, form }) => (
                      <TextFieldGroup
                        {...field}
                        form={form}
                        name='firstName'
                        label='First Name'
                        placeholder='First Name'
                        required
                      />
                    )}
                  />
                  <Field
                    name='lastName'
                    render={({ field, form }) => (
                      <TextFieldGroup
                        {...field}
                        form={form}
                        name='lastName'
                        label='Last Name'
                        placeholder='Last Name'
                        required
                      />
                    )}
                  />
                  <Field
                    name='email'
                    render={({ field, form }) => (
                      <TextFieldGroup
                        {...field}
                        form={form}
                        name='email'
                        label='Email'
                        placeholder='Email'
                        required
                      />
                    )}
                  />
                  <Field
                    name='role'
                    render={({ field, form }) => (
                      <Select
                        {...field}
                        value={field.value || 0}
                        fullWidth
                        style={{ margin: '17px 0' }}
                        variant='outlined'
                        input={
                          <OutlinedInput
                            name='role'
                            placeholder='Role'
                          />
                        }
                      >
                        <MenuItem
                          key='select.role'
                          value={0}
                        >
                          <em>Select a role</em>
                        </MenuItem>
                        {roles.map(role => (
                          <MenuItem key={role.value} value={role.value}>
                            {role.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <Field
                    name='gender'
                    render={({ field, form }) => (
                      <Select
                        {...field}
                        value={field.value || 0}
                        fullWidth
                        style={{ margin: '17px 0' }}
                        variant='outlined'
                        input={
                          <OutlinedInput
                            name='gender'
                            placeholder='Gender'
                          />
                        }
                      >
                        <MenuItem
                          key='select.gender'
                          value={0}
                        >
                          <em>Select a gender</em>
                        </MenuItem>
                        {genders.map(gender => (
                          <MenuItem key={gender.value} value={gender.value}>
                            {gender.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <Field
                    name='avatar'
                    render={({ field, form }) => (
                      <TextFieldGroup
                        {...field}
                        form={form}
                        name='avatar'
                        label='Avatar'
                        placeholder='Avatar'
                      />
                    )}
                  />
                  <SubmitOrCancel
                    onSubmit={onSubmit}
                    errors={errors}
                    loading={loading}
                    resetForm={() => {
                      return handleReset();
                    }}
                  />
                </Form>
              )}
            />
          )}
        </Mutation>
      </DialogContent>
    </Dialog>
  );
};

UserFormDialog.defaultProps = {
  mode: 'create'
};

export default UserFormDialog;
