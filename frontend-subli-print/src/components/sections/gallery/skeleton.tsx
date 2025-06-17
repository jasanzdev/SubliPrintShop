import React from "react";

const Skeleton = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-3 grid-rows-4 gap-4 mb-12">
        <div className="flex col-span-2 row-span-4 h-full relative rounded-lg overflow-hidden">
          <div className="w-full h-full bg-gray-200 animate-pulse"></div>
        </div>

        <div className="row-span-4 col-start-3">
          <div className="grid grid-cols-1 grid-rows-4 gap-4">
            <div className="row-span-2">
              <div className="h-60 relative rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gray-200 animate-pulse"></div>
              </div>
            </div>

            <div className="row-span-2 row-start-3">
              <div className="h-60 relative rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gray-200 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 mb-8">
        <div className="h-8 w-64 mx-auto bg-gray-200 animate-pulse rounded mb-6"></div>

        <div className="relative overflow-hidden">
          <div className="flex">
            <div className="flex flex-nowrap min-w-full">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div
                  key={`skeleton-${num}`}
                  className="w-64 h-40 flex-shrink-0 mx-2 relative rounded-lg overflow-hidden"
                >
                  <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                </div>
              ))}
            </div>

            <div className="flex flex-nowrap min-w-full">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div
                  key={`skeleton-dup-${num}`}
                  className="w-64 h-40 flex-shrink-0 mx-2 relative rounded-lg overflow-hidden"
                >
                  <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
