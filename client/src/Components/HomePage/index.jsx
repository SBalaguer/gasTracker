import React from 'react'
import Table from '../Table'
import {Button, Icon} from '@material-ui/core'
import { Link } from "react-router-dom";


export default function HomePage(props) {
    return (
        <>
            <Table data={props.data} {...props} />
            {/* <Link to="/add" style={{color: "inherit", textDecoration:"none"}}>
            <Button variant="contained" color="secondary">
            <Icon style={{marginRight:'0.25em'}}>add_circle</Icon>
                Add Project
            </Button>
            </Link> */}
        </>
    )
}
