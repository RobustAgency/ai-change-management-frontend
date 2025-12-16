import React from 'react';
import Image from 'next/image';

const AiProcessFlow = () => {
  const steps = [
    { title: "Data Collection & Integration", desc: "Gather data from multiple sources, clean, and organize it for analysis." },
    { title: "Preprocessing & Normalization", desc: "Standardize and filter data to ensure high quality for downstream processes." },
    { title: "Intelligent Analysis & Pattern Recognition", desc: "Identify patterns, trends, and anomalies using machine learning models." },
    { title: "Decision Automation", desc: "Automate decisions and recommendations to reduce manual work." },
    { title: "Feedback & Continuous Learning", desc: "Monitor results and adapt AI models for continuous improvement." },
    { title: "Reporting & Insights", desc: "Generate clear reports and visualizations for actionable insights." },
  ];

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          How Our AI Process Works
        </h2>
        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
          Our AI-powered workflow automates your tasks efficiently while providing clear insights at every step of the process.
        </p>

        {/* AI Process Diagram */}
        <div className="relative w-full h-[500px] mb-12">
          <Image
            src="/aiProcessFlow/FlowChart.png"
            alt="AI Process Flow Diagram"
            width={1920}      // replace with your image's actual width
            height={1080}     // replace with your image's actual height
            className="w-full h-full object-contain rounded-xl"
          />
        </div>

        {/* Steps */}
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

      {/* Optional decorative bottom wave */}
      <div className="mt-16">
        <svg
          className="w-full"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0H1440V120H0V0Z"
            fill="url(#paint0_linear_1_2)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1_2"
              x1="720"
              y1="0"
              x2="720"
              y2="120"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#526CFF" stopOpacity="0.3"/>
              <stop offset="1" stopColor="#526CFF" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default AiProcessFlow;
