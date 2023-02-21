import { TextField, TextFieldProps } from "@mui/material";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import * as yup from "yup";

type TextFieldFormProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  defaultValue?: PathValue<T, Path<T>>;
  rules?: yup.SchemaOf<string>;
  disabled?: boolean;
  textFieldProps?: TextFieldProps;
};

function TextFieldForm<T extends FieldValues>({
  control,
  name,
  label,
  defaultValue,
  rules,
  disabled = false,
  textFieldProps = {},
}: TextFieldFormProps<T>) {
  const { ...rest } = textFieldProps;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={
        rules ? { validate: (value: string) => rules.validateSync(value) } : {}
      }
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <TextField
          label={label}
          className="w-full"
          color="secondary"
          variant="outlined"
          size="small"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          error={!!error}
          helperText={error ? error.message : undefined}
          disabled={disabled}
          inputRef={ref}
          {...rest}
        />
      )}
    />
  );
}

TextFieldForm.defaultProps = {
  defaultValue: undefined,
  rules: undefined,
  disabled: undefined,
  textFieldProps: undefined,
};
export default TextFieldForm;
