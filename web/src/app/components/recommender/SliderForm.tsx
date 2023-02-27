import { Box, Slider, SliderProps, Typography } from '@mui/material'
import {
  Control,
  FieldError,
  FieldValues,
  useController,
  PathValue,
  Path,
} from 'react-hook-form'

type SliderFormProps<T extends FieldValues> = SliderProps & {
  control: Control<T>
  name: Path<T>
  label: string
  error?: FieldError
  defaultValue?: PathValue<T, Path<T>>
}
function SliderForm<T extends FieldValues>({
  control,
  name,
  error,
  defaultValue,
  ...rest
}: SliderFormProps<T>) {
  const {
    field: { value, onChange, onBlur },
  } = useController({
    name,
    control,
    defaultValue,
  })
  return (
    <Box sx={{ width: 300 }}>
      <Typography gutterBottom>Volume</Typography>
      <Slider
        getAriaLabel={() => `${value}%`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        valueLabelDisplay='auto'
        getAriaValueText={() => `${value}%`}
        color='secondary'
        {...rest}
      />
      {error && (
        <Typography variant='caption' color='error'>
          {error.message}
        </Typography>
      )}
    </Box>
  )
}

SliderForm.defaultProps = {
  error: null,
  defaultValue: null,
}

export default SliderForm
