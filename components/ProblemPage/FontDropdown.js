import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

var sizeList = ["10px", "15px", "20px", "25px"];

function FontDropdown(props) {
  function handleMenuClick(e) {
    // document.getElementsByClassName(".CodeMirror").style.fontSize =
    //   e.key + " !important";
    // var ele = document.getElementsByClassName("CodeMirror");
    // ele[0].style.fontsize = "100px !important";
    console.log(ele[0].style);
    props.setFontSize(e.key);
    console.log(e);
  }

  const renderList = sizeList.map((item) => {
    if (item !== props.fontSize) {
      return <Menu.Item key={item}>{item}</Menu.Item>;
    } else {
      return <></>;
    }
  });

  const menu = <Menu onClick={handleMenuClick}>{renderList}</Menu>;

  return (
    <div>
      <label className="font-semibold mr-3">Font Dropdown</label>
      <Dropdown
        overlay={menu}
        overlayStyle={{ background: "black", color: "white" }}
      >
        <Button>
          {props.fontSize}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}

export default FontDropdown;
