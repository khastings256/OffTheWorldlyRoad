"use client";

import React from "react";

const AboutSection = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="space-y-12">
        {/* Meet the Creator */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Meet the Creator</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p className="text-xl font-medium italic">
              "We may have built the technology, but God created the physics, the light waves, and the minds to use them. It is all tied into His creation in the end."
            </p>
            
            <h3 className="text-2xl font-semibold">The Mind Behind the Lens</h3>
            <p>
              I’ve spent nearly three decades navigating the highly structured, logical world of software engineering. To me, code and faith don't collide—they compliment. I tend to see the world through a lens of systems, order, and deep reflection. But an analytical mind is also a wheel that never stops spinning, and over the years, I’ve learned that the only way to quiet that noise and anchor my anxiety is to put God and my faith first in everything—from a small prayer before a long coding session to watching the sunrise over a canyon.
            </p>
            
            <p>
              I’m a realist. I drive by facts, knowledge, and careful planning. I’m not one to make off-the-cuff decisions, and I tend to keep my circle intentional. Because of that, Off the Worldly Road isn’t a polished lifestyle brand or a space for trite, easy answers. It’s an authentic look at what it means to slow down, look closer, and find the extraordinary art hidden in ordinary spaces.
            </p>
          </div>
        </div>

        {/* The Art of Hindsight */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">The Art of Hindsight</h3>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              When I look through a camera viewfinder, I’m looking for the "art of physics." Photography is just electromagnetic physics bent by the eye to tell a story. Whether I'm waiting for the right light on a rugged landscape or capturing a candid moment of a stranger on a city street, I am looking for the Creator's signature. Every person walking down the pavement, no matter their story, is made in the <em>Imago Dei</em>—the image of God—and I approach my photography with the respect that truth demands.
            </p>
            
            <p>
              My hope for the videos, photos, and reflections you find here is simple: I want you to see that no matter where you are, what you are seeing, or what challenges you run into... God is always there with you. Sometimes to encourage you, sometimes to just be there, and sometimes to carry you. You might not see it in the heat of the moment, but honest reflection—like looking back at a photo or a video—has a way of revealing the divine details we missed while just trying to survive the trail.
            </p>
          </div>
        </div>

        {/* Home Base */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Home Base</h3>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Behind everything I build, my family is my reason. My life is anchored by a clear hierarchy: God, my wife of nearly twenty years, my three children, and my elderly father who lives under our roof.
            </p>
            
            <p>
              Living out those priorities means my creative time is hard-fought and pushed to the margins. I don't want to be a distanced dad, so I balance the tension of carving out boundaries for this creative effort with the daily joy of being fully present for the people who matter most.
            </p>
            
            <p>
              Off the Worldly Road is born out of that exact tension. It’s for the thinkers, the builders, the families, and the travelers who know that stepping off the pavement isn't just about a physical destination—it's about finding a deeper, eternal path.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;