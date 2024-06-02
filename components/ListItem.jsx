import { useState } from 'react';
import { Button } from 'antd';

export function ListItem({ ItemIco,text,onClick }) {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  return (
    <Button  block onClick={onClick} icon= {ItemIco && <ItemIco />}>
      {text}
    </Button>
  );
}
