import { useInfiniteQuery } from "@tanstack/react-query"
import { Issue, State } from "../interfaces"
import { sleep } from "../../helpers";
import { githubApi } from "../../api/githubApi";

interface Props {
  state?: State,
  labels: string[],
  page?: number,
}

interface QueryProps {
  pageParam?: number,
  queryKey: (string | Props)[]
}


const getIssuesInfinite = async ({pageParam = 1, queryKey}: QueryProps):Promise<Issue[]> => {
  
  const [,,args] = queryKey;
  const { state, labels } = args as Props;

  await sleep(import.meta.env.VITE_SECONDS_TO_DELAY ?? 2)

  const params = new URLSearchParams();
  if (state) params.append('state', state);
  if (labels.length>0) {
    const labelString = labels.join(',')
    params.append('labels',labelString)
  }
  params.append('page', pageParam.toString())
  params.append('per_page','5')

  const { data } = await githubApi.get<Issue[]>('/issues', { params })
  // console.log(data)
  return data
}

export const useIssuesInfinite = ({state, labels}: Props) => {

  const issuesQuery = useInfiniteQuery({
    queryKey: ['issues', 'infinite', { state, labels }],
    queryFn: getIssuesInfinite, // recibe un objeto con {querKey , pageParam}
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return; 
      return pages.length + 1;
    }
  })

  return { issuesQuery }

}
