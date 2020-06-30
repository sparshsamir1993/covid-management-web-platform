import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ADMIN_ROLE } from "../../constants";
import { getUser, getUserList } from "../../actions";
import { checkStoredTokens } from "../../utils";
import { Container } from "@material-ui/core";

// imports for material table
import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
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
  // const addAdminUsers = (newUsers) => {
  //   console.log([...newUsers]);
  //   changeAdminUserList([...newUsers]);
  // };
  useEffect(() => {
    let isCurrent = false;
    const tokens = checkStoredTokens();
    const checkUser = async () => {
      await props.getUser(tokens);
      await props.getUserList();
      if (props.adminUserList.length > 1) {
        console.log(props.adminUserList.length);
        changeAdminUserList([...props.adminUserList]);
        console.log(adminUserList);
        props.adminUserList.map((user) => {
          console.log(user);
          userFields.push({
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
    { title: "Email", field: "email" },
    { title: "Name", field: "name" },
    { title: "Role", field: "role" },
  ];
  let userFields = [];

  const userListData = async () => {};
  console.log(userFields);

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

export default connect(mapStateToProps, { getUser, getUserList })(UserList);
