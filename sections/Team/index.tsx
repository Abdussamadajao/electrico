"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ta from "@/public/images/Tai.png";
import daniel from "@/public/images/Daniel.png";
import { Element } from "react-scroll";

const Team = () => {
  const teamMembers = [
    { id: 1, name: "Tai", title: "AI Visionary", image: ta },
    { id: 2, name: "Daniel", title: "Software Engineer", image: daniel },
    { id: 3, name: "Alice", title: "Domain Expert", image: ta },
    { id: 4, name: "Bob", title: "AI Researcher", image: daniel },
    { id: 5, name: "Charlie", title: "Data Scientist", image: ta },
    { id: 6, name: "Diana", title: "Product Manager", image: daniel },
    { id: 7, name: "Eve", title: "UX Designer", image: ta },
    { id: 8, name: "Frank", title: "DevOps Engineer", image: daniel },
    { id: 9, name: "Grace", title: "Frontend Developer", image: ta },
    { id: 10, name: "Hank", title: "Backend Developer", image: daniel },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateScrollState);
    updateScrollState();

    const autoSlide = setInterval(() => {
      emblaApi && emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(autoSlide);
  }, [emblaApi, updateScrollState]);

  return (
    <Element name="team">
      <section className="py-12 bg-white">
        <div className="container-custom mx-auto">
          <div className="flex flex-col items-center text-center mx-auto max-w-3xl">
            <h2 className="text-[2rem] font-bold mb-4 text-black">
              Our <span className="text-electblue">Team</span>
            </h2>
            <h5 className="text-lg text-textcolor">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </h5>
          </div>

          <div className="relative mt-8">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] px-3"
                  >
                    <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={300}
                        height={300}
                        className="w-full h-[280px] object-cover object-top"
                      />
                      <div className="absolute bottom-0 w-full bg-electblue text-white p-3 bg-opacity-90 text-center">
                        <h3 className="text-lg font-semibold">{member.name}</h3>
                        <p className="text-sm">{member.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                className={`p-2 rounded-full bg-gray-300 ${
                  !canScrollPrev ? "opacity-50" : ""
                }`}
                onClick={() => emblaApi && emblaApi.scrollPrev()}
                disabled={!canScrollPrev}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className={`p-2 rounded-full bg-gray-300 ${
                  !canScrollNext ? "opacity-50" : ""
                }`}
                onClick={() => emblaApi && emblaApi.scrollNext()}
                disabled={!canScrollNext}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Team;
