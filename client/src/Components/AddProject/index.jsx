import React, {useState} from 'react'
import {TextField, Typography} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';

export default function AddProject() {
      return (
            <div style={{width: '80%', margin:"0 auto"}}>
                    <Typography variant="h5" gutterBottom>
            Add Project
        </Typography>
            <div style={{display:"flex", flexDirection:"column"}} noValidate autoComplete="off">
                  <TextField id="standard-basic" label="Project's Name" />
                  <div  style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                  <TextField id="standard-basic" label="Project's Contract" />
                  <AddCircleOutlineIcon style={{marginLeft:"1em"}} fontSize={"medium"}/>
                  </div>
            </div>
            <Button variant="contained" color="secondary">
                  Add & Search
            </Button>
            </div>
      )
}
