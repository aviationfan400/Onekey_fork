import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { BEHOLD_FEED_ID, INSTAGRAM_HANDLE, INSTAGRAM_URL, INSTAGRAM_SINCE } from '../config/instagram';

const About: React.FC = () => {
  // Load Behold widget script once, only when a feed ID is configured
  useEffect(() => {
    if (!BEHOLD_FEED_ID) return;
    if (document.querySelector('script[data-behold-widget]')) return;
    const script = document.createElement('script');
    script.src = 'https://w.behold.so/widget.js';
    script.type = 'module';
    script.setAttribute('data-behold-widget', 'true');
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-stone-900 text-white">
      <section className="container mx-auto px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <div className="max-w-2xl">
            <span className="mb-5 block h-px w-16 bg-earth-400" aria-hidden="true" />
            <h1 className="font-display text-4xl font-semibold leading-tight text-white md:text-6xl">
              About Onekey
            </h1>
            <p className="mt-8 text-lg font-light leading-8 text-stone-300 md:text-xl md:leading-9">
              OneKey was founded on the belief that music has the power to heal,
              connect, and inspire. Our student volunteers dedicate their time and
              talent to bring joy to senior communities, fostering intergenerational
              bonds that enrich lives on both sides.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl border border-earth-300/20 bg-stone-800/60 p-3 shadow-2xl shadow-black/20 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-earth-300/60 hover:shadow-earth-900/30 sm:aspect-[4/5] lg:aspect-[3/4]">
              <div className="h-full overflow-hidden rounded-xl border border-white/10 bg-stone-900/45">
                <img
                  src={`${process.env.PUBLIC_URL}/pics/onekey.jpg`}
                  alt="OneKey student volunteers performing at a community event"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl gap-8 md:grid-cols-2 lg:mt-24">
          <Link
            to="/team"
            className="cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-stone-800/45 shadow-xl shadow-black/10 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-earth-300/35 hover:bg-stone-800/70 hover:shadow-2xl hover:shadow-black/25"
          >
            <div className="aspect-[16/9] border-b border-earth-300/20 bg-stone-900/55 p-3 transition-all duration-300 ease-out hover:border-earth-300/45 hover:bg-stone-900/75">
              <div className="h-full overflow-hidden rounded-xl border border-white/10 bg-stone-900/45">
                <img
                  src={`${process.env.PUBLIC_URL}/pics/onekey_team.jpg`}
                  alt="OneKey student musicians performing together outdoors"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="p-8 md:p-10">
              <h2 className="font-display text-2xl font-semibold text-white">
                Our Team
              </h2>
              <p className="mt-4 text-base font-light leading-7 text-stone-300">
                Meet the students who support our mission and help us reach new heights.
              </p>
            </div>
          </Link>

          <Link
            to="/timeline"
            className="cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-stone-800/45 shadow-xl shadow-black/10 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-earth-300/35 hover:bg-stone-800/70 hover:shadow-2xl hover:shadow-black/25"
          >
            <div className="aspect-[16/9] border-b border-earth-300/20 bg-stone-900/55 p-3 transition-all duration-300 ease-out hover:border-earth-300/45 hover:bg-stone-900/75">
              <div className="h-full overflow-hidden rounded-xl border border-white/10 bg-stone-900/45">
                <img
                  src={`${process.env.PUBLIC_URL}/pics/onekey_history.jpg`}
                  alt="OneKey musicians performing in a senior community space"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="p-8 md:p-10">
              <h2 className="font-display text-2xl font-semibold text-white">
                Our History
              </h2>
              <p className="mt-4 text-base font-light leading-7 text-stone-300">
                Each part of our history is a testament to our dedication to spread the joy of music. Learn more here.
              </p>
            </div>
          </Link>
        </div>

        {/* ── Instagram feed ─────────────────────────────────────────── */}
        <div className="mx-auto mt-20 max-w-6xl lg:mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <span className="mb-5 block h-px w-16 bg-earth-400" aria-hidden="true" />
              <h2 className="font-display text-3xl font-semibold text-white md:text-5xl">
                Follow Along
              </h2>
              <p className="mt-3 text-base font-light leading-7 text-stone-300/90 md:text-lg">
                See what we've been up to <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-earth-300 hover:text-earth-200 transition-colors">@{INSTAGRAM_HANDLE}</a> · sharing since {INSTAGRAM_SINCE}
              </p>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-earth-400/30 bg-earth-500/10 text-earth-200 text-sm font-medium hover:bg-earth-500/20 hover:border-earth-400/50 transition-all"
            >
              <Instagram size={16} />
              Open Instagram
            </a>
          </div>

          {BEHOLD_FEED_ID ? (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-stone-800/35 p-4 shadow-xl shadow-black/10">
              <behold-widget feed-id={BEHOLD_FEED_ID} />
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-earth-400/25 bg-stone-800/30 p-10 text-center">
              <Instagram size={32} className="mx-auto mb-4 text-earth-300/60" />
              <p className="text-base font-light text-stone-300/80">
                Instagram feed coming soon.
              </p>
              <p className="mt-2 text-xs text-stone-500">
                {/* Visible only in dev — guides the maintainer */}
                Configure <code className="px-1.5 py-0.5 rounded bg-stone-900/60 text-earth-300">BEHOLD_FEED_ID</code> in <code className="px-1.5 py-0.5 rounded bg-stone-900/60 text-earth-300">src/pages/About.tsx</code> to enable.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default About;
