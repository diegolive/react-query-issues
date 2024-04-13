import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api/githubApi"
import { sleep } from "../../helpers";
import { Issue } from "../interfaces"

const getIssueInfo = async ( issueNumber: number ):Promise<Issue> => {
  await sleep(2);
  const { data } = await githubApi.get(`/issues/${issueNumber}`)
  // console.log('issueNumber',issueNumber)
  // console.log(data)
  return data;
}

const getIssueComments = async ( issueNumber: number ):Promise<Issue[]> => {
  await sleep(2);
  const { data } = await githubApi.get(`/issues/${issueNumber}/comments`)
  // console.log('issueNumber',issueNumber)
  // console.log(data)
  return data;
}

export const useIssue = ( issueNumber: number) => {
  
  const issueQuery = useQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => getIssueInfo(issueNumber)
  })

  const commentsQuery = useQuery({
    queryKey: ['issue', issueNumber, 'comments'],
    queryFn: () => getIssueComments(issueQuery.data!.number),
    enabled: !!issueQuery.data
  })

  return { 
    issueQuery, 
    commentsQuery }
}
