import { useGetNuggetsQuery } from '../api/nuggetApi';
import { DeleteNugget } from './DeleteNugget';

export const NuggetList = () => {
  const { data, isLoading } = useGetNuggetsQuery();
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
      }}>
      {data.length} nuggets found.
      {data.map((nugget) => (
        <div key={nugget.id}>
          <div>
            {nugget.title} <DeleteNugget id={nugget.id} />
          </div>
          <div>{nugget.content}</div>
          <div>{nugget.tags?.join(', ')}</div>
        </div>
      ))}
    </div>
  );
};
