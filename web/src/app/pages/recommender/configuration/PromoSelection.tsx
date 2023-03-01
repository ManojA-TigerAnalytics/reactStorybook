import { Divider, Typography } from '@mui/material'
import DropDownForm from 'app/components/recommender/DropDownForm'
import SliderForm from 'app/components/recommender/SliderForm'
import { DropDownOption } from '../recommender.types'

type PromoSelectionProps = {
  control: any
  options: DropDownOption[]
}
function PromoSelection({ control, options }: PromoSelectionProps) {
  return (
    <div className='grid grid-cols-4 gap-4'>
      <Typography className='col-span-4'>Promo</Typography>
      <DropDownForm
        control={control}
        label='Promo one'
        name='promoDuration'
        options={options}
        className='col-span-1'
      />

      <SliderForm
        control={control}
        name='promoDepth'
        label='Promo Depth'
        className='col-start-3'
        valueLabelDisplay='on'
        min={10}
        max={50}
        marks={[
          {
            value: 10,
            label: '10%',
          },

          {
            value: 50,
            label: '50%',
          },
        ]}
      />
      <SliderForm
        className='col-start-1'
        control={control}
        name='promoDepth'
        size='small'
        label='Promo Depth'
        step={null}
        valueLabelDisplay='on'
        min={1}
        max={10}
        marks={[
          {
            value: 1,
            label: '1',
          },
          {
            value: 2,
            label: '2',
          },
          {
            value: 3,
            label: '3',
          },
          {
            value: 4,
            label: '4',
          },

          {
            value: 10,
            label: '10',
          },
        ]}
      />
      <Divider className='col-span-4' />
    </div>
  )
}

export default PromoSelection
