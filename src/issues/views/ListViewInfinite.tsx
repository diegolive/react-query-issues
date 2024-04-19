import { useState } from 'react';
import { IssueList, LabelPicker } from '../components';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { useIssuesInfinite } from '../hooks';
import { State } from '../interfaces';


export const ListViewInfinite = () => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [state, setState] = useState<State>()
  const { issuesQuery } = useIssuesInfinite({state, labels: selectedLabels})

  const onLabelChange = (labelName: string) => {
    (selectedLabels.includes(labelName))
    ? setSelectedLabels( selectedLabels.filter( label => label !== labelName))
    : setSelectedLabels([...selectedLabels, labelName])
  }

  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {
          issuesQuery.isLoading
           ? <LoadingIcon />
           : <IssueList 
                issues={ issuesQuery.data?.pages.flat() || [] } 
                state={state}
                onStateChanged={(newState) => setState(newState) }
             />
        }
        <button 
          className='btn btn-outline-primary mt-3' 
          disabled={ issuesQuery.isFetching || !issuesQuery.hasNextPage }
          onClick={() =>  issuesQuery.fetchNextPage()}
          >
          Load More...
        </button>
      </div>
      
      <div className="col-4">
        <LabelPicker 
          selectedLabels={selectedLabels}
          onChange={(labeName) => onLabelChange(labeName)}
        />
      </div>
    </div>
  )
}
