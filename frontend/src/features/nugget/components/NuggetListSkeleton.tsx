import classes from './Nugget.module.scss';
export const NuggetListSkeleton: React.FC = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={classes.card}>
          <div className={`${classes.titleContainer} ${classes.skeletonTitle}`} />
          <div className={`${classes.content} ${classes.skeletonContent}`} />
        </div>
      ))}
    </>
  );
};
