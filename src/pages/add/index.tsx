import { Button, Input, Select } from "antd";
import { useState, useEffect } from "react";
import { SiteData } from "../../types/siteData";
import "./index.scss";

function Add() {
  const [isShow, setIsShow] = useState(""); // 控制添加显示和隐藏 type link
  const [typeValue, setTypeValue] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    type: "",
  });
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (isShow === "link") {
      const res = localStorage.getItem("siteTypes");
      if (res) {
        const siteTypes = JSON.parse(res);
        setTypes(siteTypes);
      }
    }
  }, [isShow]);

  const handleSave = () => {
    // 往localStorage中添加数据 首先看下localStorage中是否有数据
    const res = localStorage.getItem("webSiteLists");
    let webSiteLists: SiteData[];
    if (res) {
      // 追加新数据
      webSiteLists = JSON.parse(res);
      webSiteLists?.push(formData);
    } else {
      webSiteLists = [];
      webSiteLists?.push(formData);
    }
    // 重新保存
    localStorage.setItem("webSiteLists", JSON.stringify(webSiteLists));
    // 关闭添加输入框区域 并清空输入框
    setIsShow("");
    setFormData({
      title: "",
      link: "",
      type: "",
    });
  };

  const handleSaveType = () => {
    // 往localStorage中添加数据 首先看下localStorage中是否有数据
    const res = localStorage.getItem("siteTypes");
    let siteTypes: any[];
    if (res) {
      // 追加新数据
      siteTypes = JSON.parse(res);
      siteTypes?.push({
        value: siteTypes?.length,
        label: typeValue,
      });
    } else {
      siteTypes = [];
      siteTypes?.push({
        value: siteTypes?.length,
        label: typeValue,
      });
    }
    // 重新保存
    localStorage.setItem("siteTypes", JSON.stringify(siteTypes));

    // 发出时间 app.tsx里刷新分类菜单项
    window.dispatchEvent(new Event("addType"));

    // 关闭添加输入框区域 并清空输入框
    setIsShow("");
    setTypeValue("");
  };

  const handleInputChange = (key: string, e: any) => {
    console.log(e.target.value, "00");
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  const handleSelectChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <div className="add-page">
      <div className="btns">
        <Button onClick={() => setIsShow("type")}>添加网站链接类型</Button>
        <Button onClick={() => setIsShow("link")}>添加网站链接</Button>
      </div>

      {/* 添加网站链接类型的表单输入框区域 */}
      {isShow === "type" && (
        <div className="add-type-content">
          <div className="item-display">
            <div className="label">类型：</div>
            <Input
              placeholder="请输入"
              value={typeValue}
              style={{ width: 250 }}
              onChange={(e) => setTypeValue(e.target.value)}
            />
          </div>
          {/* 保存按钮 */}
          <Button type="primary" className="save-btn" onClick={handleSaveType}>
            保存
          </Button>
        </div>
      )}

      {/* 添加网站链接的表单输入框区域 */}
      {isShow === "link" && (
        <div>
          <div className="add-content">
            <div className="item-display">
              <div className="label">标题：</div>
              <Input
                value={formData.title}
                placeholder="请输入网址标题"
                style={{ width: 250 }}
                onChange={(e) => handleInputChange("title", e)}
              />
            </div>
            <div className="item-display">
              <div className="label">链接：</div>
              <Input
                value={formData.link}
                placeholder="请输入网址链接"
                style={{ width: 250 }}
                onChange={(e) => handleInputChange("link", e)}
              />
            </div>
            <div className="item-display">
              <div className="label">类型：</div>
              <Select
                style={{ width: 250 }}
                onChange={(value) => handleSelectChange("type", value)}
                placeholder="请选择类型"
                value={formData.type}
                options={types}
              />
            </div>
            {/* 保存按钮 */}
            <Button type="primary" className="save-btn" onClick={handleSave}>
              保存
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Add;
