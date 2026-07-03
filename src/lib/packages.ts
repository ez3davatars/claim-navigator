import { CLERICAL_PACKAGE_DISCLAIMER } from './legal';

export type PackageId = 'starter' | 'standard' | 'expedited';

export interface ClaimNavigatorPackage {
  id: PackageId;
  product: string;
  title: string;
  eyebrow: string;
  price: number;
  turnaround: string;
  description: string;
  features: string[];
  requiresIntake: boolean;
  disclaimer?: string;
}

export const PACKAGES: ClaimNavigatorPackage[] = [
  {
    id: 'starter',
    product: 'Claim Navigator Starter Pack',
    title: 'DIY Template Starter Pack',
    eyebrow: 'Package 1',
    price: 49,
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
    requiresIntake: false,
  },
  {
    id: 'standard',
    product: 'Standard Clerical Document Preparation',
    title: 'Standard Clerical Document Preparation',
    eyebrow: 'Package 2',
    price: 149,
    turnaround: '14 Days',
    description: 'Clerical document preparation services for self-represented litigants. Customer must provide all information and responses required for document completion.',
    features: [
      'Typing information exactly as provided by the customer',
      'Formatting forms and templates',
      'Transferring customer-provided responses into templates',
      'Administrative document assistance only',
      'No legal advice or legal strategy provided',
    ],
    requiresIntake: true,
    disclaimer: CLERICAL_PACKAGE_DISCLAIMER,
  },
  {
    id: 'expedited',
    product: 'Expedited Clerical Document Preparation',
    title: 'Expedited Clerical Document Preparation',
    eyebrow: 'Package 3',
    price: 299,
    turnaround: '48 Hours',
    description: 'Expedited clerical document preparation services for self-represented litigants. Customer must provide all information and responses required for document completion.',
    features: [
      'Typing information exactly as provided by the customer',
      'Formatting forms and templates',
      'Transferring customer-provided responses into templates',
      'Administrative document assistance only',
      'No legal advice or legal strategy provided',
    ],
    requiresIntake: true,
    disclaimer: CLERICAL_PACKAGE_DISCLAIMER,
  },
];

export function getPackageById(id: string | null | undefined) {
  return PACKAGES.find((pkg) => pkg.id === id) ?? PACKAGES[0];
}
