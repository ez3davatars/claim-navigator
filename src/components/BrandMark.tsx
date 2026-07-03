interface Props {
  size?: 'sm' | 'md' | 'lg';
  spinning?: boolean;
  className?: string;
}

const SIZES = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-24 h-24',
};

export default function BrandMark({ size = 'md', spinning = true, className = '' }: Props) {
  return (
    <img
      src="/assets/pro-se-solutions-logo.png"
      alt="Get Pro Se Solutions, LLC logo"
      className={`${SIZES[size]} rounded-full object-cover shadow-sm ${spinning ? 'brand-logo-spin' : ''} ${className}`}
    />
  );
}

