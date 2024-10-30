// Filter items by category
// import React, { useState } from "react";
// import { useGetMenuQuery } from "../../redux/features/menu/menuApi";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import Pagination from "./Pagination"; // Import Pagination component
// import "react-tabs/style/react-tabs.css";

// const Menu = () => {
//   const { data: menuItems, error, isLoading } = useGetMenuQuery();
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   // Categories for tabs
//   const categories = [
//     "coffee",
//     "sandwich",
//     "pizza",
//     "fried",
//     "burger",
//     "dessert",
//   ];

//   // Filter items by category
//   const filteredItemsByCategory = categories.reduce((acc, category) => {
//     acc[category] = menuItems?.filter((item) => item.category === category) || [];
//     return acc;
//   }, {});

//   // Pagination logic: Calculate paginated items for each category
//   const paginatedItems = (categoryItems) => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return categoryItems.slice(startIndex, endIndex);
//   };

//   // Handle page change for pagination
//   const handlePageChange = (newPage) => setCurrentPage(newPage);

//   return (
//     <div className="m-2 lg:m-12">
//       <h1 className="text-4xl text-center font-bold mb-10">Menu</h1>

//       <Tabs>
//         <TabList className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 md:gap-6 lg:gap-8 justify-center items-center my-4">
//           {categories.map((category) => (
//             <Tab
//               key={category}
//               className="px-4 py-2 cursor-pointer outline-none text-lg text-center"
//               selectedClassName="border-b-2 border-[#BB8506] font-bold"
//             >
//               {category.charAt(0).toUpperCase() + category.slice(1)}
//             </Tab>
//           ))}
//         </TabList>

//         <>
//           {categories.map((category) => (
//             <TabPanel key={category}>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8 w-full justify-items-center">
//                 {paginatedItems(filteredItemsByCategory[category]).map((item) => (
//                   <div
//                     key={item._id}
//                     className="bg-[#F3F3F3] w-full h-full flex flex-col justify-between"
//                   >
//                     <div className="relative w-full h-56">
//                       <img
//                         className="w-full h-full object-cover object-center"
//                         src={item.image}
//                         alt=""
//                       />
//                       <h4 className="absolute top-2 right-2 bg-black text-white text-[20px] font-medium mb-3 px-2 py-1">
//                         ${item.price}
//                       </h4>
//                     </div>
//                     <div className="p-4 flex flex-col justify-between items-center">
//                       <h2 className="text-[24px] font-semibold mb-2">
//                         {item.item_name}
//                       </h2>
//                       <div className="flex justify-center mt-4">
//                         <button className="bg-[#E8E8E8] text-[#BB8506] border-b-2 border-[#BB8506] px-5 py-2 text-lg font-medium">
//                           Add to Cart
//                         </button>
//                         <button className="bg-[#E8E8E8] ms-3 text-[#BB8506] border-b-2 border-[#BB8506] px-5 py-2 text-lg font-medium">
//                           Add to Wishlist
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <Pagination
//                 currentPage={currentPage}
//                 totalItems={filteredItemsByCategory[category].length}
//                 itemsPerPage={itemsPerPage}
//                 onPageChange={handlePageChange}
//                 isSmallScreen={window.innerWidth <= 667}
//               />
//             </TabPanel>
//           ))}
//         </>
//       </Tabs>
//     </div>
//   );
// };

// export default Menu;

// Filter items by category and price

// import React, { useState } from "react";
// import { useGetMenuQuery } from "../../redux/features/menu/menuApi";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import Pagination from "./Pagination";
// import "react-tabs/style/react-tabs.css";
// import SearchByPrice from "../../Components/SearchByPrice/SearchByPrice";

// const Menu = () => {
//   const { data: menuItems, error, isLoading } = useGetMenuQuery();
//   const [selectedPriceRange, setSelectedPriceRange] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   // Define categories for tabs
//   const categories = [
//     "coffee",
//     "sandwich",
//     "pizza",
//     "fried",
//     "burger",
//     "dessert",
//   ];

