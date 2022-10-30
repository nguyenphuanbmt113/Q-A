import React from "react";

export const NotFound = () => {
  return (
    <div className="p-5">
      <div role="alert" className="max-w-[500px] mx-auto ">
        <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2 text-2xl">
          Error 404
        </div>
        <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p>Opps! Page Not Found</p>
          <p>
            Opps! the page you are looking for does not exist. it might have
            been movied or delete
          </p>
        </div>
        <div>
          <img
            src="https://d3hi6wehcrq5by.cloudfront.net/itnavi-blog/2021/08/3-1.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
