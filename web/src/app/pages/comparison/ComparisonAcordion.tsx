import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { comparisonAccordionHeaderMock } from './comparisonMock'
import ComparisonAccordionDetails from './ComparisonAccordionDetails'

function ComparisonAcordion() {
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
            <ComparisonAccordionDetails />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

export default ComparisonAcordion