//   // Filter items by category and price range
//   const filteredItemsByCategory = categories.reduce((acc, category) => {
//     const categoryItems =
//       menuItems?.filter((item) => item.category === category) || [];

//     // Apply price range filter only if it's selected
//     const filteredItems = selectedPriceRange
//       ? categoryItems.filter((item) => {
//           const [minPrice, maxPrice] = selectedPriceRange
//             .split("-")
//             .map(Number);
//           return item.price >= minPrice && item.price <= maxPrice;
//         })
//       : categoryItems; // Show all if no price range selected

//     acc[category] = filteredItems;
//     return acc;
//   }, {});

//   // Pagination logic: Calculate paginated items for each category
//   const paginatedItems = (categoryItems) => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return categoryItems.slice(startIndex, endIndex);
//   };

//   // Handle page change
//   const handlePageChange = (newPage) => setCurrentPage(newPage);

//   // Handle price range change
//   const handlePriceChange = (priceRange) => {
//     setSelectedPriceRange(priceRange);
//     setCurrentPage(1); // Reset to the first page when price range changes
//   };

//   const handleClear = () => {
//     setSelectedPriceRange("");
//     setCurrentPage(1);
//   };

//   return (
//     <div className="m-2 my-12 lg:m-12">
//       <div className="flex justify-center mb-6">
//         <div className="w-full max-w-lg">
//           <SearchByPrice
//             onPriceChange={handlePriceChange}
//             onClear={handleClear}
//           />
//         </div>
//       </div>
//       <Tabs>
//         <TabList className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 md:gap-6 lg:gap-8 justify-center items-center mb-8">
//           {categories.map((category) => (
//             <Tab
//               key={category}
//               className="px-4 py-2 cursor-pointer outline-none text-lg text-center"
//               selectedClassName="border-b-2 border-[#BB8506] font-bold"
//             >
//               {category.charAt(0).toUpperCase() + category.slice(1)}
//             </Tab>
//           ))}
//         </TabList>

//         {categories.map((category) => (
//           <TabPanel key={category}>
//             {filteredItemsByCategory[category].length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8 w-full justify-items-center">
//                 {paginatedItems(filteredItemsByCategory[category]).map(
//                   (item) => (
//                     <div
//                       key={item._id}
//                       className="bg-[#F3F3F3] w-full h-full flex flex-col justify-between"
//                     >
//                       <div className="relative w-full h-56">
//                         <img
//                           className="w-full h-full object-cover object-center"
//                           src={item.image}
//                           alt={item.item_name}
//                         />
//                         <h4 className="absolute top-2 right-2 bg-black text-white text-[20px] font-medium mb-3 px-2 py-1">
//                           ${item.price}
//                         </h4>
//                       </div>
//                       <div className="p-4 flex flex-col justify-between items-center">
//                         <h2 className="text-[24px] font-semibold mb-2">
//                           {item.item_name}
//                         </h2>
//                         <div className="flex justify-center mt-4">
//                           <button className="bg-[#E8E8E8] text-[#BB8506] border-b-2 border-[#BB8506] px-5 py-2 text-lg font-medium">
//                             Add to Cart
//                           </button>
//                           <button className="bg-[#E8E8E8] ms-3 text-[#BB8506] border-b-2 border-[#BB8506] px-5 py-2 text-lg font-medium">
//                             Add to Wishlist
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 )}
//               </div>
//             ) : (
//               <div className="flex justify-center items-center h-48 w-full">
//                 <h1 className="text-center text-xl font-semibold">
//                 No menu available in this price range for {category} category
//                 </h1>
//               </div>
//             )}
//             {filteredItemsByCategory[category].length > 0 && (
//               <Pagination
//                 currentPage={currentPage}
//                 totalItems={filteredItemsByCategory[category].length}
//                 itemsPerPage={itemsPerPage}
//                 onPageChange={handlePageChange}
//                 isSmallScreen={window.innerWidth <= 667}
//               />
//             )}
//           </TabPanel>
//         ))}
//       </Tabs>
//     </div>
//   );
// };

