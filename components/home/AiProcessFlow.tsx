import React from "react";
import Image from "next/image";

const AiProcessFlow = () => {
  return (
    <section className="bg-[#FFFFFF] py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-16 text-center sm:text-center">
          How Our AI Process Works
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="lg:w-1/2 text-center lg:text-left">
            <p className="text-lg sm:text-xl text-gray-600 line-clamp-3 lg:line-clamp-none">
              Our AI-powered workflow streamlines and automates your daily
              tasks, reducing manual effort and saving valuable time. It
              intelligently analyzes data, identifies patterns, and provides
              actionable insights at every step, empowering you to make informed
              decisions faster and more efficiently. With end-to-end automation
              and real-time reporting, our system ensures accuracy,
              transparency, and continuous optimization of your processes.
              Experience smarter, faster, and more reliable operations like
              never before.
            </p>
          </div>
          <div className="lg:w-1/2 w-full h-[300px] sm:h-[400px] lg:h-[400px] relative overflow-hidden rounded-xl">
            <Image
              src="/aiProcessFlow/FlowChart.png"
              alt="AI Process Flow Diagram"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiProcessFlow;
