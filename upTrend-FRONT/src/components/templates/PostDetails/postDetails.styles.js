import { makeStyles } from '@material-ui/styles';

export const usePostDetailsStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: theme.palette.background
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  list: {
    width: '100%'
  },
  coverImage: {
    width: '100%',
    height: '40%',
    objectFit: 'cover'
  },
  postActions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  likeButtonWrapper: {
    marginTop: '4px'
  },
  addCommentBtn: {
    marginLeft: '15px'
  }
}));
