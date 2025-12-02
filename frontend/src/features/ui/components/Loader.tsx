import classes from './Loader.module.scss';

type LoaderProps = {
  loadingText?: string;
  isFullscreen?: boolean;
};
export const Loader = ({
  loadingText = 'Loading...',
  isFullscreen = false,
}: LoaderProps) => {
  return (
    <div
      className={
        isFullscreen
          ? `${classes.container} ${classes.fullscreen}`
          : classes.container
      }>
      <div className={classes.loader} />
      <h5 className={classes.loadingText}>{loadingText}</h5>
    </div>
  );
};
