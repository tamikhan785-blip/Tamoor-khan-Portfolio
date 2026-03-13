"use client";

import { useState } from "react";
import clsx from "clsx";

type Experience = {
  title: string;
  company: string;
  category: string;
  year: string;
  image: string;
  details: string[];
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Experience | null>(null);

  const projects: Experience[] = [
    {
      title: "Sales Support Assistant",
      company: "Emirates Motor Company",
      category: "Automotive Sales Operations",
      year: "2024 – Present",
      image: "/images/emirates-motor.jpg",
      details: [
        "Managed the Autoline Dealer Management System remotely to process job cards, service bookings, and invoicing.",
        "Audited warranty claims according to Mercedes-Benz global standards.",
        "Maintained CRM database and ensured accuracy of sales funnel documentation.",
        "Coordinated between UAE service advisors and spare parts department.",
        "Generated workshop efficiency and sales reports using advanced Excel."
      ]
    },

    {
      title: "Customer Service Representative",
      company: "Royal Smart Limousine",
      category: "Luxury Transport Services",
      year: "2023",
      image: "/images/royal-smart.jpg",
      details: [
        "Managed high-priority bookings and chauffeur dispatch operations.",
        "Handled VIP customer relationships including hotel and airline clients.",
        "Tracked real-time flights for DXB and DWC airport pickups.",
        "Resolved service issues quickly to maintain customer satisfaction.",
        "Coordinated with chauffeurs and fleet teams for premium guest experience."
      ]
    },

    {
      title: "Sales Consultant",
      company: "Faremakers.com",
      category: "Travel Sales & Ticketing",
      year: "2022 – 2023",
      image: "/images/faremakers.jpg",
      details: [
        "Managed domestic and international flight bookings using Sabre and Amadeus.",
        "Converted online inquiries into confirmed bookings via phone and chat.",
        "Handled ticket re-issues, refunds, and complex travel itineraries.",
        "Upsold travel insurance, visa assistance, and Umrah/Hajj packages.",
        "Delivered competitive travel solutions and excellent customer service."
      ]
    },

    {
      title: "Sales Support Assistant",
      company: "Pak Suzuki Dealership",
      category: "Automotive Sales",
      year: "2021 – 2022",
      image: "/images/pak-suzuki.jpg",
      details: [
        "Managed showroom customer interactions and vehicle sales support.",
        "Conducted vehicle demonstrations and test drives.",
        "Generated leads through prospecting and cold calling.",
        "Assisted customers with auto financing and insurance solutions.",
        "Maintained CRM records and followed up with potential buyers."
      ]
    }
  ];

  return (
    <section className="relative z-20 bg-[#121212] min-h-screen py-32 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">

        <h3 className="text-4xl md:text-6xl font-bold text-white mb-16 tracking-tight">
          Work Experience
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {projects.map((project, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedProject(project)}
              className={clsx(
                "group relative h-96 rounded-3xl p-8 flex flex-col justify-end overflow-hidden text-left",
                "bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500",
                "hover:border-white/20 hover:scale-[1.02]"
              )}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${project.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >

              <p className="text-sm uppercase tracking-[0.2em] text-white/60 mb-4">
                {project.company}
              </p>

              <div className="flex items-end justify-between gap-4">
                <h4 className="text-3xl md:text-5xl font-semibold text-white leading-none">
                  {project.title}
                </h4>

                <span className="text-white/40 text-xl whitespace-nowrap">
                  {project.year}
                </span>
              </div>

              <p className="mt-4 text-white/50 text-sm">
                {project.category}
              </p>

              <p className="mt-6 text-white/50 text-xs tracking-widest uppercase">
                Click to view full experience
              </p>

            </button>
          ))}

        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">

          <div
            className="w-full max-w-4xl rounded-3xl border border-white/10 p-10 text-white relative"
            style={{
              backgroundImage: `url(${selectedProject.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >

            <div className="absolute inset-0 bg-black/80 rounded-3xl"></div>

            <div className="relative z-10">

              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-3xl text-white/60 hover:text-white"
              >
                ×
              </button>

              <p className="text-sm uppercase tracking-[0.2em] text-white/50 mb-3">
                {selectedProject.company}
              </p>

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <h4 className="text-3xl md:text-5xl font-bold">
                  {selectedProject.title}
                </h4>

                <span className="text-white/50 text-lg">
                  {selectedProject.year}
                </span>
              </div>

              <p className="text-white/60 mb-8">
                {selectedProject.category}
              </p>

              <ul className="space-y-4 text-white/80 leading-7">
                {selectedProject.details.map((item, index) => (
                  <li key={index} className="border-b border-white/10 pb-3">
                    {item}
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}