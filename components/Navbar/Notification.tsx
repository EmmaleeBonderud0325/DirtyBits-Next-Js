// import { useRef } from "react";
import { Badge } from 'primereact/badge';
// import { Menu as PrimeMenu } from "primereact/menu";
import { Button as Btn } from "primereact/button";
// import { useSelector } from "react-redux";

//  const BadgeDemo = () => {
//     const menu = useRef(null);
//     // @ts-ignore
//     const isLoggedIn = useSelector(state => state.userData.is_logged_in)
//     const items = [
//         {
//           items: [
//             {
//               label: "Some Notifications",
//             },    
//           ],
//         },
//       ];
//     let markup: JSX.Element;
//     if(isLoggedIn){
//       markup = (
//         <>
//         <PrimeMenu className="" model={items} popup ref={menu} id="popup_menu" />
//                        <Btn icon={<i className="pi pi-bell mr-4 p-text-secondary p-overlay-badge" style={{ fontSize: '1.3rem' }}><Badge value="1" ></Badge></i>} onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup />             
                       
//                </>
//       )
//     }else {
//       markup = (
//         <>
//         </>
//       )
//     }
      
//     return markup;
// }

// export default BadgeDemo
 
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