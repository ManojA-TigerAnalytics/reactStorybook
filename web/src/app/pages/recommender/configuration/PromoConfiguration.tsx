/* eslint-disable camelcase */
import { Box, Container, Divider, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useAppSelector } from 'app/hooks/store-hooks'
import RadioCheckBoxForm from 'app/components/recommender/RadioCheckBoxForm'
import {
  CheckBoxRadioOption,
  ConfigurationFilterFormValues,
  DropDownOption,
  PromoConfigurationFormValues,
} from '../recommender.types'
import ConfigFilter from './ConfigFilter'
import ObjectiveSelection from './ObjectiveSelection'
import ProductSelection from './ProductSelection'
import PromoSelection from './PromoSelection'
import SubmitReset from '../SubmitReset'

function PromoConfiguration() {
  const {
    filteredSegment,
    promoObjective,
    current,
    productCategory,
    productItems,
  } = useAppSelector((state) => state.recommender)
  const [selectSegmentList, setSelectSegmentList] = useState<
    CheckBoxRadioOption[]
  >([])
  const [objectiveList, setObjectiveList] = useState<DropDownOption[]>([])

  useEffect(() => {
    const reMapFilteredSegment = filteredSegment.map(
      ({
        segment_name: segmentName,
        segment_id: segmentId,
        user_count: userCount,
      }) => ({
        label: `${segmentName} (${userCount ?? 0})`,
        value: segmentId.toString(),
      })
    )
    setSelectSegmentList(reMapFilteredSegment)
  }, [filteredSegment])

  useEffect(() => {
    const reMapPromoObjective = promoObjective
      .filter(({ promo_id: promoId }) => current.promoId.includes(promoId))
      .map(({ objective_id: objectiveId, objective_name: objectiveName }) => ({
        label: objectiveName,
        value: objectiveId.toString(),
      }))
    setObjectiveList(reMapPromoObjective)
  }, [promoObjective])

  const {
    handleSubmit: promoConfigHandleSubmit,
    control: promoConfigControl,
    reset: promoConfigReset,
  } = useForm<PromoConfigurationFormValues>({
    // clean this
    defaultValues: {
      startDate: new Date(),
      channelFilter: [],
      promoDuration: '',
      promoDepth: [5, 7],
      selectedSegment: '',
      applyObjectiveTo: '',
      maximizeObjective: '',
      lowerBoundObjectives: [{ lowerBoundObjective: '', percentage: 0 }],
      productCategory: [],
      productItem: [],
      maxPromos: [{ maxPromosCategory: '', maxPromosCount: '' }],
    },
  })

  const onPromoConfigReset = () => {
    promoConfigReset()
  }

  const onObjectiveFormSubmit = (data: ConfigurationFilterFormValues) => {
    // eslint-disable-next-line no-console
    console.log(data)
  }
  const dropDownMockList = [
    {
      label: 'label one',
      value: 'value one',
    },
  ]
  // const autocompleteMockList = [
  //   {
  //     label: 'label one',
  //     id: 'value one',
  //   },
  // ]

  return (
    <Container maxWidth='xl' className='px-10 py-4'>
      <div className='grid grid-cols-2 gap-4 '>
        <div className='col-span-2 mt-2'>
          <ConfigFilter />
        </div>
        <Divider className='col-span-2' />
        <Box sx={{ border: 1 }} className='col-span-2 '>
          <form
            onSubmit={promoConfigHandleSubmit(onObjectiveFormSubmit)}
            color='primary'
            className='space-y-2'
          >
            <div className='grid grid-cols-4 gap-4'>
              <Box
                sx={{ backgroundColor: 'secondary' }}
                className='bg-gray-100 p-5'
              >
                <Typography>Segment *</Typography>
                <RadioCheckBoxForm
                  control={promoConfigControl}
                  name='selectedSegment'
                  options={selectSegmentList}
                />
              </Box>
              <div className='col-span-3 mt-2 p-5'>
                <ObjectiveSelection
                  control={promoConfigControl}
                  options={objectiveList}
                />
                <ProductSelection
                  control={promoConfigControl}
                  category={productCategory}
                  items={productItems}
                />
                <PromoSelection
                  control={promoConfigControl}
                  options={dropDownMockList}
                />
                <SubmitReset
                  submitButtonText='preview'
                  resetButtonText='reset'
                  onReset={onPromoConfigReset}
                  className=''
                />
              </div>
            </div>
          </form>
        </Box>
      </div>
    </Container>
  )
}

export default PromoConfiguration
