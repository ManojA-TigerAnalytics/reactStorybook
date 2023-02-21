import { Container, Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import AutoCompleteCheckBox from "app/components/recommender/AutoCompleteCheckBox";
import TextFieldHookForm from "app/components/recommender/TextFieldForm";
import DatepickerForm from "app/components/recommender/DatepickerForm";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
type Option = {
  id: string;
  label: string;
};
type FormValues = {
  channelFilter: Option[];
  segmentFilter: Option[];
  statusFilter: Option[];
  packageId: string;
  packageName: string;
  createdBy: string;
  startDate: Date;
};
const promoChannelList: Option[] = [
  { id: "1", label: "Online" },
  { id: "2", label: "Offline" },
];
const statusList = [
  { id: "1", label: "Saved" },
  { id: "2", label: "Completed" },
  { id: "3", label: "Submitted" },
  { id: "4", label: "Failed" },
];
const segmentList = [
  { id: "1", label: "Mass Online" },
  { id: "2", label: "Pre-registration" },
  { id: "3", label: "Offline" },
  { id: "4", label: "Active Low Frequency" },
];

export default function DataGridDemo() {
  const onSubmit = (data: FormValues) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      channelFilter: [],
      segmentFilter: [
        { id: "1", label: "Mass Online" },
        { id: "2", label: "Pre-registration" },
        { id: "3", label: "Offline" },
        { id: "4", label: "Active Low Frequency" },
      ],
      statusFilter: [],
      packageId: "",
      packageName: "",
      createdBy: "",
      startDate: new Date(),
    },
  });
  return (
    <Container maxWidth="xl" className="mt-6">
      <Typography>Filter By</Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row space-x-4 items-center p-4"
        color="primary"
      >
        <TextFieldHookForm
          control={control}
          name="packageId"
          label="Package Id"
        />
        <TextFieldHookForm
          control={control}
          name="packageName"
          label="Package Name"
        />

        <AutoCompleteCheckBox
          control={control}
          label="Promo channel"
          name="channelFilter"
          options={promoChannelList}
        />

        <AutoCompleteCheckBox
          control={control}
          label="Segment"
          name="segmentFilter"
          options={segmentList}
        />

        <DatepickerForm control={control} label="Start Date" name="startDate" />

        <TextFieldHookForm
          control={control}
          name="createdBy"
          label="Created By"
        />
        <AutoCompleteCheckBox
          control={control}
          label="Status"
          name="statusFilter"
          options={statusList}
        />

        <Button variant="contained" color="secondary" type="submit">
          Filter
        </Button>
      </form>
      <Box sx={{ height: 525, width: "100%" }} className="p-10">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Container>
  );
}
