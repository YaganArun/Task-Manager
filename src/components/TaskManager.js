import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  ListItemIcon,
  Avatar,
  TextField,
  IconButton,
  Container,
  Paper
} from "@material-ui/core";
import { teal, grey, blueGrey } from "@material-ui/core/colors";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  greenAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: teal[300]
  }
});

function TaskList({ Task, index, completeTask, deleteTask }) {
  const classes = useStyles();

  return (
    <List>
      <ListItem button onClick={() => completeTask(index)}>
        <ListItemAvatar>
          <Avatar className={classes.greenAvatar}>
            <AssignmentIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={Task.text}
          style={{ textDecoration: Task.isCompleted ? "line-through" : "none" }}
        />
        <ListItemSecondaryAction>
          <ListItemIcon>
            <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(index)} >
              <DeleteIcon />
            </IconButton>
          </ListItemIcon>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

function TaskForm({ addTask }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTask(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="standard-bare"
        margin="normal"
        value={value}
        placeholder="Add Task Here"
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

export default function TaskApp() {
  const [Tasks, setTasks] = useState([
    {
      text: "Solve 3 DSA problems",
      isCompleted: false
    },
    {
      text: "Go for grocery shopping",
      isCompleted: false
    }
  ]);

  const addTask = text => {
    const newTasks = [{ text }, ...Tasks];
    setTasks(newTasks);
  };

  const completeTask = index => {
    const newTasks = [...Tasks];
    newTasks[index].isCompleted = !Tasks[index].isCompleted;
    setTasks(newTasks);
  };

  const deleteTask = index => {
    const newTasks = [...Tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <Container maxWidth="md">
      <TaskForm addTask={addTask} />
      <Paper style={{backgroundColor:'#ffe082'}}>
        {Tasks.map((Task, index) => (
          <TaskList
            key={index}
            index={index}
            Task={Task}
            completeTask={completeTask}
            deleteTask={deleteTask}
          />
        ))}
      </Paper>
    </Container>
  );
}