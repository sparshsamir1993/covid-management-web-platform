import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ADMIN_ROLE } from "../../../../constants";
import {
  getUser,
  getUserList,
  showLoading,
  hideLoading,
} from "../../../../actions";
import { checkStoredTokens } from "../../../../utils";
import { Container } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import MaterialTable from "material-table";

import tableIcons from "../../../tableIcons";
const UserList = (props) => {
  const history = useHistory();
  const [adminUserList, changeAdminUserList] = useState([]);
  if (!props.auth.id) {
    props.showLoading();
  } else {
    props.hideLoading();
  }
  useEffect(() => {
    let isCurrent = false;
    const tokens = checkStoredTokens();

    const checkUser = async () => {
      props.showLoading();
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
      <MaterialTable
        icons={tableIcons}
        title="Users List"
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
