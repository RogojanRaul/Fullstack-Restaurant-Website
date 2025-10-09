import Button from '../Button';

import styles from './styles.module.css';

type TextBlockType = {
  tag?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  buttonEndIcon?: any;
  buttonStartIcon?: any;
};

const TextBlock = ({
  tag,
  title,
  description,
  buttonText,
  buttonHref,
  buttonEndIcon,
  buttonStartIcon,
}: TextBlockType) => {
  return (
    <div className={styles.textContainer}>
      {tag && (
        <p className={styles.tag}>
          <span className={styles.line} />
          {tag}
        </p>
      )}
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <Button
        variant='ternary-quaternary'
        as='Link'
        href={buttonHref}
        size='sm'
        endIcon={buttonEndIcon ? buttonEndIcon : ''}
        startIcon={buttonStartIcon ? buttonEndIcon : ''}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default TextBlock;
