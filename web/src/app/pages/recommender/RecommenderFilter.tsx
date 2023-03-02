/* eslint-disable camelcase */
import AutoCompleteCheckBox from 'app/components/recommender/AutoCompleteCheckBox'
import DatepickerForm from 'app/components/recommender/DatepickerForm'
import TextFieldForm from 'app/components/recommender/TextFieldForm'
import { useAppDispatch, useAppSelector } from 'app/hooks/store-hooks'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Paper, styled } from '@mui/material'
import { globalConstants } from 'app/constants/constant'
import {
  fetchFilteredRecommendation,
  fetchPromoRecommenderChannel,
  fetchPromoSegment,
  fetchPromoStatus,
} from './actions/recommender.actions'
import SubmitReset from '../../components/common/SubmitReset'

// const PaperCard = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
//   height: 60,
//   lineHeight: '60px',
// }))
type Option = {
  id: string
  label: string
}
type FormValues = {
  channelFilter: Option[]
  segmentFilter: Option[]
  statusFilter: Option[]
  packageId: string
  packageName: string
  createdBy: string
  startDate: Date
}

type RecommenderFilterProps = {
  page: string
  pageSize: string
}

function RecommenderFilter({ page, pageSize }: RecommenderFilterProps) {
  const dispatch = useAppDispatch()
  const { promoChannel, segment, statusType } = useAppSelector(
    (state) => state.recommender
  )
  const [promoChannelList, setPromoChannelList] = useState<Option[]>([])
  const [segmentList, setSegmentList] = useState<Option[]>([])
  const [statusList, setStatusList] = useState<Option[]>([])
  useEffect(() => {
    dispatch(fetchPromoRecommenderChannel())
    dispatch(fetchPromoSegment())
    dispatch(fetchPromoStatus())
  }, [])
  useEffect(() => {
    const reMapPromoChannel = promoChannel.map(
      ({ promo_id: promoId, promo_name: promoName }) => ({
        id: promoId.toString(),
        label: promoName,
      })
    )
    setPromoChannelList(reMapPromoChannel)
  }, [promoChannel])

  useEffect(() => {
    const reMapSegment = segment.map(
      ({ segment_id: segmentId, segment_name: segmentName }) => ({
        id: segmentId.toString(),
        label: segmentName,
      })
    )
    setSegmentList(reMapSegment)
  }, [segment])

  useEffect(() => {
    const reMapStatusType = statusType.map(
      ({ id: statusId, status_name: statusName }) => ({
        id: statusId.toString(),
        label: statusName,
      })
    )
    setStatusList(reMapStatusType)
  }, [statusType])

  const onSubmit = (data: FormValues) => {
    // eslint-disable-next-line no-console
    // console.log(data)
    const queryParams = {
      page,
      page_size: pageSize,
      offer_package_id: data.packageId,
      offer_package_name: data.packageName,
      created_by: data.createdBy,
      promo_id: data.channelFilter.map(({ id }) => id),
      segment_id: data.segmentFilter.map(({ id }) => id),
      status_name: data.statusFilter.map(({ id }) => id),
      offer_start_date: dayjs(data.startDate).format('DD-MM-YYYY'),
    }
    dispatch(fetchFilteredRecommendation(queryParams))
  }
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      channelFilter: [],
      segmentFilter: [],
      statusFilter: [],
      packageId: '',
      packageName: '',
      createdBy: '',
      startDate: new Date(),
    },
  })
  const onReset = () => {
    reset()
  }
  return (
    <Paper className='p-5' elevation={globalConstants.defaultPaperElevation}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid grid-cols-8 gap-4 content-center'
        color='primary'
      >
        <TextFieldForm control={control} name='packageId' label='Package Id' />
        <TextFieldForm
          control={control}
          name='packageName'
          label='Package Name'
        />

        <AutoCompleteCheckBox
          control={control}
          label='Promo channel'
          name='channelFilter'
          options={promoChannelList}
        />

        <AutoCompleteCheckBox
          control={control}
          label='Segment'
          name='segmentFilter'
          options={segmentList}
        />

        <DatepickerForm control={control} label='Start Date' name='startDate' />

        <TextFieldForm control={control} name='createdBy' label='Created By' />
        <AutoCompleteCheckBox
          control={control}
          label='Status'
          name='statusFilter'
          options={statusList}
        />
        {/* <div>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          size="small"
          className="m-2"
        >
          Filter
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={onReset}
          size="small"
          className="m-2"
        >
          Reset
        </Button>
      </div> */}
        <SubmitReset
          submitButtonText='submit'
          resetButtonText='reset'
          onReset={onReset}
          className='grid grid-cols-2'
        />
      </form>
    </Paper>
  )
}

export default RecommenderFilter
