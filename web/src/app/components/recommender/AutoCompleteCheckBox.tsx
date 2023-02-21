import {
  Autocomplete,
  Checkbox,
  Chip,
  FormControlLabel,
  TextField,
  TextFieldProps,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

type Option = {
  id: string;
  label: string;
};

type AutoCompleteCheckBoxProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: PathValue<T, Path<T>>;
  options: Option[];
  label: string;
  textFieldProps?: TextFieldProps;
};

function AutoCompleteCheckBox<T extends FieldValues>({
  control,
  name,
  options,
  defaultValue,
  label,
  textFieldProps = {},
}: AutoCompleteCheckBoxProps<T>) {
  const { ...rest } = textFieldProps;
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          ListboxProps={{ style: { maxHeight: 150 } }}
          className="w-full"
          // limitTags={1}
          multiple
          options={options}
          disableCloseOnSelect
          getOptionLabel={(option) => option.label}
          onChange={(_, value) => onChange(value)}
          value={value}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderTags={(value, getTagProps) => {
            const numTags = value.length;
            const limitTags = 1;

            return (
              <>
                {value.slice(0, limitTags).map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option.label}
                    label={option.label}
                  />
                ))}

                {numTags > limitTags && ` +${numTags - limitTags}`}
              </>
            );
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    color="secondary"
                    checked={selected}
                  />
                }
                label={option.label}
              />
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              color="secondary"
              label={label}
              placeholder={`Select ${label}`}
              variant="outlined"
              size="small"
              error={!!error}
              helperText={error?.message}
              {...rest}
            />
          )}
        />
      )}
    />
  );
}

AutoCompleteCheckBox.defaultProps = {
  defaultValue: undefined,
  textFieldProps: undefined,
};

export default AutoCompleteCheckBox;
