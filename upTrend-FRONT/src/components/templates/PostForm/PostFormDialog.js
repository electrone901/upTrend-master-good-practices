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
import { GET_ALL_POSTS } from 'graphql/posts';
import { DialogTitle } from 'components/templates/DialogTitle/DialogTitle';
import { postCategories } from 'utils/staticLists';

const PostFormDialog = ({ isOpen, toggleDialog, initialValues, mutation, mode }) => {
  const [mutationError, setMutationError] = useState(false);

  const validateFields = Yup.object().shape({
    title: Yup.string()
      .required('Title is required'),
    content: Yup.string().required(),
    category: Yup.string().required(),
    cover: Yup.string()
  });

  const onSubmit = async (fields, form, mutatePost) => {
    const createOrEditPost = mode === 'edit' ? 'updatePost' : 'createPost';
    if (mutatePost) {
      try {
        const mutatePostResponse = await mutatePost({
          variables: {
            input: {
              ...fields
            }
          },
          refetchQueries: [{ query: GET_ALL_POSTS }]
        });
        const { data } = mutatePostResponse;
        const hasData = data && data[createOrEditPost];
        const isMutationOk = hasData && data[createOrEditPost].ok;
        const hasMutationErrors =
          hasData &&
          data[createOrEditPost].errors &&
          data[createOrEditPost].errors.length > 0;

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
      aria-labelledby='post-dialog-title'
    >
      <DialogTitle id='post-dialog-title' onClose={toggleDialog}>
        {mode} post
      </DialogTitle>
      <DialogContent dividers>
        <Mutation mutation={mutation}>
          {(mutate, { loading }) => (
            <Formik
              initialValues={initialValues}
              validationSchema={validateFields}
              onSubmit={(fields, form) => onSubmit(fields, form, mutate)}
              render={({
                errors,
                touched,
                handleSubmit,
                handleReset,
                values
              }) => (
                <Form onSubmit={handleSubmit}>
                  {mutationError && (
                    <Fade in={mutationError}>
                      <Typography color='error'>
                        Something went wrong while saving this post :(
                      </Typography>
                    </Fade>
                  )}
                  <Field
                    name='title'
                    render={({ field, form }) => (
                      <TextFieldGroup
                        {...field}
                        form={form}
                        name='title'
                        label='Title'
                        placeholder='Title'
                        required
                      />
                    )}
                  />
                  <Field
                    name='content'
                    render={({ field, form }) => (
                      <TextFieldGroup
                        {...field}
                        form={form}
                        multiline
                        name='content'
                        label='Content'
                        placeholder='Content'
                        required
                      />
                    )}
                  />
                  <Field
                    name='category'
                    render={({ field, form }) => (
                      <Select
                        {...field}
                        value={field.value || 0}
                        fullWidth
                        style={{ margin: '17px 0' }}
                        variant='outlined'
                        required
                        input={
                          <OutlinedInput
                            name='category'
                            placeholder='Category'
                          />
                        }
                      >
                        <MenuItem
                          key='select.category'
                          value={0}
                          disabled
                        >
                          <em>Select a category</em>
                        </MenuItem>
                        {postCategories.map(category => (
                          <MenuItem key={category.value} value={category.value}>
                            {category.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <Field
                    name='cover'
                    render={({ field, form }) => (
                      <TextFieldGroup
                        {...field}
                        form={form}
                        name='cover'
                        label='Cover'
                        placeholder='Cover'
                      />
                    )}
                  />
                  <SubmitOrCancel
                    onSubmit={onSubmit}
                    errors={errors}
                    loading={loading}
                    resetForm={handleReset}
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

PostFormDialog.defaultProps = {
  mode: 'create'
};

export default PostFormDialog;
