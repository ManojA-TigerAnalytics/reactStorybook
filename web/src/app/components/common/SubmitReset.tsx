import { Button } from '@mui/material'

type SubmitResetProps = {
  submitButtonText: string
  resetButtonText: string
  onReset: () => void
  className?: string
}
function SubmitReset({
  submitButtonText,
  resetButtonText,
  onReset,
  className,
}: SubmitResetProps) {
  return (
    <div className={className}>
      <Button
        size='small'
        variant='contained'
        color='secondary'
        type='submit'
        className='m-2'
      >
        {submitButtonText}
      </Button>
      <Button
        size='small'
        variant='contained'
        color='secondary'
        onClick={onReset}
        className='m-2'
      >
        {resetButtonText}
      </Button>
    </div>
  )
}

SubmitReset.defaultProps = {
  className: '',
}

export default SubmitReset
