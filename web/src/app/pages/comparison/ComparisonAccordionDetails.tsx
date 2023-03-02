import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ComparisonAccordionScenarioDetails from './ComparisonAccordionScenarioDetails'

function ComparisonAccordionDetails() {
  return (
    <div>
      <Accordion expanded>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography>Scenario</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ComparisonAccordionScenarioDetails />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default ComparisonAccordionDetails
