import React from 'react';
import { Mutation } from 'react-apollo';

import DeleteIcon from '@material-ui/icons/Delete';

import ConfirmPopover from '../ConfirmPopover/ConfirmPopover';

const DeleteButton = ({ actionTitle, mutation, ...mutationOptions }) => {
  return (
    <Mutation mutation={mutation}>
      {mutate => (
        <ConfirmPopover
          confirmAction={actionTitle}
          onConfirmation={() =>
            mutate({
              ...mutationOptions
            })
          }
        >
          <DeleteIcon color='error' />
        </ConfirmPopover>
      )}
    </Mutation>
  );
};

DeleteButton.defaultProps = {
  update: null
};

export default DeleteButton;
