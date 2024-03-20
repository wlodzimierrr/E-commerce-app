import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

const Incrementer = ({ initialValue = 1 }) => {
  const [count, setCount] = useState(initialValue);

  const decrement = () => setCount(prevCount => Math.max(0, prevCount - 1));
  const increment = () => setCount(prevCount => prevCount + 1);

  return (
    <div className="flex space-x-2">

      <div className="flex flex-col items-end space-y-2">
        <Button
          type="link"
          ghost
          className="transform hover:scale-110 transition duration-150 ease-in-out"
          style={{ color: '#22C55E' }}
          onClick={increment}
          aria-label="increase value"
        >
          <UpOutlined />
        </Button>
        <Input placeholder="Basic usage"
          size="large" 
          className="text-start"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <Button
          type="link"
          danger
          ghost
          className="transform hover:scale-110 transition duration-150 ease-in-out"
          onClick={decrement}
          aria-label="decrease value"
        >
          <DownOutlined />
        </Button>
      </div>
    </div>
  );
};

export default Incrementer;
