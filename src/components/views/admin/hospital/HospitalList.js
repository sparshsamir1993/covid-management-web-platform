import React, { useState, useEffect } from "react";
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
}));
const HospitalList = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [adminHospitalList, changeAdminHospitalList] = useState([]);

  useEffect(() => {
    const updateHospitalList = async () => {
      props.showLoading();
      await props.getHospitalList();
      if (props.hospitals?.length > 0) {
        console.log(props.hospitals);
        changeAdminHospitalList([...props.hospitals]);
      }
      props.hideLoading();
    };

    updateHospitalList();
  }, [props.hospitals]);

  return (
    <Container maxWidth="lg">
      <div className={classes.dataTable}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => props.history.push("/admin/hospitals/new")}
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
                console.log(rowData);
                history.push("/admin/hospitals/edit", rowData);
              },
            },
            {
              icon: tableIcons.Delete,
              tooltip: "Delete Hospital",
              onClick: async (event, rowData) => {
                console.log(rowData);
                console.log(props);
                props.showLoading();
                await props.deleteHospital(rowData.id);
                props.hideLoading();
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
