import { DeleteNugget } from '.';
import { Tag } from '../../ui/components/Tag';
import classes from './Nugget.module.scss';

type NuggetCardProps = {
  id: string;
  title: string;
  content: string;
  tags: string[];
};
export const NuggetCard: React.FC<NuggetCardProps> = ({
  id,
  title,
  content,
  tags,
}) => {
  return (
    <div key={id} className={classes.card}>
      <div className={classes.title}>
        {title} <DeleteNugget id={id} />
      </div>
      <div className={classes.content}>{content}</div>
      <div className={classes.tags}>
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
};
