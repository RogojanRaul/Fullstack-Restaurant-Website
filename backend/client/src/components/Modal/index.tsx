import styles from './styles.module.css';

const Modal = ({ children, isOpen }: any) => {
  return (
    <>
      {isOpen && (
        <div className={styles.container}>
          <div className={styles.modalCard}>{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
