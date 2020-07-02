import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ADMIN_ROLE } from "../../../constants";
import {
  getUser,
  getUserList,
  showLoading,
  hideLoading,
} from "../../../actions";
import { checkStoredTokens } from "../../../utils";
import { Container } from "@material-ui/core";

// imports for material table
import { forwardRef } from "react";
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  Remove,
  LastPage,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";
import MaterialTable from "material-table";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const UserList = (props) => {
  const history = useHistory();
  const [adminUserList, changeAdminUserList] = useState([]);
  useEffect(() => {
    let isCurrent = false;
    const tokens = checkStoredTokens();
    const checkUser = async () => {
      props.showLoading();
      await props.getUser(tokens);
      await props.getUserList(props.history);
      props.hideLoading();
      if (props.adminUserList.length > 1) {
        console.log(props.adminUserList.length);
        changeAdminUserList([...props.adminUserList]);
        console.log(adminUserList);
        props.adminUserList.map((user) => {
          console.log(user);
          userFields.push({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          });
        });
        changeAdminUserList([...userFields]);
        console.log(userFields);
      }
      if (props.auth.id && props.auth.role !== ADMIN_ROLE) {
        history.replace("/");
      }
    };
    checkUser();
    return () => {
      isCurrent = true;
    };
  }, [props.adminUserList.length]);

  const tableColumns = [
    { title: "Id", field: "id" },
    { title: "Email", field: "email" },
    { title: "Name", field: "name" },
    { title: "Role", field: "role" },
  ];
  let userFields = [];

  const userListData = async () => {};

  return (
    <Container maxWidth="lg">
      <h1>Sparsh</h1>
      <MaterialTable
        icons={tableIcons}
        columns={tableColumns}
        data={adminUserList}
        options={{
          filtering: true,
        }}
        actions={[
          {
            icon: () => <Edit />,
            tooltip: "Edit User",
            onClick: (event, rowData) => {
              console.log(rowData);
              history.push("/admin/users/edit", rowData);
            },
          },
        ]}
      ></MaterialTable>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    adminUserList: state.adminUserList,
  };
};

export default connect(mapStateToProps, {
  getUser,
  getUserList,
  showLoading,
  hideLoading,
})(UserList);
