import React from "react";
import Container from "react-bootstrap/Container";
export const Intro = () => {
  return (
    // <div></div>
    <Container>
      <div className="">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 flex-wrap">
          <img
            src="https://images.unsplash.com/photo-1661956601031-4cf09efadfce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60"
            alt=""
            className="object-cover rounded-lg h-[300px]"
          />
          <img
            src="https://images.unsplash.com/photo-1577640256262-8488aa247e17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHN0dWR5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
            alt=""
            className="object-cover rounded-lg h-[300px] w-full"
          />
          <img
            src="https://images.unsplash.com/photo-1608324777753-5d2f6e547b1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzJ8fHN0dWR5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
            alt=""
            className="object-cover rounded-lg h-[300px]"
          />
          <img
            src="https://images.unsplash.com/photo-1602418300003-f555eed46508?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODl8fHN0dWR5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
            alt=""
            className="object-cover rounded-lg h-[300px]"
          />
        </div>
        <div className="text-center flex justify-center flex-col mt-4 max-w-[600px] mx-auto">
          <div className="text-3xl font-bold mb-2 text-blue-500">
            Study help made for you{" "}
          </div>
          <div className="font-thin">
            Expert help, textbook solutions & math support— tailored to your
            courses. Get a personalized dashboard that knows where you are in
            your courses and recommends what to study next
          </div>
        </div>
      </div>
    </Container>
  );
};
