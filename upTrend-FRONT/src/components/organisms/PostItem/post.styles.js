import { makeStyles } from '@material-ui/core';

export const usePostStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardCategoryBanner: {
    paddingTop: '3%',
    display: 'flex',
    justifyContent: 'center',
    textTransform: 'uppercase',
    color: 'black',
    '-webkit-filter': 'grayscale(100%)', /* Safari 6.0 - 9.0 */
    filter: 'grayscale(100%)'
  },
  cardCategoryBannerText: {
    color: 'white',
    padding: '5px 10px 0 10px',
    background: 'rgba(0,0,0, 0.5)'
  },
  cardMedia: {
    paddingTop: '40%'
  },
  cardContent: {
    flexGrow: 1
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));
