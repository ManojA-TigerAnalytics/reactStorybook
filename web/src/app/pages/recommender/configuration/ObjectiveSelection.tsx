import { Button, Divider, Typography } from '@mui/material'
import DropDownForm from 'app/components/recommender/DropDownForm'
import { useWatch, useFieldArray } from 'react-hook-form'
import { useEffect, useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import TextFieldForm from 'app/components/recommender/TextFieldForm'
import { DropDownOption } from '../recommender.types'

type ObjectiveSelectionProps = {
  control: any
  options: DropDownOption[]
}
function ObjectiveSelection({ control, options }: ObjectiveSelectionProps) {
  const maximizeObjectiveSelected = useWatch({
    control,
    name: 'maximizeObjective',
  })
  const lowerBoundObjectiveSelected = useWatch({
    control,
    name: 'lowerBoundObjectives',
  })
  const { fields, append, remove } = useFieldArray({
    name: 'lowerBoundObjectives',
    control,
  })
  const [maximizeOptions, setMaximizeOptions] =
    useState<DropDownOption[]>(options)
  const [lowerBoundOptions, setLowerBoundOptions] =
    useState<DropDownOption[]>(options)
  const [lowerBoundDisabledOptions, setLowerBoundDisabledOptions] = useState<
    string[]
  >([])
  useEffect(() => {
    setMaximizeOptions(options)
  }, [options])

  useEffect(() => {
    const lowerBoundObjectiveToBeDisabled = lowerBoundObjectiveSelected.map(
      (item: { lowerBoundObjective: string }) => item.lowerBoundObjective
    )
    const objectiveToBeRemovedFromMaxList = options.filter(
      (item) => !lowerBoundObjectiveToBeDisabled.includes(item.value)
    )
    setLowerBoundDisabledOptions(lowerBoundObjectiveToBeDisabled)
    setMaximizeOptions(objectiveToBeRemovedFromMaxList)
  }, [lowerBoundObjectiveSelected])
  useEffect(() => {
    setLowerBoundOptions(
      options.filter((item) => item.value !== maximizeObjectiveSelected)
    )
    if (lowerBoundDisabledOptions?.includes(maximizeObjectiveSelected)) {
      remove(
        options.map((item) => item.value).indexOf(maximizeObjectiveSelected)
      )
    }
  }, [maximizeObjectiveSelected])

  return (
    <div className='grid grid-cols-4 gap-4'>
      <Typography>Objective</Typography>
      <DropDownForm
        control={control}
        label='Apply To'
        name='applyObjectiveTo'
        options={options}
        className='col-span-1 col-start-4'
      />
      <DropDownForm
        control={control}
        label='Maximize'
        name='maximizeObjective'
        options={maximizeOptions}
        className='col-start-1'
      />
      {fields.map((field, index) => (
        <div key={field.id} className='col-span-2 col-start-3'>
          <div className='grid grid-flow-row grid-cols-6 gap-2'>
            <DropDownForm
              control={control}
              label={`Lower Bound ${index + 1}`}
              name={`lowerBoundObjectives[${index}].lowerBoundObjective`}
              options={lowerBoundOptions}
              disabled={!maximizeObjectiveSelected}
              className='col-span-2'
              disabledOptions={lowerBoundDisabledOptions}
            />
            <TextFieldForm
              control={control}
              label='%'
              textFieldProps={{ type: 'number' }}
              name={`lowerBoundObjectives[${index}].percentage`}
              disabled={
                !lowerBoundObjectiveSelected.at(index)?.lowerBoundObjective
              }
              className='col-span-1'
            />
            {index > 0 && (
              <DeleteOutlineIcon
                onClick={() => remove(index)}
                color='secondary'
                className='m-2'
              />
            )}
          </div>
        </div>
      ))}
      {lowerBoundObjectiveSelected.length < options.length - 1 && (
        <Button
          size='small'
          variant='contained'
          color='secondary'
          className='m-2 col-start-3 col-span-1'
          onClick={() => append({ lowerBoundObjective: '', percentage: '' })}
          disabled={
            !(
              lowerBoundObjectiveSelected.at(-1).lowerBoundObjective &&
              lowerBoundObjectiveSelected.at(-1).percentage
            )
          }
        >
          + Add Bound
        </Button>
      )}

      <Divider className='col-span-4' />
    </div>
  )
}

export default ObjectiveSelection
