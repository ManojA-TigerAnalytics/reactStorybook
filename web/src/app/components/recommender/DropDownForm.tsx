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
  defaultValue?: string | number
  disabledOptions?: string[]
}
function DropDownForm({
  control,
  label,
  name,
  options,
  className,
  defaultValue,
  disabledOptions = [],
  ...rest
}: DropDownFormProps) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control, defaultValue })

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
          <MenuItem
            key={value}
            value={value}
            disabled={disabledOptions.includes(value.toString())}
          >
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

DropDownForm.defaultProps = {
  className: '',
  defaultValue: '',
  disabledOptions: [],
}

export default DropDownForm