// export default Menu;

import React, { useState } from "react";
import { useGetMenuQuery } from "../../redux/features/menu/menuApi";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Pagination from "./Pagination";
import "react-tabs/style/react-tabs.css";
import SearchByPrice from "../../Components/SearchByPrice/SearchByPrice";
import SearchBar from "../../Components/SearchBar/SearchBar";
import MenuCard from "../../Components/MenuCard/MenuCard";

const Menu = () => {
  const { data: menuItems, error, isLoading } = useGetMenuQuery();
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("coffee");
  const [searchMessage, setSearchMessage] = useState("");
  const itemsPerPage = 6;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const categories = [
    "coffee",
    "sandwich",
    "pizza",
    "fried",
    "burger",
    "dessert",
  ];

  const handleSearch = (term) => {
    setSearchTerm(term);

    if (!menuItems || !Array.isArray(menuItems)) return;

    const foundMenu = menuItems.find((menu) =>
      menu.item_name.toLowerCase().includes(term.toLowerCase())
    );

    if (foundMenu && foundMenu.category) {
      setActiveTab(foundMenu.category);
      setSearchMessage("");
    } else {
      setSearchMessage("This book is not available.");
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setActiveTab("coffee");
    setSearchMessage("");
  };

  const filteredItemsByCategory = categories.reduce((acc, category) => {
    const categoryItems =
      menuItems?.filter((item) => item.category === category) || [];

    // Filter by search term if present, otherwise filter by price range if selected
    const filteredItems = categoryItems.filter((item) => {
      const matchesSearch = searchTerm
        ? item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesPrice = selectedPriceRange
        ? (() => {
            const [minPrice, maxPrice] = selectedPriceRange
              .split("-")
              .map(Number);
            return item.price >= minPrice && item.price <= maxPrice;
          })()
        : true;
      return matchesSearch && matchesPrice;
    });

    acc[category] = filteredItems;
    return acc;
  }, {});

  const paginatedItems = (categoryItems) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return categoryItems.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const handlePriceChange = (priceRange) => {
    setSelectedPriceRange(priceRange);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSelectedPriceRange("");
    setCurrentPage(1);
  };

  return (
    <div className="mb-12 mx-3 md:mx-12 my-12">
      <div className="w-full max-w-lg mx-auto mb-5">
        <SearchBar
          searchTerm={searchTerm}
          handleSearch={(e) => handleSearch(e.target.value)}
          handleClearSearch={handleClearSearch}
        />
        {searchMessage && (
          <p className="text-center text-red-500">{searchMessage}</p>
        )}
      </div>
      <div className="flex justify-center mb-9">
        <div className="w-full max-w-lg">
          <SearchByPrice
            onPriceChange={handlePriceChange}
            onClear={handleClear}
          />
        </div>
      </div>
      <Tabs
        selectedIndex={categories.indexOf(activeTab)}
        onSelect={(index) => setActiveTab(categories[index])}
      >
        <TabList className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 md:gap-6 lg:gap-8 justify-center items-center mb-5">
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

        {categories.map((category) => (
          <TabPanel key={category}>
            {filteredItemsByCategory[category].length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8 w-full justify-items-center">
                {paginatedItems(filteredItemsByCategory[category]).map(
                  (item) => (
                    <MenuCard item={item} />
                  )
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center h-48 w-full">
                <h1 className="text-center text-xl font-semibold">
                  No menu available in this price range for {category} category
                </h1>
              </div>
            )}
            {filteredItemsByCategory[category].length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalItems={filteredItemsByCategory[category].length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                isSmallScreen={window.innerWidth <= 667}
              />
            )}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default Menu;
