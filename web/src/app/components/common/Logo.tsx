import { Box } from '@mui/material'
import { useAppSelector } from 'app/hooks/store-hooks'
import { useNavigate } from 'react-router-dom'

type LogoProps = {
  className?: string
  navigateTo?: string
}

function Logo({ className, navigateTo }: LogoProps) {
  const logoPath = useAppSelector((state) => state.theme.logoPath)
  const navigate = useNavigate()
  return (
    <Box
      className={className}
      component='img'
      src={process.env.PUBLIC_URL + logoPath}
      alt='Logo'
      onClick={navigateTo ? () => navigate(navigateTo) : undefined}
    />
  )
}

Logo.defaultProps = {
  className: undefined,
  navigateTo: undefined,
}

export default Logo
