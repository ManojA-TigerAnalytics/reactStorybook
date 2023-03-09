import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Button,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useNavigate } from 'react-router-dom'
import { comparisonAccordionHeaderMock } from './comparisonMock'
import ComparisonAccordionDetails from './ComparisonAccordionDetails'

function ComparisonAcordion() {
  const navigate = useNavigate()
  return (
    <div>
      {comparisonAccordionHeaderMock.data.map((scenario) => (
        <Accordion key={scenario.start_date}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography>
              Duration = {scenario.offer_duration} , Date Range =
              {scenario.start_date} - {scenario.start_date} (
              {scenario.scenarios_count} Scenarios)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Scenario</Typography>
            <ComparisonAccordionDetails />
          </AccordionDetails>
        </Accordion>
      ))}

      <Button
        onClick={() => navigate('/comparison/details')}
        variant='contained'
        color='secondary'
      >
        Compare
      </Button>
    </div>
  )
}

export default ComparisonAcordion
