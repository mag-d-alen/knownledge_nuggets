// import { useGetNuggetsQuery } from '../api/nuggetApi';
// import { useMemo } from 'react';

// export const useNuggets = () => {
//   const { data, isLoading, isError } = useGetNuggetsQuery();

//   const paginationState = useMemo(
//     () => ({
//       totalPages: data?.totalPages || 0,
//       totalNuggets: data?.totalNuggets || 0,
//       isLastPage: data?.isLastPage || false,
//     }),
//     [data],
//   );

//   return {
//     nuggets: data?.nuggets || [],
//     nuggetsCount: data?.totalNuggets || 0,
//     isLoading,
//     isError,
//     paginationState,
//   };
// };
