import React, { useLayoutEffect, useEffect, useState } from "react";
import { getHospitalAppointments } from "../../../../actions";
import { connect } from "react-redux";
import _ from "lodash";
import {
  List,
  ListItem,
  Divider,
  Container,
  makeStyles,
} from "@material-ui/core";
import { getFormattedDateForAppointment } from "../../../../utils";
import MaterialTable from "material-table";
import tableIcons from "../../../tableIcons";
import { useHistory } from "react-router-dom";
import {
  tConvert,
  removeLastCharFromTime,
} from "../../../../utils/appointmentUtils";
import { Field, reduxForm } from "redux-form";
import MaterialSelect from "../../../utilComponents/MaterialSelect";

const useStyles = makeStyles(() => ({
  appointmentList: {
    marginTop: "80px",
  },
}));

let AppointmentListPage = (props) => {
  const history = useHistory();
  const [appointmentListState, changeAppointmentListState] = useState([]);
  const [appointmentListDayWise, changeAppintmentListDayWise] = useState([]);
  const [
    appointmentListDayWiseStatic,
    changeAppintmentListDayWiseStatic,
  ] = useState([]);
  const [uniqueAppointmentDates, changeUniqueAppointmentDates] = useState([]);

  useEffect(() => {
    console.log(props);
    changeAppointmentListState(props.appointmentList);

    // const apDates = _.map(props.appointmentList, "appointmentDate");
    const apDates = props.appointmentList.map((ap) =>
      removeLastCharFromTime(ap.appointmentDate)
    );
    console.log(apDates);
    const uniqueApDates = _.uniq(apDates);
    changeUniqueAppointmentDates(uniqueApDates);
    let newApData = [];
    uniqueApDates.map((date) => {
      let dataToAdd = {};
      if (props.appointmentList && props.appointmentList.length) {
        // debugger;
        const matchedAps = props.appointmentList.filter(
          (appointment) =>
            new Date(
              removeLastCharFromTime(appointment.appointmentDate)
            ).getTime() === new Date(date).getTime()
        );
        dataToAdd.appointmentDate = date;
        dataToAdd.matchedAppointments = matchedAps;
        newApData.push(dataToAdd);
      }
    });
    console.log(newApData);
    changeAppintmentListDayWise(newApData);
    changeAppintmentListDayWiseStatic(newApData);
  }, [props.appointmentList]);

  const classes = useStyles();
  useLayoutEffect(() => {
    const getHospitalListFromAPI = async () => {
      await props.getHospitalAppointments(props.myHospital.id);
    };
    if (props.myHospital?.id) {
      getHospitalListFromAPI();
    }
  }, [props.myHospital]);

  const tableColumns = [
    { title: "Id", field: "id" },
    { title: "User email", field: "user.email" },
    {
      title: "Appointment Time",
      field: "appointmentTime",
      render: (rowData) => tConvert(rowData.appointmentTime),
      customFilterAndSearch: (value, rowData) => {
        const stringTime = tConvert(rowData.appointmentTime);
        if (stringTime.toLowerCase().includes(value)) {
          return true;
        }
      },
    },
    { title: "Appointment Status", field: "appointmentStatus" },
  ];

  const renderAppointmentList = () => {
    if (appointmentListState?.length) {
      return appointmentListDayWise.map((appointment) => {
        let { appointmentDate, matchedAppointments } = appointment;
        return (
          <React.Fragment key={appointmentDate}>
            <ListItem>
              {getFormattedDateForAppointment(appointmentDate)}
            </ListItem>
            <Divider />
            <MaterialTable
              icons={tableIcons}
              columns={tableColumns}
              title="Appointment List"
              data={matchedAppointments}
              options={{
                filtering: true,
              }}
              actions={[
                {
                  icon: tableIcons.Edit,
                  tooltip: "Edit Appointment",
                  onClick: (event, rowData) => {
                    history.push("/hospital/appointment/detail", rowData);
                  },
                },
                {
                  icon: tableIcons.Delete,
                  tooltip: "Delete Appointment",
                  onClick: async (event, rowData) => {
                    props.showLoading();
                    await props.deleteHospital(rowData.id);
                    props.hideLoading();
                    // history.push("/admin/questions/edit", rowData);
                  },
                },
              ]}
            ></MaterialTable>
          </React.Fragment>
        );
      });
    }
  };

  const renderAvailableAppointmentDatesSelect = () => {
    return uniqueAppointmentDates.map((date) => (
      <option key={date}>{getFormattedDateForAppointment(date)}</option>
    ));
  };

  const showSelectedDateAppointments = (e) => {
    console.log(e.currentTarget.value);

    console.log(appointmentListDayWise);
    let sTime = new Date(e.currentTarget.value).getTime();
    debugger;
    if (!sTime || sTime == NaN) {
      changeAppintmentListDayWise(appointmentListDayWiseStatic);
      return;
    }
    let newArr = appointmentListDayWiseStatic.filter(
      (ap) => new Date(ap.appointmentDate).getTime() == sTime
    );
    changeAppintmentListDayWise(newArr);
  };

  return (
    <Container maxWidth="lg">
      <Field
        type="text"
        name="dateToBeDisplayed"
        onChange={showSelectedDateAppointments}
        component={MaterialSelect}
      >
        <option key={""}>All Dates</option>

        {renderAvailableAppointmentDatesSelect()}
      </Field>
      <List className={classes.appointmentList}>
        {renderAppointmentList()}
        <Divider />
      </List>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    appointmentList: state.hospitalAdmin.appointmentList,
    myHospital: state.hospitalAdmin.myHospital,
    formValues: state.form.currentAppointmentDateForm,
  };
};

AppointmentListPage = connect(mapStateToProps, { getHospitalAppointments })(
  AppointmentListPage
);
AppointmentListPage = reduxForm({
  form: "currentAppointmentDateForm",
})(AppointmentListPage);
export default AppointmentListPage;
