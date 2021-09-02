import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import {
  Dialog,
  DialogContent,
  Typography,
  Fade
} from '@material-ui/core';

import { TextFieldGroup } from 'components/molecules/TextFieldGroup/TextFieldGroup';
import SubmitOrCancel from 'components/organisms/SubmitOrCancel/SubmitOrCancel';
import { GET_ALL_POSTS } from 'graphql/posts';
import { DialogTitle } from 'components/templates/DialogTitle/DialogTitle';
import { GET_ALL_COMMENTS_BY_POST } from 'graphql/comments';

const CommentFormDialog = ({ isOpen, toggleDialog, initialValues, postId, mutation, mode }) => {
  const [mutationError, setMutationError] = useState(false);

  const validateFields = Yup.object().shape({
    title: Yup.string()
      .required('Title is required'),
    content: Yup.string().required()
  });

  const onSubmit = async (fields, form, mutateComment) => {
    const isInEditMode = mode === 'edit';
    const createOrEditComment = isInEditMode ? 'updateComment' : 'createComment';
    if (mutateComment) {
      try {
        const mutateCommentResponse = await mutateComment({
          variables: {
            input: {
              ...fields
            }
          },
          update: (proxy, { data }) => {
            const cacheData = proxy.readQuery({ query: GET_ALL_POSTS });
            try {
              if (!isInEditMode && data[createOrEditComment].ok) {
                const allPosts = cacheData.allPosts.map(
                  post => post.id !== postId
                    ? post
                    : {
                      ...post,
                      commentsCount: post.commentsCount + 1
                    });
                return proxy.writeQuery({ query: GET_ALL_POSTS, data: { allPosts } });
              }
            } catch (error) {
              console.error(error);
            }
          },
          refetchQueries: [{ query: GET_ALL_COMMENTS_BY_POST, variables: { postId } }]
        });
        const { data } = mutateCommentResponse;
        const hasData = data && data[createOrEditComment];
        const isMutationOk = hasData && data[createOrEditComment].ok;
        const hasMutationErrors =
          hasData &&
          data[createOrEditComment].errors &&
          data[createOrEditComment].errors.length > 0;

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
      aria-labelledby='comment-dialog-title'
    >
      <DialogTitle id='comment-dialog-title' onClose={toggleDialog}>
        {mode} comment
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
                        Something went wrong while saving this comment :(
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

CommentFormDialog.defaultProps = {
  mode: 'create'
};

export default CommentFormDialog;
