import React, {useCallback, useEffect, useRef, useState} from 'react';
import type {EmblaOptionsType} from 'embla-carousel-react';
import useEmblaCarousel from 'embla-carousel-react';
import {flushSync} from 'react-dom';
import {hrefByIndex, imageByIndex, images} from './imagesByIndex';
import styles from './Carousel.module.css';
import classNames from 'classnames';

const TWEEN_FACTOR = 1.2;

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({slides, options}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [tweenValues, setTweenValues] = useState<number[]>([]);
  const progressBarRef = useRef<HTMLElement>(null);
  const [currentScrollIdx, setSurrentScrollIdx] = useState(0);
  const onScroll = useCallback(() => {
    if (!emblaApi) return;

    setSurrentScrollIdx(emblaApi.selectedScrollSnap());

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      return diffToTarget * (-1 / TWEEN_FACTOR) * 100;
    });
    setTweenValues(styles);
  }, [emblaApi, setTweenValues]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on('scroll', () => {
      flushSync(() => onScroll());
    });
    emblaApi.on('reInit', onScroll);
  }, [emblaApi, onScroll]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__parallax">
                <div
                  className="embla__parallax__layer"
                  style={{
                    ...(tweenValues.length && {
                      transform: `translateX(${tweenValues[index]}%)`,
                    }),
                  }}
                >
                  <a href={hrefByIndex(index)}>
                    <img
                      className="embla__slide__img embla__parallax__img"
                      src={imageByIndex(index)}
                      alt="Your alt text"
                    />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.carouselProgress}>
          {slides.map((slide, index) => (
            <div key={slide} className={styles.carouselProgressBarBg}>
              <div
                className={classNames(styles.carouselProgressBar, {
                  [styles.scrolledTo]: currentScrollIdx >= index,
                })}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
