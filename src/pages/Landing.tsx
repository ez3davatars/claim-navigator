import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import Overview from '../components/landing/Overview';
import DisclaimerNotice from '../components/landing/DisclaimerNotice';
import Problem from '../components/landing/Problem';
import Included from '../components/landing/Included';
import Process from '../components/landing/Process';
import About from '../components/landing/About';
import WhoFor from '../components/landing/WhoFor';
import FAQ from '../components/landing/FAQ';
import Consultation from '../components/landing/Consultation';
import ExampleDocuments from '../components/landing/ExampleDocuments';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';
import VideoGuide from '../components/landing/VideoGuide';
import { useSeo, webPageSchema } from '../lib/seo';
import { VIDEO_GUIDE, isPlaceholderVideoUrl, isSelfHostedVideoUrl } from '../lib/videoGuide';

function videoObjectSchema() {
  return VIDEO_GUIDE.map((video) => {
    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: video.title,
      description: video.description,
      transcript: video.transcript.join('\n\n'),
    };

    if (!isPlaceholderVideoUrl(video.embedUrl)) {
      if (isSelfHostedVideoUrl(video.embedUrl)) {
        schema.contentUrl = video.embedUrl;
      } else {
        schema.embedUrl = video.embedUrl;
      }
    }

    return schema;
  });
}

export default function Landing() {
  useSeo({
    title: 'Claim Navigator by Get Pro Se Solutions, LLC | Small Claims Document Templates',
    description: 'Claim Navigator is a self-help document preparation platform for self-represented litigants. Small claims court document templates and guided preparation support by Get Pro Se Solutions, LLC.',
    path: '/',
    jsonLd: [webPageSchema('Claim Navigator Home', 'Self-help small claims document preparation platform by Get Pro Se Solutions, LLC.', '/'), ...videoObjectSchema()],
  });

  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Overview />
        <VideoGuide />
        <WhoFor />
        <Included />
        <Process />
        <DisclaimerNotice />
        <Problem />
        <ExampleDocuments />
        <About />
        <FAQ />
        <Consultation />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

