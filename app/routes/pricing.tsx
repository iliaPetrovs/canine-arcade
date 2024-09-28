import Section from '~/components/Section';
import PricingGrid from '~/subcomponents/PricingGrid/PricingGrid';

export default function Pricing() {
  return (
    <Section className="m-t-0" isHero={true}>
      <PricingGrid />
    </Section>
  );
}
