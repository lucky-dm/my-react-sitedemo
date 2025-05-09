import { Button } from "antd";
import { useState } from "react";
import { SiteData } from "../../types/siteData";
import "./index.scss";

function Card(props: any) {
  const { itemInfo } = props;
  const [deleteBtnShow, setDeleteBtnShow] = useState(false);

  const handleClick = (link: string) => {
    // window.location.href = link; // 在当前窗口打开链接
    window.open(link, "_blank"); // 在新窗口打开链接
  };

  const handleMouseEnter = () => {
    // 鼠标进入时的处理逻辑
    console.log("Mouse entered!");
    setDeleteBtnShow(true);
  };

  const handleMouseLeave = () => {
    // 鼠标离开时的处理逻辑
    console.log("Mouse left!");
    setDeleteBtnShow(false);
  };

  const handleDelete = (e:any) => {
    e.stopPropagation(); // 阻止冒泡
    console.log("删除按钮被点击");
    // 在这里执行删除操作
    const webSiteLists = JSON.parse(
      localStorage.getItem("webSiteLists") || "[]"
    );
    webSiteLists.forEach((item: SiteData, index: number) => {
      if (item.link === itemInfo.link) {
        webSiteLists.splice(index, 1);
      }
    });
    localStorage.setItem("webSiteLists", JSON.stringify(webSiteLists));
    // 删完之后还得刷新页面
    window.location.reload(); // 这样居然也可以解决 但是最好还是发射事件 让首页重新获取下localStorage的数据
  };

  return (
    // <a
    //   href={item.link}
    //   target="_blank"
    //   rel="noopener noreferrer"
    //   className="card-item"
    // >
    //   {item.title}
    // </a>

    <div
      onClick={() => handleClick(itemInfo.link)}
      className="card-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="title">{itemInfo.title}</div>
      {deleteBtnShow && (
        <Button className="delete-btn" onClick={handleDelete}>
          删除
        </Button>
      )}
    </div>
  );
}

export default Card;
