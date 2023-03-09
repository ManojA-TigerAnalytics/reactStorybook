import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ReactElement, ReactNode, SyntheticEvent, useState } from 'react'
import { alpha, styled } from '@mui/material'

const SliderTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: 'transparent',
  },
  '& .MuiTab-root': {
    borderRadius: '24px',
    width: '70px',
    padding: 0,
  },
  '& .Mui-selected': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary.dark, 0.3)
        : theme.palette.primary.main,
    boxShadow: '0px 2px 2px 1px rgba(0, 0, 0, 0.2)',
  },
  '& .MuiTabs-flexContainer': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary.dark, 0.2)
        : alpha(theme.palette.primary.dark, 0.3),
    borderRadius: '24px',
    width: '200px',
    padding: '7px',
  },
  '& .MuiButtonBase-root': {
    minHeight: 0,
    padding: '2px',
  },
}))

interface TabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

TabPanel.defaultProps = {
  children: undefined,
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
type SwitchTabButtonProps = {
  items: { label: string; component: ReactNode; icon: ReactElement }[]
  className?: string
}

function SwitchTabButton({ items, className }: SwitchTabButtonProps) {
  const [value, setValue] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Box className={`p-4 ${className}`}>
        <SliderTabs
          value={value}
          onChange={handleChange}
          variant='standard'
          aria-label='basic tabs example'
          textColor='secondary'
          indicatorColor='secondary'
          centered
        >
          {items.map((item, index) => (
            <Tab
              icon={item.icon}
              iconPosition='start'
              disableRipple
              key={item.label}
              label={
                <Typography variant='button' display='block'>
                  {item.label}
                </Typography>
              }
              {...a11yProps(index)}
            />
          ))}
        </SliderTabs>
      </Box>
      {items.map((item, index) => (
        <TabPanel key={item.label} value={value} index={index}>
          {item.component}
        </TabPanel>
      ))}
    </>
  )
}

SwitchTabButton.defaultProps = {
  className: '',
}

export default SwitchTabButton
