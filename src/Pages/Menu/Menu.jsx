import React from "react";
import { useGetMenuQuery } from "../../redux/features/menu/menuApi";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const MenuComponent = () => {
  const { data: menuItems, error, isLoading } = useGetMenuQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Filter items by category
  const categories = [
    "coffee",
    "sandwich",
    "pizza",
    "fried",
    "burger",
    "dessert",
  ];
  const filteredItemsByCategory = categories.reduce((acc, category) => {
    acc[category] =
      menuItems?.filter((item) => item.category === category) || [];
    return acc;
  }, {});

  return (
    <div className="m-2 lg:m-12">
      <h1 className="text-4xl text-center font-bold mb-10">Menu</h1>

      <Tabs>
        <TabList className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 md:gap-6 lg:gap-8 justify-center items-center my-4">
          {categories.map((category) => (
            <Tab
              key={category}
              className="px-4 py-2 cursor-pointer outline-none text-lg text-center"
              selectedClassName="border-b-2 border-[#BB8506] font-bold"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Tab>
          ))}
        </TabList>
        <>
          {categories.map((category) => (
            <TabPanel key={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8 w-full justify-items-center">
                {filteredItemsByCategory[category].map((item) => (
                  <div
                    key={item._id}
                    className="bg-[#F3F3F3] w-full h-full flex flex-col justify-between"
                  >
                    <div className="relative w-full h-56">
                      <img
                        className="w-full h-full object-cover object-center"
                        src={item.image}
                        alt=""
                      />
                      <h4 className="absolute top-2 right-2 bg-black text-white text-[20px] font-medium mb-3 px-2 py-1">
                        ${item.price}
                      </h4>
                    </div>
                    <div className="p-4 flex flex-col justify-between items-center">
                      <h2 className="text-[24px] font-semibold mb-2">
                        {item.item_name}
                      </h2>
                      <div className="flex justify-center mt-4">
                        <button className="bg-[#E8E8E8] text-[#BB8506] border-b-2 border-[#BB8506] px-5 py-2 text-lg font-medium">
                          Add to Cart
                        </button>
                        <button className="bg-[#E8E8E8] ms-3 text-[#BB8506] border-b-2 border-[#BB8506] px-5 py-2 text-lg font-medium">
                          Add to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
          ))}
        </>
      </Tabs>
    </div>
  );
};

export default MenuComponent;
