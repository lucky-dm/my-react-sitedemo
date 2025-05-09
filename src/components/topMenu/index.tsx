import { MenuItemType } from "../../types/menuItem";

function TopMenu(props: any) {
  const { firstMenuItems,itemClick } = props;

  const handleClick = (item:MenuItemType) => {
    itemClick(item);
  };

  return (
    <div >
      {firstMenuItems.map((item: MenuItemType) => {
        return <div key={item.key} onClick={() => handleClick(item)}>{item.label}</div>;
      })}
    </div>
  );
}

export default TopMenu;
