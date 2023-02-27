/* eslint-disable camelcase */
import { Container, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useAppSelector } from 'app/hooks/store-hooks'
import RadioCheckBoxForm from 'app/components/recommender/RadioCheckBoxForm'
import {
  CheckBoxRadioOption,
  ConfigurationFilterFormValues,
  PromoConfigurationFormValues,
} from '../recommender.types'
import ConfigFilter from './ConfigFilter'
import ObjectiveSelection from './ObjectiveSelection'
import ProductSelection from './ProductSelection'
import PromoSelection from './PromoSelection'
import SubmitReset from '../SubmitReset'

function PromoConfiguration() {
  const { filteredSegment } = useAppSelector((state) => state.recommender)

  const [selectSegmentList, setSelectSegmentList] = useState<
    CheckBoxRadioOption[]
  >([])

  useEffect(() => {
    const reMapFilteredSegment = filteredSegment.map(
      ({ segment_name: segmentName, segment_id: segmentId }) => ({
        label: segmentName,
        value: segmentId.toString(),
      })
    )
    setSelectSegmentList(reMapFilteredSegment)
  }, [filteredSegment])

  const {
    handleSubmit: promoConfigHandleSubmit,
    control: promoConfigControl,
    reset: promoConfigReset,
  } = useForm<PromoConfigurationFormValues>({
    defaultValues: {
      startDate: new Date(),
      channelFilter: [],
      promoDuration: '',
      promoDepth: 10,
      selectedSegment: '',
    },
  })

  const onPromoConfigReset = () => {
    promoConfigReset()
  }

  const onObjectiveFormSubmit = (data: ConfigurationFilterFormValues) => {
    // eslint-disable-next-line no-console
    console.log(data)
  }
  const mockList = [
    {
      label: 'label one',
      value: 'value one',
    },
  ]
  return (
    <Container maxWidth='xl' className='px-10 py-4'>
      <div className='grid grid-cols-2 gap-4 '>
        <div className='col-span-2 my-4'>
          <ConfigFilter />
        </div>
        <div className='col-span-2 my-4'>
          <form
            onSubmit={promoConfigHandleSubmit(onObjectiveFormSubmit)}
            color='primary'
            className='space-y-3'
          >
            <div className='grid grid-cols-4 gap-4 '>
              <div className=' bg-gray-200 dark:bg-transparent'>
                <Typography>Segment *</Typography>
                <RadioCheckBoxForm
                  control={promoConfigControl}
                  name='selectedSegment'
                  options={selectSegmentList}
                />
              </div>
              <div className='col-span-3 mt-5'>
                <ObjectiveSelection
                  control={promoConfigControl}
                  options={mockList}
                />
                <ProductSelection
                  control={promoConfigControl}
                  options={mockList}
                />
                <PromoSelection
                  control={promoConfigControl}
                  options={mockList}
                />
                <SubmitReset
                  submitButtonText='submit'
                  resetButtonText='reset'
                  onReset={onPromoConfigReset}
                  className='col-span-2 '
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}

export default PromoConfiguration
