import { FC } from 'react';
import PropTypes from 'prop-types';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Typography, Button, Grid } from '@mui/material';

interface PageTitleProps {
  heading?: string;
  subHeading?: string;
  docs?: string;
  mode?: Function;
}

const PageTitle: FC<PageTitleProps> = ({
  heading = '',
  subHeading = '',
  docs = '',
  mode = null,
  ...rest
}) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      {...rest}
    >
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {heading}
        </Typography>
        <Typography variant="subtitle2">{subHeading}</Typography>
      </Grid>
      <Grid item>
        {mode && <Button onClick={() => {
          mode(docs == "list" ? "add" : "list")
        }}
          variant="contained"
          sx={{ mt: { xs: 2, md: 0 } }}
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          {docs == "list" ? "Add" : "Cancel"}
        </Button>}
      </Grid>
    </Grid>
  );
};

PageTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  docs: PropTypes.string,
  mode: PropTypes.func,
};

export default PageTitle;
