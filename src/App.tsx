import { useRoute } from './lib/router';
import Landing from './pages/Landing';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Legal from './pages/Legal';
import {
  TemplatesHub,
  DemandLetterPage,
  ComplaintPage,
  SelfRepresentedPage,
  ProSePrepPage,
  HowItWorksPage,
  PackagesPricingPage,
  FaqPage,
  AboutPage,
  ContactPage,
} from './pages/SeoPages';

function App() {
  const [path] = useRoute();

  switch (path) {
    case '/':
      return <Landing />;
    case '/checkout':
      return <Checkout />;
    case '/success':
      return <Success />;
    case '/admin':
      return <Admin />;
    case '/admin/login':
      return <AdminLogin />;
    case '/disclaimer':
      return <Legal type="disclaimer" />;
    case '/terms':
      return <Legal type="terms" />;
    case '/privacy':
      return <Legal type="privacy" />;
    case '/small-claims-court-document-templates':
      return <TemplatesHub />;
    case '/small-claims-demand-letter-template':
      return <DemandLetterPage />;
    case '/small-claims-complaint-template':
      return <ComplaintPage />;
    case '/self-represented-litigant-help':
      return <SelfRepresentedPage />;
    case '/pro-se-court-document-preparation':
      return <ProSePrepPage />;
    case '/how-it-works':
      return <HowItWorksPage />;
    case '/pricing':
      return <PackagesPricingPage />;
    case '/faq':
      return <FaqPage />;
    case '/about':
      return <AboutPage />;
    case '/contact':
      return <ContactPage />;
    default:
      return <Landing />;
  }
}

export default App;
