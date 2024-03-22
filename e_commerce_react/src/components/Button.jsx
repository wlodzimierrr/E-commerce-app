import React from 'react';
import { Button } from 'antd';

function CustomButton(props) {
  const { children, isLoading, ...rest } = props;

  return (
    <Button loading={isLoading} {...rest}>
      {children}
    </Button>
  );
}

export default CustomButton;
