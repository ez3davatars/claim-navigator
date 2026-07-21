import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { VIDEO_GUIDE, VIDEO_GUIDE_DISCLAIMER, isPlaceholderVideoUrl, isSelfHostedVideoUrl } from '../../lib/videoGuide';

function VideoTranscriptToggle({ transcript, videoTitle }: { transcript: string[]; videoTitle: string }) {
  const [open, setOpen] = useState(false);
  const transcriptId = `transcript-${videoTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <div className="border-t border-navy-100 pt-5">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={transcriptId}
        onClick={() => setOpen((current) => !current)}
        className="text-sm font-semibold text-navy-900 underline decoration-gold-400 underline-offset-4 hover:text-gold-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 rounded"
      >
        {open ? 'Hide Transcript' : 'Read Transcript'}
      </button>
      {open && (
        <div id={transcriptId} className="mt-4 rounded-xl border border-navy-100 bg-navy-50 p-5 text-sm leading-relaxed text-navy-700 space-y-3">
          {transcript.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  );
}

function VideoFrame({ title, embedUrl }: { title: string; embedUrl: string }) {
  if (isPlaceholderVideoUrl(embedUrl)) {
    return (
      <div className="aspect-video w-full rounded-2xl border border-navy-200 bg-navy-950 text-white shadow-xl flex flex-col items-center justify-center p-8 text-center">
        <PlayCircle className="w-14 h-14 text-gold-400 mb-4" aria-hidden="true" />
        <div className="font-serif text-2xl font-semibold mb-2">Video placeholder</div>
        <p className="max-w-md text-sm leading-relaxed text-navy-200">
          Replace <span className="font-semibold text-gold-300">{embedUrl}</span> in <span className="font-semibold text-gold-300">src/lib/videoGuide.ts</span> with the final video embed or file URL.
        </p>
      </div>
    );
  }

  if (isSelfHostedVideoUrl(embedUrl)) {
    return (
      <video
        key={embedUrl}
        className="aspect-video w-full rounded-2xl border border-navy-200 bg-navy-950 shadow-xl"
        controls
        preload="metadata"
        playsInline
        aria-label={title}
      >
        <source src={embedUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <iframe
      key={embedUrl}
      className="aspect-video w-full rounded-2xl border border-navy-200 bg-navy-950 shadow-xl"
      src={embedUrl}
      title={title}
      loading="lazy"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
}

export default function VideoGuide() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVideo = VIDEO_GUIDE[activeIndex];

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest<HTMLElement>('[data-video-jump]');
      if (!trigger) return;

      const nextIndex = Number(trigger.dataset.videoJump);
      if (!Number.isInteger(nextIndex) || !VIDEO_GUIDE[nextIndex]) return;

      event.preventDefault();
      setActiveIndex(nextIndex);
      document.getElementById('video-guide')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const playlist = useMemo(() => VIDEO_GUIDE.map((video, index) => ({ ...video, index })), []);

  return (
    <section id="video-guide" className="py-24 bg-navy-50 border-y border-navy-100 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-4">Video Guide</div>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-navy-900 mb-5 text-balance">
            Start Here: Understand Complaint Preparation Before You File
          </h2>
          <p className="text-lg text-navy-600 leading-relaxed">
            Watch this short 4-part guide to understand what a complaint is, why preparation matters, and how Claim Navigator helps organize your information before you begin.
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_390px] gap-8 items-start">
          <div className="space-y-6">
            <VideoFrame title={activeVideo.title} embedUrl={activeVideo.embedUrl} />

            <div className="bg-white border border-navy-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-5">
              <div>
                <h3 className="text-2xl md:text-3xl font-serif font-semibold text-navy-900 mb-3">{activeVideo.title}</h3>
                <p className="text-navy-600 leading-relaxed">{activeVideo.description}</p>
              </div>

              <a
                href={activeVideo.ctaLink}
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-5 py-3 rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
              >
                {activeVideo.ctaText}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <VideoTranscriptToggle transcript={activeVideo.transcript} videoTitle={activeVideo.title} />

              <p className="text-sm leading-relaxed text-navy-600 bg-gold-50 border border-gold-200 rounded-xl p-4">
                {VIDEO_GUIDE_DISCLAIMER}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4" aria-label="Video guide playlist">
            {playlist.map((video) => {
              const selected = video.index === activeIndex;
              return (
                <button
                  key={video.title}
                  type="button"
                  aria-current={selected ? 'true' : undefined}
                  aria-label={`Play ${video.title}`}
                  onClick={() => setActiveIndex(video.index)}
                  className={`group text-left rounded-2xl border p-5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 ${
                    selected
                      ? 'bg-navy-950 border-navy-950 text-white shadow-xl'
                      : 'bg-white border-navy-100 text-navy-900 hover:border-gold-400 hover:shadow-md'
                  }`}
                >
                  <div className={`text-sm font-serif font-bold mb-4 ${selected ? 'text-gold-300' : 'text-gold-600'}`}>{String(video.index + 1).padStart(2, '0')}</div>
                  <div className="font-serif text-xl font-semibold mb-2">{video.playlistTitle}</div>
                  <div className={`text-sm leading-relaxed ${selected ? 'text-navy-200' : 'text-navy-600'}`}>{video.playlistSubtitle}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

