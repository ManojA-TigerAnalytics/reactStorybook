import { Button, Container } from '@mui/material'
import AutoCompleteCheckBox from 'app/components/recommender/AutoCompleteCheckBox'
import DatepickerForm from 'app/components/recommender/DatepickerForm'
import DropDownForm from 'app/components/recommender/DropDownForm'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useAppSelector } from 'app/hooks/store-hooks'

type ConfigurationFilterFormValues = {
  startDate: Date
  channelFilter: Option[]
  promoDuration: string
}
type Option = {
  id: string
  label: string
}
const PromoDurationList = [
  {
    label: 'test',
    value: 'value',
  },
  {
    label: 'test2',
    value: 'value2',
  },
]
function PromoConfiguration() {
  const { promoChannel } = useAppSelector((state) => state.recommender)
  const [promoChannelList, setPromoChannelList] = useState<Option[]>([])

  useEffect(() => {
    const reMapPromoChannel = promoChannel.map(
      ({ promo_id: promoId, promo_name: promoName }) => ({
        id: promoId.toString(),
        label: promoName,
      })
    )
    setPromoChannelList(reMapPromoChannel)
  }, [promoChannel])
  const { handleSubmit, control, reset } =
    useForm<ConfigurationFilterFormValues>({
      defaultValues: {
        startDate: new Date(),
        channelFilter: [],
        promoDuration: '',
      },
    })
  const onReset = () => {
    reset()
  }
  const onFilterSubmit = (data: ConfigurationFilterFormValues) => {
    // eslint-disable-next-line no-console
    console.log(data)
  }
  const onObjectiveFormSubmit = (data: ConfigurationFilterFormValues) => {
    // eslint-disable-next-line no-console
    console.log(data)
  }
  return (
    <Container maxWidth='xl' className='px-10 py-4'>
      <form
        onSubmit={handleSubmit(onFilterSubmit)}
        color='primary'
        className='grid grid-cols-8 gap-4 my-4'
      >
        <DatepickerForm control={control} name='startDate' label='Start Date' />
        <AutoCompleteCheckBox
          control={control}
          label='Promo channel'
          name='channelFilter'
          options={promoChannelList}
        />
        <DropDownForm
          control={control}
          label='Promo Duration'
          name='promoDuration'
          options={PromoDurationList}
        />
        <Button
          size='small'
          variant='contained'
          color='secondary'
          type='submit'
        >
          submit
        </Button>
        <Button
          size='small'
          variant='contained'
          color='secondary'
          onClick={onReset}
        >
          reset
        </Button>
      </form>

      <form
        onSubmit={handleSubmit(onObjectiveFormSubmit)}
        color='primary'
        className='grid grid-cols-8 gap-4 '
      >
        <DropDownForm
          control={control}
          label='Promo Duration'
          name='promoDuration'
          options={PromoDurationList}
        />
      </form>
    </Container>
  )
}

export default PromoConfiguration
