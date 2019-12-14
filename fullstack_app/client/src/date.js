import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
// ----------Native Select-----------
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
// ----------------------------------
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 175,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function MaterialUIPickers(props) {
  const classes = useStyles();
  // The first commit of Material-UI
  
  const [fromDate, setFromDate] = React.useState(
    new Date("2019-11-01T00:00:00")
  );
  const [toDate, setToDate] = React.useState(
    new Date()
  );

  const handleDateChange_from = date => {
    setFromDate(date);
  };

  const handleDateChange_to = date => {
    setToDate(date);
  };

  const handleSubmit = ()=>{
    
  }
// ----------Native Select-----------
  const [location_type, setloccationType] = React.useState({
    type: 'ALL',
  });
  const handleChange_status = name => event => {
    setloccationType({
      ...location_type,
      [name]: event.target.value,
    });
  };
// ----------------------------------
  

  return (
    
    <MuiPickersUtilsProvider utils={DateFnsUtils} value={{from : fromDate, to: toDate, location_type: location_type.type}}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="From Date"
          value={fromDate}
          onChange={handleDateChange_from}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
          maxDate={new Date()}
        />

        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="To Date"
          value={toDate}
          onChange={handleDateChange_to}
          //shouldDisableDate={disableDays} 
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
          minDate={fromDate}
          maxDate={new Date()}
        />
        <FormControl className={classes.formControl}>
            <InputLabel id="location-select-label">Location Type</InputLabel>
            <NativeSelect
                value={location_type.type}
                onChange={handleChange_status('type')}
                inputProps={{
                  name: 'type',
                  id: 'location-native-label-placeholder',
                }}
                >
                <option value={"ALL"}>All types</option>
                <option value={"ROOFTOP"}>Rooftop</option>
                <option value={"GEOMETRIC_CENTER"}>Geometric Center</option>
                <option value={"RANGE_INTERPOLATED"}>Range Interpolated</option>
                <option value={"APPROXIMATE"}>Approcimate</option>
                <option value={"UNKNOWN"}>Unknown</option>
                <option value={"P.O. Box"}>P.O. Box</option>
            </NativeSelect>
        </FormControl>
        <Button 
          color="primary"
          className={classes.button}
          startIcon={<SearchIcon/>}
          onClick={(e) => props.func(fromDate, toDate, location_type.type,true)}>
          Search
        </Button>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}