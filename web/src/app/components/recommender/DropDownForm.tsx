import {
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material'
import { Control, useController } from 'react-hook-form'

type MenuItemOption = {
  label: string
  value: string | number
}
type DropDownFormProps<T extends FormControlProps> = {
  control: Control<T>
  label: string
  name: string
  options: MenuItemOption[]
}
// type DropDownFormProps = SelectProps & {
//   control: any
//   label: string
//   name: string
//   options: MenuItemOption[]
// }
function DropDownForm<T extends FormControlProps>({
  control,
  label,
  name,
  options,
  ...rest
}: DropDownFormProps<T>) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control })

  return (
    <FormControl {...rest} error={Boolean(error)}>
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
        {...rest}
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
export default DropDownForm
