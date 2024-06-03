import { useState } from 'react';
import { Button } from 'antd';

export function ListItem({ ItemIco,text,type,onClick }) {
  return (
    <Button block onClick={onClick} type={type} icon= {ItemIco && <ItemIco />}>
      {text}
    </Button>
  );
}
