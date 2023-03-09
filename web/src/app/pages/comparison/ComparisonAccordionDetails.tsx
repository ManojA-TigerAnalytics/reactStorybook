import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ComparisonAccordionScenarioDetails from './ComparisonAccordionScenarioDetails'

function ComparisonAccordionDetails() {
  return (
    <div>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox color='secondary' defaultChecked />}
              label='SM_TEST_MASS_ONLINE_ACTIVE_HF_GC_madhuri gollakota_2023-03-01 04:50 (Promos: 28)'
            />
          </FormGroup>
        </AccordionSummary>
        <AccordionDetails>
          <ComparisonAccordionScenarioDetails />
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox color='secondary' defaultChecked />}
              label='SM_TEST_MASS_ONLINE_ACTIVE_HF_GC_madhuri gollakota_2023-03-01 04:50 (Promos: 28)'
            />
          </FormGroup>
        </AccordionSummary>
        <AccordionDetails>
          <ComparisonAccordionScenarioDetails />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default ComparisonAccordionDetails
