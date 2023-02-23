/* eslint-disable camelcase */
import {
  Container,
  Typography,
  Tooltip,
  Chip,
  ChipProps,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks/store-hooks";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { fetchFilteredRecommendation } from "./actions/recommender.actions";
import RecommenderFilter from "./RecommenderFilter";

function getChipProps(params: GridRenderCellParams): ChipProps {
  if (params.value === "Saved") {
    return {
      label: params.value,
      color: "success",
    };
  }
  if (params.value === "Submitted") {
    return {
      label: params.value,
      color: "info",
    };
  }
  if (params.value === "Failed") {
    return {
      label: params.value,
      color: "error",
    };
  }
  if (params.value === "Completed Partial") {
    return {
      label: params.value,
      color: "warning",
    };
  }
  return {
    label: params.value,
  };
}
const columns: GridColDef[] = [
  { field: "offerPackageId", headerName: "Package ID", flex: 0.5 },
  { field: "offerPackageName", headerName: "Package Name", flex: 1 },
  { field: "promoName", headerName: "Promo Channel", flex: 0.5 },
  {
    field: "segmentList",
    headerName: "Segments",
    flex: 1,
    renderCell: (params: GridCellParams) => {
      const segment = params.row.segmentList[0];
      const hiddenSegmentList = params.row.segmentList.slice(1);
      return (
        <Tooltip
          title={
            hiddenSegmentList.length > 0 ? (
              <ul className="list-disc">
                {hiddenSegmentList.map((segment: Segment) => (
                  <li key={segment.segment_id}>{segment.segment_name}</li>
                ))}
              </ul>
            ) : (
              ""
            )
          }
          placement="right"
        >
          <span className="cursor-pointer">
            {segment.segment_name}
            {hiddenSegmentList.length > 0 && ` (+${hiddenSegmentList.length})`}
          </span>
        </Tooltip>
      );
    },
  },
  {
    field: "startDate",
    headerName: "Start Date",
    flex: 0.5,
    valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
  },
  {
    field: "statusName",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => <Chip size="small" {...getChipProps(params)} />,
  },
  { field: "createdBy", headerName: "Created By", flex: 1 },
  {
    field: "modifiedAt",
    headerName: "Last Updated",
    flex: 0.5,
    valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
  },
];

type Segment = {
  segment_config_id: number;
  segment_id: number;
  offer_config_id: number;
  promo_id: number;
  maximize: number;
  segment_name: string;
  promo_name: string;
};
type RecommendationTableData = {
  offerPackageId: string;
  offerPackageName: string;
  promoName: string;
  segmentList: Segment[];
  startDate: string;
  statusName: string;
  createdBy: string;
  modifiedAt: string;
};

export default function DataGridDemo() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState("1");
  const [recommendation, setRecommendation] = useState<
    RecommendationTableData[]
  >([]);

  const {
    recommendationList: {
      data: recommendationData,
      count: totalRecommendationCount,
    },
  } = useAppSelector((state) => state.recommender);

  useEffect(() => {
    dispatch(fetchFilteredRecommendation({ page: pageNo, page_size: "7" }));
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
        promoName:
          promo.length > 1
            ? promo[0].promo_name
            : promo.map(({ promo_name: name }) => name).join(" "),
        segmentList: segments,
        startDate,
        statusName,
        createdBy,
        modifiedAt,
      })
    );
    setRecommendation(reRecommendationData);
  }, [recommendationData]);

  return (
    <Container maxWidth="xl" className="px-10 py-4">
      <Box className="flex justify-between py-4">
        <Typography variant="h6">Promo Recommender Summary</Typography>
        <Button
          onClick={() => navigate("/recommender/configuration")}
          variant="contained"
          color="secondary"
        >
          + Configure Promo
        </Button>
      </Box>
      <RecommenderFilter page={pageNo} pageSize="7" />
      <Box sx={{ height: 500, width: "100%" }} className="mt-7">
        <DataGrid
          rows={recommendation}
          columns={columns}
          pageSize={7}
          onPageChange={(newPage) => setPageNo(`${newPage + 1}`)}
          rowsPerPageOptions={[totalRecommendationCount]}
          disableSelectionOnClick
          getRowId={(row) => row.offerPackageId}
        />
      </Box>
    </Container>
  );
}
