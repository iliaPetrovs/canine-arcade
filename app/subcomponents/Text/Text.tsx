import React from 'react';
import styles from './Text.module.css';
import BubbleTitle from '../BubbleTitle/BubbleTitle';
import classNames from 'classnames';
import {RxCross2} from 'react-icons/rx';

type TextProps = {
  title: string;
  content: React.ReactNode;
};

const Text = ({title, content}: TextProps) => {
  return (
    <>
      <div className="row">
        <div className={classNames('col-xs-12', styles.center)}>
          <BubbleTitle title={title} />
        </div>
        <div className="col-xs-12">{content}</div>
      </div>
    </>
  );
};

export default Text;
