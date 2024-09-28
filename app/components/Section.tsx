import classNames from 'classnames';
import React from 'react';

type SectionProps = {
  children: React.ReactNode;
  bg?: 'light';
  isHero?: boolean;
  className?: string;
};

const BG_CLASS = {
  light: 'bg-light',
  default: '',
};

const Section = ({bg, isHero, children, className}: SectionProps) => {
  return (
    <section
      className={classNames('section', className, BG_CLASS[bg ?? 'default'], {
        topOffset: isHero,
      })}
    >
      <div className="wide-container">{children}</div>
    </section>
  );
};

export default Section;
