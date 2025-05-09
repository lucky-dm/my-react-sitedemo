import { Layout } from "antd";
import { useRoutes } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useMenu } from "./router/useMenu";
import { MenuItemType } from "./types/menuItem";
import { route } from "./router/index";
import TopMenu from "./components/topMenu";
import SiderMenu from "./components/siderMenu";
import FooterContent from "./components/footerContent";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [menu, setMenu] = useState<MenuItemType[]>([]); // 二级菜单 也就是左侧菜单
  const { getFirstMenu, getSecondMenu, menuItems } = useMenu();
  const elements = useRoutes(route); // 路由占位
  
  const firstMenu = useMemo(() => {
    return getFirstMenu();
  }, [menuItems]);

  const firstClick = (item: MenuItemType) => {
    setMenu(getSecondMenu(item.key));
  };

  useEffect(() => {
    const key = firstMenu[0]?.key;
    if (key) {
      setMenu(getSecondMenu(key));
    }
  }, [firstMenu]);

  return (
    <>
      <Layout className="layout" style={{ minHeight: "100vh" }}>
        <Header>
          <TopMenu firstMenuItems={firstMenu} itemClick={firstClick} />
        </Header>
        <Layout>
          <Sider width="15%">
            <SiderMenu menuData={menu} />
          </Sider>
          <Content>{elements}</Content>
        </Layout>
        <Footer>
          <FooterContent />
        </Footer>
      </Layout>
    </>
  );
}

export default App;
