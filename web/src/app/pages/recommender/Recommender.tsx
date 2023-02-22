/* eslint-disable camelcase */
import { Container, Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import AutoCompleteCheckBox from "app/components/recommender/AutoCompleteCheckBox";
import TextFieldForm from "app/components/recommender/TextFieldForm";
import DatepickerForm from "app/components/recommender/DatepickerForm";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks/store-hooks";
import {
  fetchFilteredRecommendation,
  fetchPromoRecommenderChannel,
  fetchPromoSegment,
  fetchPromoStatus,
} from "./actions/recommender.actions";

const columns: GridColDef[] = [
  { field: "offerPackageId", headerName: "Package ID", flex: 0.5 },
  { field: "offerPackageName", headerName: "Package Name", flex: 1 },
  { field: "promoName", headerName: "Promo Channel", flex: 1 },
  { field: "segmentSegmentName", headerName: "Segments", flex: 1 },
  { field: "startDate", headerName: "Start Date", flex: 1 },
  { field: "statusName", headerName: "Status", flex: 1 },
  { field: "createdBy", headerName: "Created By", flex: 1 },
  { field: "modifiedAt", headerName: "Last Updated", flex: 1 },
];

// const rows = [
//   {
//     offerPackageId: '1',
//     offerPackageName: 'package name',
//     promoName: 'promo name',
//     segmentSegmentName: 'segment name',
//     startDate: 'start Date',
//     statusName: 'status name',
//     createdBy: 'created by',
//     modifiedAt: 'updated at',
//   },
// ]

type RecommendationTableData = {
  offerPackageId: string;
  offerPackageName: string;
  promoName: string;
  segmentSegmentName: string;
  startDate: string;
  statusName: string;
  createdBy: string;
  modifiedAt: string;
};

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

export default function DataGridDemo() {
  const dispatch = useAppDispatch();
  const [promoChannelList, setPromoChannelList] = useState<Option[]>([]);
  const [segmentList, setSegmentList] = useState<Option[]>([]);
  const [statusList, setStatusList] = useState<Option[]>([]);
  const [recommendation, setRecommendation] = useState<
    RecommendationTableData[]
  >([]);
  const {
    promoChannel,
    segment,
    statusType,
    recommendationList: {
      data: recommendationData,
      // count: totalRecommendationCount,
    },
  } = useAppSelector((state) => state.recommender);

  useEffect(() => {
    dispatch(fetchFilteredRecommendation());
    dispatch(fetchPromoRecommenderChannel());
    dispatch(fetchPromoSegment());
    dispatch(fetchPromoStatus());
  }, []);

  useEffect(() => {
    const reRecommendationData = recommendationData.map(
      ({
        offer_package_id: offerPackageId,
        offer_package_name: offerPackageName,
        promo_name: promo,
        segments,
        start_date: startDate,
        status_name: statusName,
        created_by: createdBy,
        modified_at: modifiedAt,
      }) => ({
        offerPackageId,
        offerPackageName,
        promoName: promo[0].promo_name,
        segmentSegmentName: segments[0].segment_name,
        startDate,
        statusName,
        createdBy,
        modifiedAt,
      })
    );
    setRecommendation(reRecommendationData);
  }, [recommendationData]);
  useEffect(() => {
    const reMapPromoChannel = promoChannel.map(
      ({ promo_id: promoId, promo_name: promoName }) => ({
        id: promoId.toString(),
        label: promoName,
      })
    );
    setPromoChannelList(reMapPromoChannel);
  }, [promoChannel]);

  useEffect(() => {
    const reMapSegment = segment.map(
      ({ segment_id: segmentId, segment_name: segmentName }) => ({
        id: segmentId.toString(),
        label: segmentName,
      })
    );
    setSegmentList(reMapSegment);
  }, [segment]);

  useEffect(() => {
    const reMapStatusType = statusType.map(
      ({ id: statusId, status_name: statusName }) => ({
        id: statusId.toString(),
        label: statusName,
      })
    );
    setStatusList(reMapStatusType);
  }, [statusType]);

  const onSubmit = (data: FormValues) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      channelFilter: [],
      segmentFilter: [],
      statusFilter: [],
      packageId: "",
      packageName: "",
      createdBy: "",
      startDate: new Date(),
    },
  });
  const onReset = () => {
    reset();
  };
  return (
    <Container maxWidth="xl" className="px-10 py-4">
      <Typography variant="h6">Promo Recommender Summary</Typography>
      {/* <Typography variant='body2'>Filter By</Typography> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row space-x-4 items-center "
        color="primary"
      >
        <TextFieldForm control={control} name="packageId" label="Package Id" />
        <TextFieldForm
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

        <TextFieldForm control={control} name="createdBy" label="Created By" />
        <AutoCompleteCheckBox
          control={control}
          label="Status"
          name="statusFilter"
          options={statusList}
        />

        <Button
          variant="contained"
          color="secondary"
          type="submit"
          size="small"
        >
          Filter
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={onReset}
          size="small"
        >
          Reset
        </Button>
      </form>
      <Box sx={{ height: 500, width: "100%" }} className="mt-7">
        <DataGrid
          rows={recommendation}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
          disableSelectionOnClick
          // experimentalFeatures={{ newEditingApi: true }}
          getRowId={(row) => row.offerPackageId}
        />
      </Box>
    </Container>
  );
}
