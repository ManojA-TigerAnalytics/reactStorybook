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
    <div className='grid grid-cols-2 gap-4'>
      <Typography className='col-span-2'>Promo</Typography>
      <DropDownForm
        control={control}
        label='Promo one'
        name='promoDuration'
        options={options}
      />

      <SliderForm
        control={control}
        name='promoDepth'
        label='Promo Depth'
        max={50}
        min={10}
      />
      <SliderForm
        control={control}
        name='promoDepth'
        label='Promo Depth'
        max={50}
        min={10}
      />
      <Divider className='col-span-2' />
    </div>
  )
}

export default PromoSelection
