export const VIDEO_GUIDE_DISCLAIMER =
  'Pro Se Solutions LLC provides self-help document preparation support and legal information only. It is not a law firm and does not provide legal advice, representation, court filing, or outcome guarantees.';

export interface VideoGuideItem {
  title: string;
  playlistTitle: string;
  playlistSubtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  embedUrl: string;
  transcript: string[];
}

export const VIDEO_GUIDE: VideoGuideItem[] = [
  {
    title: 'The Complaint: The Foundation of Every Lawsuit',
    playlistTitle: 'The Complaint',
    playlistSubtitle: 'The foundation of every lawsuit',
    description: 'Learn what a complaint tells the court and why it is the starting point for a lawsuit.',
    ctaText: 'View Supported Documents',
    ctaLink: '#documents',
    embedUrl: '/videos/Complaint-Foundation.mp4',
    transcript: [
      "Hello, I'm Matthew Aulicino, founder of Pro Se Solutions LLC.",
      'Many people believe filing a lawsuit begins when they walk into court. In reality, it begins with a complaint.',
      "A complaint is the document that tells the court who the parties are, what happened, what laws were violated, and what relief you're asking the court to provide.",
      "A well-organized complaint helps present your story in a clear legal format, allows the court to understand your allegations, and demonstrates that you've taken the time to properly prepare your case before filing.",
      'At Pro Se Solutions LLC, our goal is to help you organize the facts, documents, and information necessary to prepare that complaint with confidence.',
    ],
  },
  {
    title: 'The Biggest Mistake Pro Se Litigants Make',
    playlistTitle: 'The Biggest Mistake',
    playlistSubtitle: 'Why preparation matters',
    description: 'See why preparation and organization matter before filing documents with the court.',
    ctaText: 'Start Preparing Correctly',
    ctaLink: '#how-it-works',
    embedUrl: '/videos/Pro-Se-Preparation-Mistake.mp4',
    transcript: [
      "One of the biggest mistakes self-represented litigants make is filing documents before they're fully prepared.",
      'Judges and opposing parties often receive hundreds of filings. The more organized and complete your information is, the easier it becomes to present your claims, identify supporting evidence, and explain your position.',
      "Preparation doesn't guarantee success, but it does help ensure your case is presented in a clear and professional manner from the very beginning.",
    ],
  },
  {
    title: 'Turning Your Story Into a Structured Complaint',
    playlistTitle: 'Story to Structure',
    playlistSubtitle: 'Organize the important details',
    description: 'Learn how facts, documents, and details can be organized into a structured complaint-preparation format.',
    ctaText: 'See How It Works',
    ctaLink: '#how-it-works',
    embedUrl: '/videos/Story-To-Structured-Complaint.mp4',
    transcript: [
      'Every case begins with a story, but courts require more than a story. They require facts, organization, and proper documentation.',
      'Our process is designed to help you organize your information, identify the important details, and transform your situation into a structured format that supports complaint preparation.',
      "Whether you're just getting started or already know the direction you want to take, we're here to help you approach the process with confidence.",
    ],
  },
  {
    title: 'Choosing the Right Complaint Preparation Package',
    playlistTitle: 'Choose Your Package',
    playlistSubtitle: 'Compare DIY, Standard, and Expedited options',
    description: 'Compare the DIY Template Starter Pack, Standard Clerical Document Preparation, and Expedited Clerical Document Preparation options.',
    ctaText: 'Compare All Packages',
    ctaLink: '#pricing',
    embedUrl: '/videos/Choose-Preparation-Package.mp4',
    transcript: [
      'Not every situation requires the same level of assistance.',
      'Some customers prefer a do-it-yourself package, while others prefer a more guided approach through our automated preparation system.',
      'Getting started is simple. Select the package that best fits your needs and complete the intake questionnaire. Our system then helps organize your information into a structured format designed to assist with complaint preparation, helping you present your story in a clear and professional manner.',
      'Whichever option you choose, our goal is to help you save time, stay organized, and move forward with confidence.',
    ],
  },
];

export function isPlaceholderVideoUrl(url: string) {
  return url.startsWith('VIDEO_');
}

export function isSelfHostedVideoUrl(url: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
}


