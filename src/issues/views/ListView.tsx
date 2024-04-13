import { useState } from 'react';
import { IssueList, LabelPicker } from '../components';
import { useIssues } from '../hooks';
import { LoadingIcon } from '../../shared/components/LoadingIcon';


export const ListView = () => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const { issuesQuery } = useIssues()

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
           : <IssueList issues={ issuesQuery.data || [] } />
        }i
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
