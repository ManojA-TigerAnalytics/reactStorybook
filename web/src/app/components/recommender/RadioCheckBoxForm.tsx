import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormHelperText,
} from '@mui/material'
import {
  Control,
  FieldValues,
  useController,
  PathValue,
  Path,
} from 'react-hook-form'

type RadioCheckBoxFormProps<T extends FieldValues> = CheckboxProps & {
  control: Control<T>
  name: Path<T>
  options: { label: string; value: string }[]
  defaultValue?: PathValue<T, Path<T>>
}
function RadioCheckBoxForm<T extends FieldValues>({
  control,
  name,
  defaultValue,
  options,
}: RadioCheckBoxFormProps<T>) {
  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    defaultValue,
  })

  const handleCheckBox = (value: string) => {
    const currentValues: string[] = inputProps.value ?? []
    const newValues: string[] = currentValues.includes(value)
      ? currentValues.filter((currentValue) => currentValue !== value)
      : [value]
    inputProps.onChange(newValues)
  }
  return (
    <>
      {options.map((option) => (
        <div key={option.value} className='mt-2'>
          <FormControlLabel
            value={option.value}
            control={
              <Checkbox
                inputRef={ref}
                {...inputProps}
                color='secondary'
                checked={inputProps.value?.includes(option.value)}
                onChange={() => handleCheckBox(option.value)}
              />
            }
            label={option.label}
          />
        </div>
      ))}
      {invalid && <FormHelperText error>{error?.message}</FormHelperText>}
    </>
  )
}

RadioCheckBoxForm.defaultProps = {
  defaultValue: null,
}

export default RadioCheckBoxForm
