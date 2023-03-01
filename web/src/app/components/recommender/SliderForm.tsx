import { Box, Slider, SliderProps, Typography, styled } from '@mui/material'
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
  className?: string
}

const MSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: 'normal',
    top: -6,
    backgroundColor: 'unset',
    color: theme.palette.text.primary,
    '&:before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
  },
}))
function SliderForm<T extends FieldValues>({
  control,
  name,
  error,
  label,
  className,
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
    <Box sx={{ width: 300 }} className={className}>
      <Typography gutterBottom>{label}</Typography>
      <MSlider
        getAriaLabel={() => `${value}%`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
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
  className: '',
}

export default SliderForm
