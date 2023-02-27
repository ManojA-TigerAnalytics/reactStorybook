import {
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { useController } from 'react-hook-form'

type MenuItemOption = {
  label: string
  value: string | number
}
type DropDownFormProps = FormControlProps & {
  control: any
  label: string
  name: string
  options: MenuItemOption[]
  className?: string
}
function DropDownForm({
  control,
  label,
  name,
  options,
  className,
  ...rest
}: DropDownFormProps) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control })

  return (
    <FormControl
      {...rest}
      error={Boolean(error)}
      className={`w-full ${className}`}
    >
      <InputLabel color='secondary' size='small' id={`${name}-label`}>
        {label}
      </InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        value={value}
        onChange={onChange}
        label={label}
        size='small'
        color='secondary'
      >
        {options.map(({ label, value }: MenuItemOption) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

DropDownForm.defaultProps = {
  className: undefined,
}
export default DropDownForm
