import React, { useState, useEffect, useLayoutEffect } from "react";
import { Container, makeStyles, Button } from "@material-ui/core";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";
import tableIcons from "../../../tableIcons";
import {
  showLoading,
  hideLoading,
  getHospitalList,
  deleteHospital,
} from "../../../../actions";
import { connect } from "react-redux";
import { mainStyles } from "../../../../styles/styles";
import clsx from "clsx";

const tableColumns = [
  { title: "Id", field: "id" },
  { title: "Name", field: "name" },
  { title: "Contact", field: "contact" },
  { title: "Detailed Address", field: "detailedAddress" },
  { title: "Created At", field: "createdAt" },
  { title: "Modified At", field: "updatedAt" },
];
const useStyles = makeStyles(() => ({
  dataTable: {
    marginTop: "80px",
  },
  createButton: {
    marginTop: "50px",
    marginBottom: "30px",
  },
}));
const HospitalList = (props) => {
  let appStyles = mainStyles();
  const classes = useStyles();
  const history = useHistory();
  const [adminHospitalList, changeAdminHospitalList] = useState([]);

  useEffect(() => {
    if (props.hospitals?.length > 0) {
      changeAdminHospitalList([...props.hospitals]);
    }
  }, [props.hospitals]);

  useLayoutEffect(() => {
    const updateHospitalList = async () => {
      props.showLoading();
      await props.getHospitalList();
      props.hideLoading();
    };
    updateHospitalList();
  }, []);

  return (
    <Container maxWidth="lg">
      <div className={clsx(classes.dataTable)}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => props.history.push("/admin/hospitals/new")}
          className={clsx(appStyles.primaryButton, classes.createButton)}
        >
          Create Hospital
        </Button>

        <MaterialTable
          icons={tableIcons}
          columns={tableColumns}
          title="Hospital List"
          data={adminHospitalList}
          options={{
            filtering: true,
          }}
          actions={[
            {
              icon: tableIcons.Edit,
              tooltip: "Edit Hospital",
              onClick: (event, rowData) => {
                history.push("/admin/hospitals/edit", rowData);
              },
            },
            {
              icon: tableIcons.Delete,
              tooltip: "Delete Hospital",
              onClick: async (event, rowData) => {
                props.showLoading();
                await props.deleteHospital(rowData.id);
                props.hideLoading();
                // history.push("/admin/questions/edit", rowData);
              },
            },
            {
              icon: tableIcons.RemoveRedEye,
              tooltip: "Show Hospital detail",
              onClick: async (event, rowData) => {
                history.push("/admin/hospitals/detail");
                // props.showLoading();
                // await props.deleteHospital(rowData.id);
                // props.hideLoading();
                // history.push("/admin/questions/edit", rowData);
              },
            },
          ]}
        ></MaterialTable>
      </div>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    hospitals: state.adminHospitalList,
  };
};
export default connect(mapStateToProps, {
  showLoading,
  hideLoading,
  getHospitalList,
  deleteHospital,
})(HospitalList);
