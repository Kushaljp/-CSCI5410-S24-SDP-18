import { Button, Container, Grid, TextField } from '@mui/material'
import React from 'react'

function FirstFactorAuth({ setAuthStep, setData, isRegister }) {

  return (
    <Container maxWidth="xs">
      <Grid container rowGap={3} columnSpacing={2}>
        {
          isRegister &&
          <Grid item container md={12} rowGap={3} columnSpacing={2}>
            <Grid item md={6}>
              <TextField
                fullWidth
                id="firstname"
                label="Firstname"
                variant="outlined"
                onChange={(event) => setData(prev => ({ ...prev, firstanme: event.target.value }))} />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                id="lastname"
                label="Lastname"
                variant="outlined"
                onChange={(event) => setData(prev => ({ ...prev, lastname: event.target.value }))} />
            </Grid>
          </Grid>
        }
        <Grid item md={12}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            onChange={(event) => setData(prev => ({ ...prev, email: event.target.value }))} />
        </Grid>
        <Grid item md={12}>
          <TextField
            fullWidth
            type="password"
            id="password"
            label="Password"
            variant="outlined"
            onChange={(event) => setData(prev => ({ ...prev, password: event.target.value }))} />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="submit" variant="contained" onClick={() => setAuthStep(prev => prev + 1)}>Next</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default FirstFactorAuth
