import { useRef } from "react";
import { Badge } from 'primereact/badge';
import { Menu as PrimeMenu } from "primereact/menu";
import { Button as Btn } from "primereact/button";

 const BadgeDemo = () => {
    const menu = useRef(null);
    const items = [
        {
          items: [
            {
              label: "Some Notifications",
            },    
          ],
        },
      ];

    return (
        <div>
 <PrimeMenu className="" model={items} popup ref={menu} id="popup_menu" />
                <Btn icon={<i className="pi pi-bell mr-4 p-text-secondary p-overlay-badge" style={{ fontSize: '1.3rem' }}><Badge value="1" ></Badge></i>} onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup />             
                
        </div>
    );
}

export default BadgeDemo
 