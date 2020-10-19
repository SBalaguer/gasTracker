import React from 'react'
import {FormGroup, Typography} from '@material-ui/core'
import TeamSelect from '../TeamSelect'

import contractsInfo from '../../Static/contractInfo.json'

export default function ProjectData(props) {
    return (
        <>
        <Typography variant="h5" gutterBottom>
            Tracked Projects
        </Typography>
        <FormGroup style={{width:'80%', margin:'0 auto'}} column>
            {Object.keys(contractsInfo).map(key => <TeamSelect setProject={props.setProject} setShow={props.setShow} state={props.state} setLoading={props.setLoading} name={key} {...contractsInfo[key]} />)}
        </FormGroup>
        </>
    )
}

