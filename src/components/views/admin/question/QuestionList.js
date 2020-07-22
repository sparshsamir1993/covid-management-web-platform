import React, { useState, useEffect, useLayoutEffect } from "react";
import { Container, makeStyles, Button } from "@material-ui/core";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";
import tableIcons from "../../../tableIcons";
import {
  showLoading,
  hideLoading,
  getQuestionList,
  deleteQuestion,
} from "../../../../actions";
import { connect } from "react-redux";

const tableColumns = [
  { title: "Id", field: "id" },
  { title: "Question", field: "question" },
  { title: "Created At", field: "createdAt" },
  { title: "Modified At", field: "updatedAt" },
];
const useStyles = makeStyles(() => ({
  dataTable: {
    marginTop: "80px",
  },
}));
const QuestionList = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [adminQuestionList, changeAdminQuestionList] = useState([]);
  if (!props.questions) {
    props.showLoading();
  }
  useEffect(() => {
    if (props.questions?.length > 0) {
      console.log(props.questions);
      changeAdminQuestionList([...props.questions]);
    }
  }, [props.questions]);

  useLayoutEffect(() => {
    const updateQuestionList = async () => {
      props.showLoading();
      await props.getQuestionList();
      props.hideLoading();
    };
    updateQuestionList();
  }, []);

  return (
    <Container maxWidth="lg">
      <div className={classes.dataTable}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => props.history.push("/admin/questions/new")}
        >
          Create Question
        </Button>

        <MaterialTable
          icons={tableIcons}
          columns={tableColumns}
          title="Question List"
          data={adminQuestionList}
          options={{
            filtering: true,
          }}
          actions={[
            {
              icon: tableIcons.Edit,
              tooltip: "Edit Question",
              onClick: (event, rowData) => {
                console.log(rowData);
                history.push("/admin/questions/edit", rowData);
              },
            },
            {
              icon: tableIcons.Delete,
              tooltip: "Delete Question",
              onClick: async (event, rowData) => {
                console.log(rowData);
                console.log(props);
                props.showLoading();
                await props.deleteQuestion(rowData.id);
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
    questions: state.adminQuestionList,
  };
};
export default connect(mapStateToProps, {
  showLoading,
  hideLoading,
  getQuestionList,
  deleteQuestion,
})(QuestionList);
