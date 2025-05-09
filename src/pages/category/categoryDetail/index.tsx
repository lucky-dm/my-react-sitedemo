import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SiteData } from "../../../types/siteData";
import CardItem from "../../../components/card";
import "./index.scss";

function Category() {
  const { type } = useParams();
  const [list, setList] = useState<SiteData[]>([]);

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("webSiteLists") || "[]");
    const newList = res.filter(
      (item: SiteData) => Number(item.type) === Number(type)
    );
    setList(newList);
  }, [type]); // 依赖变化时执行，空数组表示只执行一次，不依赖任何变量

  return (
    <div className="category-detail">
      {list.map((item: SiteData) => (
         <CardItem itemInfo={item}/>
      ))}
    </div>
  );
}
export default Category;
