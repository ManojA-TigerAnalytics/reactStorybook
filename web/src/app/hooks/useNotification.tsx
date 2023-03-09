import { SnackbarKey, VariantType, useSnackbar } from 'notistack'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

type EnqSnackBar = { message: string; variant: VariantType | undefined }

function useNotification() {
  const [notificationConf, setNotificationConf] = useState<EnqSnackBar>({
    message: '',
    variant: 'info',
  })
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const action = (key: SnackbarKey | undefined) => (
    <IconButton
      onClick={() => {
        closeSnackbar(key)
      }}
    >
      <CloseIcon />
    </IconButton>
  )
  useEffect(() => {
    if (notificationConf?.message) {
      enqueueSnackbar(notificationConf.message, {
        key: uuid(),
        variant: notificationConf.variant,
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        action,
      })
    }
  }, [notificationConf])

  const sendNotification = (configuration: EnqSnackBar) => {
    setNotificationConf(configuration)
  }
  return { sendNotification }
}

export default useNotification
