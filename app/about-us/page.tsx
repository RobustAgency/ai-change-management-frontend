import React from "react";
import {
  Sparkles,
  AlertCircle,
  Lightbulb,
  Users,
  Mail,
  Video,
  BadgeCheck,
} from "lucide-react";

const AboutUsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-blue-700 to-purple-800" />

        {/* Glow Blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-400/30 rounded-full blur-3xl" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="flex justify-center mb-5">
            <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 tracking-tight">
            About Innovative Dialogs®
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-blue-100 leading-relaxed">
            Empowering organizations to communicate change with clarity,
            confidence, and measurable impact.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            In today&apos;s fast-moving organizations, communicators and change
            leaders face increasing pressure to clearly share vision, keep
            employees informed, and maintain alignment — all while managing
            multiple channels and tight timelines.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-7 h-7 text-red-500" />
              <h3 className="text-2xl font-semibold text-gray-900">
                The Challenge
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Traditional tools weren&apos;t designed for the complexity of
              modern change communication. Teams struggle to demonstrate impact,
              maintain consistency, and ensure messages reach the right
              audiences at the right time.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-7 h-7 text-green-600" />
              <h3 className="text-2xl font-semibold text-gray-900">
                Our Solution
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Innovative Dialogs® provides a centralized SaaS platform designed
              specifically for communicators and OCM professionals — enabling
              smarter decisions, faster adoption, and measurable outcomes.
            </p>
          </div>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-xl p-8 mb-20">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-7 h-7 text-blue-700" />
            <h3 className="text-2xl font-bold text-blue-900">
              AI-Driven Change Management Platform
            </h3>
          </div>
          <p className="text-blue-900 text-lg leading-relaxed">
            The Innovative Dialogs® AI-Driven Change Management Platform is a
            patent-pending, web-based SaaS tool that enables change managers,
            communications teams, and consultants to generate
            stakeholder-specific communication packages in minutes rather than
            weeks.
          </p>
        </div>
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            What We Enable
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                text: "Message Mapping & Stakeholder Segmentation",
              },
              {
                icon: Mail,
                text: "Email, Presentation & FAQ Creation",
              },
              {
                icon: Video,
                text: "Timelines & Video Script Development",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <Icon className="w-8 h-8 text-indigo-600" />
                  </div>
                  <p className="text-gray-800 font-medium">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-4xl mx-auto mb-20">
          <div className="flex justify-center mb-4">
            <BadgeCheck className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Leadership & Ownership
          </h3>
          <p className="text-gray-700 leading-relaxed text-center">
            Innovative Dialogs® is owned by President and Founder{" "}
            <span className="font-semibold">
              Mirinda K. Scott, BS, MS, PMP, SA, OCM
            </span>
            . Mrs. Scott is a strategic consultant and the owner of Life Vision,
            LLC, based in Colorado.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
