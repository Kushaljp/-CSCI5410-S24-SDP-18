import { Button, Container, Grid, TextField } from '@mui/material'
import React from 'react'

function ThirdFactorAuth({ setAuthStep, setData }) {
  return (
    <Container maxWidth="xs">
      <Grid container rowGap={3} columnSpacing={2}>
        <Grid item md={12}>
          <TextField
            fullWidth
            id="cipherText"
            label="Cipher Text"
            variant="outlined"
            onKeyDown={(event) => {
              const regextext = /^[a-zA-Z\s]+$/;
              if(!regextext.test(event.key)) {
                event.preventDefault();
              }
            }}
            onChange={(event) => setData(prev => ({ ...prev, cipherText: event.target.value }))} />
        </Grid>
        <Grid item md={12}>
          <TextField
            fullWidth
            InputProps={{ inputProps: { min: 0 } }}
            type="number"
            id="shiftNumber"
            label="Shift Number"
            variant="outlined"
            onChange={(event) => setData(prev => ({ ...prev, shiftNumber: event.target.value }))} />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="submit" variant="contained" onClick={() => setAuthStep(prev => prev + 1)}>Next</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ThirdFactorAuth
