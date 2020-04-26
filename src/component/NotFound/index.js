import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from '@reach/router'

const NoFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={(
        <Button type="primary" onClick={() => navigate('../', { replace: true })}>
          Back Home
        </Button>
      )}
    />
  )
}

export default NoFoundPage;
