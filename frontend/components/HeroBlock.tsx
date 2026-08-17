import Button from "./Button";

interface HeroBlockProps {
  title: string;
  subtitle?: string;
  cta?: {
    label: string;
    href: string;
  };
}

export default function HeroBlock({ title, subtitle, cta }: HeroBlockProps) {
  return (
    <div className="py-section-lg md:py-24 text-center">
      <h1 className="text-display-sm md:text-display-md lg:text-display-lg mb-6">
        {title}
      </h1>
      {subtitle && (
        <p className="text-body md:text-lg text-text-soft mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      {cta && (
        <Button href={cta.href} variant="primary">
          {cta.label}
        </Button>
      )}
    </div>
  );
}
