/* eslint-disable camelcase */
import AutoCompleteCheckBox from 'app/components/recommender/AutoCompleteCheckBox'
import DatepickerForm from 'app/components/recommender/DatepickerForm'
import DropDownForm from 'app/components/recommender/DropDownForm'
import { useAppDispatch, useAppSelector } from 'app/hooks/store-hooks'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  AutoCompleteOption,
  ConfigurationFilterFormValues,
  DropDownOption,
  ProductCategoryType,
  ProductItemsParamsType,
  SegmentFilterParamsType,
} from '../recommender.types'
import {
  fetchFilteredSegment,
  fetchOfferDuration,
  fetchProductCategory,
  fetchProductItems,
  fetchPromoMechanic,
  fetchPromoObjective,
  fetchPromoRecommenderChannel,
} from '../actions/recommender.actions'
import SubmitReset from '../SubmitReset'
import { setCurrentPromoIdSelection } from '../slice/recommender.slice'

function ConfigFilter() {
  const dispatch = useAppDispatch()
  const { promoChannel, offerDuration } = useAppSelector(
    (state) => state.recommender
  )
  const validationSchema = yup.object().shape({
    channelFilter: yup
      .array()
      .min(1, 'At least one channel option is required')
      .required(),
  })
  const {
    handleSubmit: filterHandleSubmit,
    control: filterControl,
    reset: filterReset,
  } = useForm<ConfigurationFilterFormValues>({
    defaultValues: {
      startDate: new Date(),
      channelFilter: [],
      promoDuration: '',
    },
    resolver: yupResolver(validationSchema),
  })
  const [promoChannelList, setPromoChannelList] = useState<
    AutoCompleteOption[]
  >([])
  const [promoDurationList, setPromoDurationList] = useState<DropDownOption[]>(
    []
  )
  useEffect(() => {
    dispatch(fetchPromoRecommenderChannel())
    dispatch(fetchOfferDuration())
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
    const reMapPromoDuration = offerDuration.map(
      ({ offer_duration_id: offerDurationId }) => ({
        label: `${offerDurationId} Week`,
        value: `${offerDurationId}`,
      })
    )
    setPromoDurationList(reMapPromoDuration)
  }, [offerDuration])
  const onFilterSubmit = async (data: ConfigurationFilterFormValues) => {
    // eslint-disable-next-line no-console
    console.log(data)
    const segmentfilterParams: SegmentFilterParamsType = {
      promo_id: data.channelFilter.map(({ id }) => id),
    }
    dispatch(
      setCurrentPromoIdSelection(
        data.channelFilter.map(({ id }) => parseInt(id, 10))
      )
    )
    dispatch(fetchFilteredSegment(segmentfilterParams))
    dispatch(fetchPromoObjective(segmentfilterParams))
    dispatch(fetchProductCategory()).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        const productCategoryIdList: ProductItemsParamsType = {
          category_id: response.payload.map(
            ({ category_id }: ProductCategoryType) => category_id
          ),
        }
        dispatch(fetchProductItems(productCategoryIdList))
      }
    })

    dispatch(fetchPromoMechanic())
  }
  const onFilterReset = () => {
    filterReset()
  }
  return (
    <form
      onSubmit={filterHandleSubmit(onFilterSubmit)}
      color='primary'
      className='grid grid-cols-8 gap-4 '
    >
      <DatepickerForm
        control={filterControl}
        name='startDate'
        label='Start Date'
        className='col-start-3'
      />
      <AutoCompleteCheckBox
        control={filterControl}
        label='Promo channel'
        name='channelFilter'
        options={promoChannelList}
      />
      <DropDownForm
        control={filterControl}
        label='Promo Duration'
        name='promoDuration'
        options={promoDurationList}
      />
      <SubmitReset
        submitButtonText='filter'
        resetButtonText='reset'
        onReset={onFilterReset}
        className='col-span-2'
      />
    </form>
  )
}

export default ConfigFilter
