import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useQueryClient } from '@tanstack/react-query';
import { Issue, State } from '../interfaces';
import { getIssueComments, getIssueInfo } from '../hooks';

interface Props {
    issue: Issue
}

export const IssueItem:FC<Props> = ({issue}) => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const prefetchData = () => {
        queryClient.prefetchQuery({
            queryKey: ['issue', issue.number],
            queryFn: () => getIssueInfo(issue.number),
            staleTime: 1000*30, //para evitar demasiadas llamdas al mover el ratón lo guardo 30 segundos
        })
        queryClient.prefetchQuery({
            queryKey: ['issue', issue.number, 'comments'],
            queryFn: () => getIssueComments(issue.number),
            staleTime: 1000*30, //para evitar demasiadas llamdas al mover el ratón lo guardo 30 segundos
        })
    }

    const preSetData = () => {
        queryClient.setQueryData(
            ['issue', issue.number],
            issue,
            {
                updatedAt: new Date().getTime() + 1000 * 60 * 15 // 15 minutos
            }
        )    
    }

    return (
        <div className="card mb-2 issue"
            onClick={() => navigate(`/issues/issue/${issue.number}`)}
            // onMouseEnter={ prefetchData }
            onMouseEnter={ preSetData }
        >
            <div className="card-body d-flex align-items-center">
                {
                    (issue.state === State.Open)
                     ? <FiInfo size={30} color="red" />
                     : <FiCheckCircle size={30} color="green" />
                }

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{issue.title}</span>
                    <span className="issue-subinfo">#{issue.number} opened two days ago by <span className='fw-bold'>{issue.user.login}</span></span>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={issue.user.avatar_url} alt="User Avatar" className="avatar" />
                    <span className='px-2'>{issue.comments}</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}
