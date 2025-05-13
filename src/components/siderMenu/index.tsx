import { Menu } from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SiderMenu(props: any) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  console.log(location);
  const { menuData } = props;

  const handleClick = (e: any) => {
    navigate(e.key);
  };

  const handleOpenkeysChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  useEffect(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    if (segments.length >= 2) {
      const openKey = `/${segments[0]}/${segments[1]}`;
      setOpenKeys([openKey]);
      console.log(openKey,'000')
    }
  }, [location.pathname]);

  return (
    <>
      <Menu
        onClick={handleClick}
        mode="inline"
        style={{height:'100%'}}
        defaultSelectedKeys={["/normal/home"]}
        selectedKeys={[location.pathname]}
        openKeys={openKeys}
        onOpenChange={handleOpenkeysChange}
        items={menuData}
      />
    </>
  );
}

export default SiderMenu;
