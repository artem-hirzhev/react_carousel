import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;

};

type State = {
  start: number;
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    start: 0,
  };

  clickNext = () => {
    const {
      step,
      itemWidth,
      frameSize,
      images,
    } = this.props;

    const maxTransition = (images.length * itemWidth) - (frameSize * itemWidth);

    this.setState(state => ({
      start: (state.start - (step * itemWidth)) < -maxTransition
        ? -maxTransition
        : (state.start - (step * itemWidth)),
    }));
  };

  clickPrev = () => {
    const {
      step,
      itemWidth,
    } = this.props;

    this.setState(state => ({
      start: (state.start + (step * itemWidth)) > 0
        ? 0
        : (state.start + (step * itemWidth)),
    }));
  };

  render() {
    const { start } = this.state;
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.props;

    return (
      <div className="Carousel">
        <div
          className="Carousel__wrapper"
          style={{ width: itemWidth * frameSize }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translate(${start}px)`, transitionDuration: `${animationDuration}ms`,
            }}
          >
            {images.map(image => (
              <li
                key={image}
                className="Carousel__item"
              >
                <img
                  src={image}
                  alt={image.slice(image.lastIndexOf('/') + 1, -4)}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="Carousel__buttons">
          <button
            className="Carousel__button"
            type="button"
            onClick={this.clickPrev}
          >
            Prev
          </button>

          <button
            className="Carousel__button"
            type="button"
            onClick={this.clickNext}
            data-cy="next"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
