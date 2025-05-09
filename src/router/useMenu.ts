import { useState, useEffect,useMemo } from "react";
import { MenuItemType } from "../types/menuItem";

export function useMenu() {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const getTypes = () => {
      const res = localStorage.getItem("siteTypes");
      if (res) {
        const typeLists = JSON.parse(res);
        typeLists.forEach((item: any) => {
          item.key = `/normal/category/${item.value}`;
        });
        setTypes(typeLists);
      }
    };
    getTypes();

    // 监听新增类型
    window.addEventListener("addType", getTypes);

    // 清除监听
    return () => {
      window.removeEventListener("addType", getTypes);
    };
  }, []);

  // 这个useMemo是为了避免每次渲染都重新计算menuItems，提高性能 感觉有点像vue的计算属性
  // 像之前 直接写const menuItems = [...] 里面的types改变了 menuItems 也不会实时更新 
  const menuItems = useMemo(()=>{
    return [
      {
        label: "普通模式",
        key: "/normal",
        children: [
          {
            label: "全部",
            key: "/normal/home",
          },
          {
            label: "分类",
            key: "/normal/category",
            children: [...types],
          },
          {
            label: "添加收藏",
            key: "/normal/add",
          },
        ],
      },
    ];
  },[types])

  const getFirstMenu = () => {
    return menuItems.map((item: MenuItemType) => {
      return {
        label: item.label,
        key: item.key,
      };
    });
  };

  const getSecondMenu = (key: string) => {
    const menu = menuItems.find((item: MenuItemType) => {
      return item.key === key;
    });
    if (menu) {
      return menu.children;
    }
    return [];
  };

  return {
    menuItems,
    getFirstMenu,
    getSecondMenu,
  };
}
