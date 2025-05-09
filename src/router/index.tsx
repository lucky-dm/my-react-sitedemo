import Home from "../pages/home";
import Add from "../pages/add";
import Category from "../pages/category";
import CategoryDetail from "../pages/category/categoryDetail";

export const route = [
  { path: "/normal/home", element: <Home /> },
  { path: "/normal/add", element: <Add /> },
  {
    path: "/normal/category",
    element: <Category />,
    children: [
      {
        index: true, // 对应 /category 默认展示的子页面
        element: <div>分类首页</div>,
      },
      {
        path: ":type", // 动态子路径 /category/xxx
        element: <CategoryDetail />,
      },
    ],
  },
];
