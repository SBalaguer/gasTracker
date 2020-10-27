import React, {useState} from 'react'
import {Typography, Paper, TextField, Button, Icon, Tooltip} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    form:{
    '& > *': {
        margin: theme.spacing(1),
        width: '45ch',
        display: 'flex',
        flexDirection: 'column',
        marginTop:'1em',
        marginBottom:'1em',
      },
    
    }
  }));

export default function AddProject(props) {
    const [name, setName] = useState("")
    const [contracts, setContracts] = useState("")
    const [error, setError] = useState("")

    const classes = useStyles();

    const submit = () =>{
      let canSend = false
      if(!name && !contracts){
        setError("Please add the information")
      }else if(!name){
        setError("Name is required")
      }else if(!contracts){
        setError("Contracts are required")
      }else{
        canSend = true
        setError("")
      }

      if(props.data.filter(_project => _project.project.name === name.toLowerCase()).length){
        setError("Name already taken")
      }else{
        setError("")
        canSend = true
      }

      if(canSend){
        console.log('submiting')
      }

    }

    console.log(error)
    //{name, contracts}
    return (
        <div style={{width: '100%', display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
            <Paper style={{width: '100%', display: "flex", flexDirection:"column", alignItems:'center', marginBottom:"1em"}} >
                <Typography variant="h6" gutterBottom style={{marginTop: '0.5em'}}>
                    Add a New Project
                </Typography>
                <Typography variant="body1" gutterBottom style={{marginTop: '0.5em'}}>
                    Name of the project should be unique.
                </Typography>
                <form className={classes.form} noValidate autoComplete="off">
                  <TextField id="name" value={name} onChange={event => setName(event.target.value)} required label="Project Name" />
                  <Tooltip title="Pleass add the contracts separated by commas" aria-label="add" placement="right"> 
                    <TextField id="contracts" value={contracts} onChange={event => setContracts(event.target.value)} required label="Contracts" />
                  </Tooltip>
                  {/* {
                      contracts.map(value=>{
                        return (<div style={{display: "flex", flexDirection: "row", alignItems:"center"}}>
                          <TextField value={name} onChange={event => setName(event.target.value)} style={{width: "100%", marginRight:'0.25em'}} id="standard-basic" required label="Project Contract" />
                          <Tooltip title="Add Other Address" aria-label="add" placement="right">
                            <Icon style={{marginRight:'0.25em'}}>add_circle</Icon>
                          </Tooltip>
                        </div>)
                      })
                  } */}
                  <Button variant="contained" color="secondary" onClick={submit}>
                    Submit Project
                </Button>
                </form>
            </Paper>
            <Link to="/" style={{color: "inherit", textDecoration:"none",}}>
            <Button variant="contained" color="secondary">
            <Icon style={{marginRight:'0.25em'}}>home</Icon>
                Go Back
            </Button>
            </Link>
        </div>
        
    )
}
