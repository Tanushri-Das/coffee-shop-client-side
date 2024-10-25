import React from "react";
import { useGetMenuQuery } from "../../redux/features/menu/menuApi";

const MenuComponent = () => {
  const { data: menuItems, error, isLoading } = useGetMenuQuery();
  console.log("menuItems", menuItems);

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Render the menu items
  return (
    <div>
      <h1>Menu</h1>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>{item.item_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MenuComponent;
