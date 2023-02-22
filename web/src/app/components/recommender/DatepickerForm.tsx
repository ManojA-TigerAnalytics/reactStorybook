import { TextField, TextFieldProps } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import * as yup from "yup";

type DatepickerFormProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  defaultValue?: PathValue<T, Path<T>>;
  rules?: yup.SchemaOf<string>;
  disabled?: boolean;
  textFieldProps?: TextFieldProps;
};

function DatepickerForm<T extends FieldValues>({
  control,
  name,
  label,
  defaultValue,
  rules,
  disabled = false,
  textFieldProps = {},
}: DatepickerFormProps<T>) {
  const { ...rest } = textFieldProps;
  const [open, setOpen] = useState(false);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={
          rules
            ? { validate: (value: string) => rules.validateSync(value) }
            : {}
        }
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePicker
            label={label}
            value={value}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onChange={onChange}
            className="w-full"
            inputFormat="DD/MM/YYYY"
            views={["year", "month", "day"]}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                color="secondary"
                variant="outlined"
                value={value}
                error={!!error}
                helperText={error ? error.message : undefined}
                disabled={disabled}
                onClick={() => setOpen(true)}
                inputProps={{ ...params.inputProps, readOnly: true }}
                {...rest}
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  );
}

DatepickerForm.defaultProps = {
  defaultValue: undefined,
  rules: undefined,
  disabled: undefined,
  textFieldProps: undefined,
};
export default DatepickerForm;
