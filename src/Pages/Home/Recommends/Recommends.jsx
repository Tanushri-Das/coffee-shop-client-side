import React, { useState } from "react";
import { useGetMenuQuery } from "../../../redux/features/menu/menuApi";
import "./Recommends.css";
import CustomSpinner from "../../../Components/CustomSpinner/CustomSpinner";
import Recommend from "./Recommend";
import Button from "../../../Components/Button/Button";

const Recommends = () => {
  const { data: menu = [], error, isLoading } = useGetMenuQuery();
  const recommendItems = menu?.filter(
    (item) => item.recommendation === "recommend"
  );

  const [visibleCount, setVisibleCount] = useState(6); // Initial count of items to show
  const [showAll, setShowAll] = useState(false); // Toggle for showing all items

  const handleToggle = () => {
    setShowAll(!showAll);
    setVisibleCount(showAll ? 6 : recommendItems.length); // Adjust the count based on current state
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mb-12 mx-3 md:mx-12 xl:mx-20">
      <h1 className="text-4xl font-bold text-black mb-10 text-center">
        Chef{" "}
        <span className="heading relative inline-block mt-4 sm:mt-0 px-8 py-3 text-white font-bold">
          Recommends
        </span>
      </h1>
      <>
        {isLoading ? (
          <CustomSpinner />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendItems?.slice(0, visibleCount).map((item) => (
                <Recommend key={item.id} item={item} /> // Ensure each item has a unique key
              ))}
              {/* For the "See More" functionality, the additional items will get the animation */}
              {showAll &&
                recommendItems?.slice(visibleCount).map((item) => (
                  <div
                    key={item.id}
                    className={`recommend-item ${
                      showAll ? "slide-in" : "slide-out"
                    }`}
                  >
                    <Recommend item={item} />
                  </div>
                ))}
            </div>
            <div className="flex justify-center mt-5">
              <Button
                onClick={handleToggle}
                name={showAll ? "See Less" : "See More"}
              />
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Recommends;
