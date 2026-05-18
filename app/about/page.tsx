"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1 items-center bg-background transition-colors duration-300">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-start py-16 px-6">
        {/* Hero Section */}
        <div className="flex flex-col items-center gap-8 text-center">
          <Image
            src="/images/logo.jpg"
            alt="Off The Worldly Road logo"
            width={200}
            height={200}
            className="rounded-2xl object-contain shadow-lg"
            priority
          />
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              About Us
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Off The Worldly Road is a community of believers dedicated to exploring the intersection of faith, wilderness, and the beauty of God's creation. Our mission is to inspire and equip others to walk closely with God through the wilderness of life. [Placeholder: Final mission statement pending.]
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <section className="w-full mt-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-xl border border-border bg-surface p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted leading-relaxed">
              To inspire and equip believers to walk closely with God through the wilderness of life. We believe that nature is a testament to God's creativity and love, and we seek to share that beauty with the world. [Placeholder: Final mission text pending.]
            </p>
          </div>
          <div className="rounded-xl overflow-hidden">
            <Image
              src="/images/about/mission.jpg"
              alt="Our mission"
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        </section>

        {/* Team Section */}
        <section className="w-full mt-20">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm text-center">
              <Image
                src="/images/about/team-1.jpg"
                alt="Team Member 1"
                width={150}
                height={150}
                className="rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-foreground">John Doe</h3>
              <p className="text-muted mt-1">Founder & Photographer</p>
              <p className="text-sm text-muted mt-3 leading-relaxed">
                John is a passionate photographer and believer who loves capturing the beauty of God's creation. [Placeholder: Final bio pending.]
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm text-center">
              <Image
                src="/images/about/team-2.jpg"
                alt="Team Member 2"
                width={150}
                height={150}
                className="rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-foreground">Jane Smith</h3>
              <p className="text-muted mt-1">Writer & Theologian</p>
              <p className="text-sm text-muted mt-3 leading-relaxed">
                Jane is a writer and theologian who loves exploring the intersection of faith and nature. [Placeholder: Final bio pending.]
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm text-center">
              <Image
                src="/images/about/team-3.jpg"
                alt="Team Member 3"
                width={150}
                height={150}
                className="rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-foreground">Michael Johnson</h3>
              <p className="text-muted mt-1">Community Manager</p>
              <p className="text-sm text-muted mt-3 leading-relaxed">
                Michael is a community builder who loves connecting believers and fostering meaningful conversations. [Placeholder: Final bio pending.]
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="w-full mt-20 grid md:grid-cols-2 gap-8">
          <div className="rounded-xl border border-border bg-surface p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Values</h2>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Faith: We believe in the power of faith to transform lives.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Nature: We see God's handiwork in the beauty of creation.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Community: We believe in the strength of believers coming together.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Authenticity: We value honesty and transparency in all we do.</span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-surface p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Story</h2>
            <p className="text-muted leading-relaxed">
              Off The Worldly Road began as a small group of believers who shared a love for nature and a desire to grow closer to God. Over time, our community grew, and we realized the need to share our journey with others. Today, we are a global community of believers dedicated to exploring the intersection of faith and nature. [Placeholder: Final story text pending.]
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
