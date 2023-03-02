import SubmitReset from 'app/components/common/SubmitReset'
import DatepickerForm from 'app/components/recommender/DatepickerForm'
import TextFieldForm from 'app/components/recommender/TextFieldForm'
import { useForm } from 'react-hook-form'
import { globalConstants } from 'app/constants/constant'
import { Paper } from '@mui/material'
import { ComparisonFilterFormType } from './comparison.types'

function ComparisonFilter() {
  const {
    handleSubmit: comparisonFilterHandleSubmit,
    control: comparisonFilterControl,
    reset: comparisonFilterReset,
  } = useForm<ComparisonFilterFormType>({
    defaultValues: { scenarioName: '', startDate: new Date() },
  })
  const onComparisonFilter = (data: any) => {
    console.log(data)
  }
  return (
    <Paper className='p-5' elevation={globalConstants.defaultPaperElevation}>
      <form
        onSubmit={comparisonFilterHandleSubmit(onComparisonFilter)}
        color='primary'
        className='grid grid-cols-4 gap-4 '
      >
        <TextFieldForm
          control={comparisonFilterControl}
          name='scenarioName'
          label='Scenario Name'
        />
        <DatepickerForm
          control={comparisonFilterControl}
          label='Start Date'
          name='startDate'
        />
        <SubmitReset
          onReset={comparisonFilterReset}
          submitButtonText='Filter'
          resetButtonText='Reset'
          className='col-span-2'
        />
      </form>
    </Paper>
  )
}

export default ComparisonFilter
