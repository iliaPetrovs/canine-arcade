import styles from './Button.module.css';

type ButtonProps = {
  text: string;
  link: string;
  target: string;
};

const Button = ({text, link, target}: ButtonProps) => {
  return (
    <a className={styles.buttonText} href={link} target={target}>
      Continue to Checkout
    </a>
  );
};

export default Button;
