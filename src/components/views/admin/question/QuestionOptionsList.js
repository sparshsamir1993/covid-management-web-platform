import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  showLoading,
  hideLoading,
  deleteQuestionOption,
  setSelectedOption,
  getQuestionOptionList,
} from "../../../../actions";
import { connect } from "react-redux";

let QuestionOptionList = (props) => {
  console.log(props.question);
  const [adminQuestionOptionList, changeAdminQuestionOptionList] = useState([]);
  let { correctOptionId } = props.question;
  const generateOptionItems = (optionList) => {
    return optionList.map((option) => (
      <ListItem key={option.id}>
        <ListItemAvatar>
          <Avatar>
            {correctOptionId == option.id && (
              <CheckCircleIcon color="primary" />
            )}
            {correctOptionId !== option.id && <CheckCircleOutlineIcon />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={option.optionContent ? option.optionContent : ""}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() =>
              deleteOption({
                optionId: option.id,
                questionId: option.questionId,
              })
            }
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => editOption(option)}
          >
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
  };

  const editOption = async (option) => {
    props.showLoading();
    props.setSelectedOption(option);
    props.hideLoading();
  };

  const deleteOption = async (option) => {
    props.showLoading();
    await props.deleteQuestionOption(option);
    props.hideLoading();
  };

  useEffect(() => {
    const updateQuestionOptionsList = async () => {
      props.showLoading();
      if (props.options?.length >= 0) {
        if (props.options.length >= 0) {
          changeAdminQuestionOptionList([...props.options]);
        }
      }
      props.hideLoading();
    };

    updateQuestionOptionsList();
  }, [props.options]);

  useLayoutEffect(() => {
    props.getQuestionOptionList(props.question.id);
  }, []);

  return <List>{generateOptionItems(adminQuestionOptionList)}</List>;
};

const mapStateToProps = (state) => {
  return {
    options: state.adminQuestionOptionList,
  };
};

export default connect(mapStateToProps, {
  showLoading,
  hideLoading,
  deleteQuestionOption,
  setSelectedOption,
  getQuestionOptionList,
})(QuestionOptionList);
