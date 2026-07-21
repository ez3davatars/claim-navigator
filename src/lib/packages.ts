export type PackageId = 'starter' | 'standard' | 'expedited';

export interface ClaimNavigatorPackage {
  id: PackageId;
  product: string;
  title: string;
  eyebrow: string;
  price: number;
  paymentLabel: string;
  turnaround: string;
  description: string;
  features: string[];
  ctaText: string;
  requiresIntake: boolean;
  featured?: boolean;
}

export const PACKAGES: ClaimNavigatorPackage[] = [
  {
    id: 'starter',
    product: 'Claim Navigator Starter Pack',
    title: 'DIY Template Starter Pack',
    eyebrow: 'Package 1',
    price: 49,
    paymentLabel: 'one-time',
    turnaround: 'Instant Digital Delivery',
    description: 'Downloadable small claims templates and plain-language instructions for self-represented litigants who want to prepare their own documents.',
    features: [
      'Complaint Template',
      'Discovery Demand Template',
      'Demand Letter Template',
      "Defendant's Answer Template",
      'Settlement Proposal Template',
      'Step-by-Step Instructions Guide',
    ],
    ctaText: 'Get DIY Starter Pack',
    requiresIntake: false,
  },
  {
    id: 'standard',
    product: 'Standard Clerical Document Preparation',
    title: 'Standard Clerical Document Preparation',
    eyebrow: 'Package 2',
    price: 149,
    paymentLabel: 'one-time',
    turnaround: '14 Days',
    description: 'Clerical document preparation services for self-represented litigants. Customer must provide all information and responses required for document completion.',
    features: [
      'Typing information exactly as provided by the customer',
      'Formatting forms and templates',
      'Transferring customer-provided responses into templates',
      'Administrative document assistance only',
      'No legal advice or legal strategy provided',
    ],
    ctaText: 'Start Standard Preparation',
    requiresIntake: true,
    featured: true,
  },
  {
    id: 'expedited',
    product: 'Expedited Clerical Document Preparation',
    title: 'Expedited Clerical Document Preparation',
    eyebrow: 'Package 3',
    price: 299,
    paymentLabel: 'one-time',
    turnaround: '48 Hours',
    description: 'Expedited clerical document preparation services for self-represented litigants. Customer must provide all information and responses required for document completion.',
    features: [
      'Typing information exactly as provided by the customer',
      'Formatting forms and templates',
      'Transferring customer-provided responses into templates',
      'Administrative document assistance only',
      'No legal advice or legal strategy provided',
    ],
    ctaText: 'Start Expedited Preparation',
    requiresIntake: true,
  },
];

export function getPackageById(id: string | null | undefined) {
  return PACKAGES.find((pkg) => pkg.id === id) ?? PACKAGES[0];
}
