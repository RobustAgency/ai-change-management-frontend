"use client";
import React from "react";
import Image from "next/image";

const ClientFooter = () => {
    return (
        <footer className="mt-12 bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-center mb-5">
                    <Image
                        src="/logo.png"
                        alt="Innovative Dialogs"
                        width={140}
                        height={40}
                        className="opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                </div>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed text-center max-w-5xl mx-auto">
                    Any articles, templates, or information provided by Life Vision,
                    LLC’s{" "}
                    <span className="font-medium text-gray-500">
                        Innovative Dialogs® AI Change Management
                    </span>{" "}
                    system on the website are for use only. Clients are expected to enter
                    the correct data. We make no representations or warranties of any kind,
                    express or implied, about the completeness, accuracy, reliability,
                    suitability, or availability with respect to the content you enter
                    into your suite of Innovative Dialogs® assets, add to our tool, pull
                    from our website or the information, articles, templates, or related
                    graphics contained on the website or any of the materials produced
                    as and from the templates. Any reliance you place on such information
                    is therefore strictly at your own risk.
                </p>
                <div className="mt-6 text-center">
                    <span className="text-xs text-gray-400">
                        © {new Date().getFullYear()} Life Vision, LLC. All rights reserved.
                    </span>
                </div>

            </div>
        </footer>
    );
};

export default ClientFooter;
