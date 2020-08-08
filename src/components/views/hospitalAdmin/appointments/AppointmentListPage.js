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
import { tConvert } from "../../../../utils/appointmentUtils";

const useStyles = makeStyles(() => ({
  appointmentList: {
    marginTop: "80px",
  },
}));

let AppointmentListPage = (props) => {
  const history = useHistory();
  const [appointmentListState, changeAppointmentListState] = useState([]);
  const [appointmentListDayWise, changeAppintmentListDayWise] = useState([]);

  useEffect(() => {
    changeAppointmentListState(props.appointmentList);

    const apDates = _.map(props.appointmentList, "appointmentDate");
    const uniqueApDates = _.uniq(apDates);
    let newApData = [];
    uniqueApDates.map((date) => {
      let dataToAdd = {};
      if (props.appointmentList && props.appointmentList.length) {
        const matchedAps = props.appointmentList.filter(
          (appointment) => appointment.appointmentDate === date
        );
        dataToAdd.appointmentDate = date;
        dataToAdd.matchedAppointments = matchedAps;
        newApData.push(dataToAdd);
      }
    });
    changeAppintmentListDayWise(newApData);
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

  return (
    <Container maxWidth="lg">
      <List className={classes.appointmentList}>
        {renderAppointmentList()}
        <ListItem>20 july</ListItem>
        <Divider />
      </List>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    appointmentList: state.hospitalAdmin.appointmentList,
    myHospital: state.hospitalAdmin.myHospital,
  };
};

AppointmentListPage = connect(mapStateToProps, { getHospitalAppointments })(
  AppointmentListPage
);
export default AppointmentListPage;
