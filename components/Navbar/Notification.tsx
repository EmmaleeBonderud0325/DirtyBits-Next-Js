import { Badge } from 'primereact/badge';

import { Button as Btn } from "primereact/button";
import { Menu, Divider } from '@mantine/core';

function Notification() {
  return (
    <Menu control={<Btn icon={<i className="pi pi-bell mr-4 p-text-secondary p-overlay-badge" style={{ fontSize: '1.3rem' }}><Badge value="1" ></Badge></i>} aria-haspopup />   }>
      <Menu.Item>Welcome to DirtyBits</Menu.Item>
      <Divider/>
    </Menu>
  );
}

export default Notification;