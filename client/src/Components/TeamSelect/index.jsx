import React, {useState} from 'react'
import {FormControlLabel, Switch, Tooltip,CircularProgress} from '@material-ui/core'

import {getData} from '../../Services/api-calls'


export default function TeamSelect(props) {
    const [checked, setChecked] = useState(false);
    const onChange = async () =>{
        if(!props.state.projects[props.name]){
            props.setShow(props.name)
            props.setLoading(props.name)
            const res = await getData(props.name)
            props.setProject(res.data)
            setChecked(!checked)
            props.setLoading(props.name)
        }else{
            props.setShow(props.name)
            setChecked(!checked)
        }
    }

    const loading = props.state.loading[props.name]

    return (
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', justifyContent:"space-between"}}>
            <FormControlLabel
                  control={<Switch checked={checked} onChange={onChange} name={props.name} />}
                  label={props.name[0].toUpperCase() + props.name.slice(1,props.name.length)}
            />
            {loading ? <CircularProgress color="secondary" /> : ""}
            </div>
    )
}
