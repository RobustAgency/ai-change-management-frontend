import React from "react";
import Image from "next/image";

const AiProcessFlow = () => {
  const steps = [
    {
      title: "Data Collection & Integration",
      desc: "Gather data from multiple sources, clean, and organize it for analysis.",
    },
    {
      title: "Preprocessing & Normalization",
      desc: "Standardize and filter data to ensure high quality for downstream processes.",
    },
    {
      title: "Intelligent Analysis & Pattern Recognition",
      desc: "Identify patterns, trends, and anomalies using machine learning models.",
    },
    {
      title: "Decision Automation",
      desc: "Automate decisions and recommendations to reduce manual work.",
    },
    {
      title: "Feedback & Continuous Learning",
      desc: "Monitor results and adapt AI models for continuous improvement.",
    },
    {
      title: "Reporting & Insights",
      desc: "Generate clear reports and visualizations for actionable insights.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 text-center sm:text-center">
          How Our AI Process Works
        </h2>
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-12">
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
          <div className="lg:w-1/2 w-full h-[300px] sm:h-[400px] lg:h-[400px] relative">
            <Image
              src="/aiProcessFlow/FlowChart.png"
              alt="AI Process Flow Diagram"
              fill
              className="rounded-xl"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiProcessFlow;
