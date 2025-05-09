import { useState, useEffect } from "react";
import { SiteData } from "../../types/siteData";
import CardItem from "../../components/card";
import "./index.scss";

function Home() {
  const [webSiteLists, setWebSiteLists] = useState([]);

  useEffect(() => {
    const res = localStorage.getItem("webSiteLists");
    if (res) {
      setWebSiteLists(JSON.parse(res));
    }
  }, []);

  return (
    <div className="home-page">
      {webSiteLists.map((item: SiteData) => (
        <CardItem itemInfo={item}/>
      ))}
    </div>
  );
}
export default Home;
