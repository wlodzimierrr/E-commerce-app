import React from 'react';
import MUIButton from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

function Button(props) {
  const { children, isLoading, ...rest } = props;

  return (
    <MUIButton {...rest} disabled={isLoading}>
      {isLoading ? <CircularProgress size={24} color="secondary" /> : children}
    </MUIButton>
  );
}

export default Button;
