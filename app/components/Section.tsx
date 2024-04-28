import classNames from 'classnames';
import React from 'react';

type SectionProps = {
  children: React.ReactNode;
  bg?: 'light';
  isHero?: boolean;
};

const BG_CLASS = {
  light: 'bg-light',
  default: '',
};

const Section = ({bg, isHero, children}: SectionProps) => {
  return (
    <section
      className={classNames('section', BG_CLASS[bg ?? 'default'], {
        topOffset: isHero,
      })}
    >
      <div className="wide-container">{children}</div>
    </section>
  );
};

export default Section;
