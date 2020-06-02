import React from "react";
import "antd/dist/antd.css";
import { Button, Card, Col, Icon, Input, Layout, Row } from "antd";

const ADD_TASK = "ADD_TASK";
const DEL_TASK = "DEL_TASK";
const MOVE_UP_TASK = "MOVE_UP_TASK";
const MOVE_DOWN_TASK = "MOVE_DOWN_TASK";

class ToDoList extends React.PureComponent {
  state = {
    tasks: []
  };

  tasksReducer = (prevState = [], action = {}) => {
    switch (action.type) {
      case ADD_TASK: {
        const newTask = {
          id: Number.parseInt(Math.random() * 10000, 10).toString(),
          name: action.payload
        };
        return prevState.concat(newTask);
      }
      case DEL_TASK: {
        const id = action.payload;
        return prevState.filter(task => task.id !== id);
      }
      case MOVE_UP_TASK: {
        const id = action.payload;
        const index = prevState.findIndex(task => task.id === id);
        return prevState.map((task, pos) => {
          if (pos === index - 1) return prevState[index]
          if (pos === index) return prevState[index - 1]
          return task
        })
      }
      case MOVE_DOWN_TASK: {
        const id = action.payload;
        const index = prevState.findIndex(task => task.id === id);
        return prevState.map((task, pos) => {
          if (pos === index + 1) return prevState[index]
          if (pos === index) return prevState[index + 1]
          return task
        })
      }

      default:
        return prevState;
    }
  };

  dispatch = (action, callback) => {
    this.setState(
      prevState => ({
        tasks: this.tasksReducer(prevState.tasks, action)
      }),
      callback
    );
  };

  createAddTaskAction = name => {
    const addTaskAction = {
      type: ADD_TASK,
      payload: name
    };
    return addTaskAction;
  };

  onAddTask = event => {
    event.persist();
    this.dispatch(this.createAddTaskAction(event.target.value || ""), () => {
      event.target.value = "";
    });
  };

  createDeleteTaskAction = taskId => {
    const delTaskAction = {
      type: DEL_TASK,
      payload: taskId
    };
    return delTaskAction;
  };

  onDeleteTask = event => {
    this.dispatch(this.createDeleteTaskAction(event.target.dataset.id));
  };

  createMoveUpTaskAction = taskId => {
    const moveUpTaskAction = {
      type: MOVE_UP_TASK,
      payload: taskId
    };
    return moveUpTaskAction;
  };

  onMoveUpTask = event => {
    this.dispatch(this.createMoveUpTaskAction(event.target.dataset.id));
  };
  createMoveDownTaskAction = taskId => {
    const moveDownTaskAction = {
      type: MOVE_DOWN_TASK,
      payload: taskId
    };
    return moveDownTaskAction;
  };

  onMoveDownTask = event => {
    this.dispatch(this.createMoveDownTaskAction(event.target.dataset.id));
  };

  /*onAddTask = event => {
    event.persist()
    const newTask = {
      id : Number.parseInt(Math.random()*1000 , 10).toString(),
      name : event.target.value
    }
    this.setState(
      (prevState)=>({tasks: prevState.tasks.concat(newTask)})
    , () => (event.target.value=''))
  }

  onDelete = event => {
    const id = event.target.dataset.id
    this.setState(
      (prevState) => ({ tasks: prevState.tasks.filter(task => task.id !== id) })
    )
  }

  onMoveUpTask = event => {
    const id = event.target.dataset.id
    this.setState(prevState => {
      const index = prevState.tasks.findIndex(task => task.id === id)
      return {
        tasks: prevState.tasks.map((task,pos)=>{
          if(pos === index -1) return prevState.tasks[index]
          if (pos === index) return prevState.tasks[index-1]
          return task
        })
      }
     }
    )

  }

  onMoveDownTask = event => {
    const id = event.target.dataset.id
    this.setState(prevState => {
      const index = prevState.tasks.findIndex(task => task.id === id)
      return {
        tasks: prevState.tasks.map((task, pos) => {
          if (pos === index + 1) return prevState.tasks[index]
          if (pos === index) return prevState.tasks[index + 1]
          return task
        })
      }
     }
    )

  }*/

  render() {
    return (
      <Layout>
        <Layout.Content>
          <Row>
            <Col span={24}>
              <Card>
                <Input onPressEnter={this.onAddTask} />
              </Card>
            </Col>
            {this.state.tasks.map(({ id, name }, index) => (
              <Col key={id} offset={1} span={22}>
                <Card>
                  {name}
                  <Button.Group style={{ float: "right" }}>
                    <Button
                      data-id={id}
                      disabled={index === 0}
                      onClick={this.onMoveUpTask}
                    >
                      <Icon type="up" />
                    </Button>

                    <Button
                      data-id={id}
                      disabled={index === this.state.tasks.length - 1}
                      onClick={this.onMoveDownTask}
                    >
                      <Icon type="down" />
                    </Button>

                    <Button
                      type="danger"
                      data-id={id}
                      onClick={this.onDeleteTask}
                    >
                      <Icon type="delete" />
                    </Button>
                  </Button.Group>
                </Card>
              </Col>
            ))}
          </Row>
        </Layout.Content>
      </Layout>
    );
  }
}

export default ToDoList
