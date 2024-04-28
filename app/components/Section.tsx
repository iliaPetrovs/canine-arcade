import React from 'react';

type SectionProps = {
  children: React.ReactNode;
};

const Section = ({children}: SectionProps) => {
  return (
    <section className="section">
      <div className="wide-container">{children}</div>
    </section>
  );
};

export default Section;
