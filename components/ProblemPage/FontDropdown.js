import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

var sizeList = ["10px", "20px", "40px", "50px"];

function FontDropdown(props) {
  const dispatch = useDispatch();

  const renderList = sizeList.map((item) => {
    if (item !== props.fontSize) {
      return <Menu.Item key={item}>{item}</Menu.Item>;
    } else {
      return <></>;
    }
  });

  const menu = (
    <Menu onClick={(e) => dispatch(props.setFontSize(e.key))}>
      {renderList}
    </Menu>
  );

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
