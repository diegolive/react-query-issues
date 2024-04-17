import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Issue, State } from "../interfaces";
import { sleep } from "../../helpers";

interface Props {
  state?: State,
  labels: string[],
}

const getIssues = async (labels: string[]=[], state?: State):Promise<Issue[]> => {
  
  await sleep(import.meta.env.VITE_SECONDS_TO_DELAY ?? 2)

  const params = new URLSearchParams();

  if (state) params.append('state', state);

  if (labels.length>0) {
    const labelString = labels.join(',')
    params.append('labels',labelString)
  }

  params.append('page','1')
  params.append('per_page','5')

  const { data } = await githubApi.get<Issue[]>('/issues', { params })
  // console.log(data)
  return data
}


export const useIssues = ({state, labels}: Props) => {
  
  const issuesQuery = useQuery({
    queryKey: ['issues', { state, labels }], // al ser un objeto no importa el orden, mejor para mantener cache
    queryFn: () => getIssues(labels, state)
  })

  return { issuesQuery };
  
}
