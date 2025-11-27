import classes from './Loader.module.scss';
export const Loader = ({
  loadingText = 'Loading...',
}: {
  loadingText?: string;
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.loader} />
      <h5 className={classes.loadingText}>{loadingText}</h5>
    </div>
  );
};
