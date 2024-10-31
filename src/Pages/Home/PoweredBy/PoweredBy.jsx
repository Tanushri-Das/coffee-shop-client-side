import React from "react";
import Marquee from "react-fast-marquee";
import { useGetSponsorsQuery } from "../../../redux/features/sponsors/sponsorsApi";
import CustomSpinner from "../../../Components/CustomSpinner/CustomSpinner";

const PoweredBy = () => {
  const { data: sponsors, error, isLoading } = useGetSponsorsQuery();

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="mb-12 mx-3 md:mx-12 xl:mx-20">
      <h1 className="text-4xl font-bold mb-5 text-center">
        Our{" "}
        <span className="heading relative inline-block px-8 py-2 mt-4 sm:mt-0 text-white font-bold">
          Partners
        </span>
      </h1>
      <>
        {isLoading ? (
          <CustomSpinner />
        ) : (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <Marquee gradient={false} speed={60}>
              {sponsors.map((company, index) => (
                <div
                  key={index}
                  className="bg-white mx-4 p-2 rounded-md shadow-sm hover:bg-gray-200"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-28 h-28 object-contain mx-auto"
                  />
                </div>
              ))}
            </Marquee>
          </div>
        )}
      </>
    </div>
  );
};

export default PoweredBy;
