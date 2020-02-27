import React from "react";
import {createStore} from "redux";

// define constants
const ADD_NUMBER = "ADD_NUMBER";
const REDUCE_NUMBER = "REDUCE_NUMBER";

const initialState = {
  count: 0,
  times: 0,
};

// reducer
function countReducer(state = initialState, action) {
  console.log("create reducer" + state);
  switch (action.type) {
    case ADD_NUMBER:
      return {
        ...state,
        count: state.count + parseInt(action.number, 10),
        times: state.times + 1,
      };
    case REDUCE_NUMBER:
      return {
        ...state,
        count: state.count - parseInt(action.number, 10),
        times: state.times + 1,
      };
    default:
      return state;
  }
}

// action
function addNumber(number) {
  console.log(number);
  return {
    type: ADD_NUMBER,
    number,
  };
}

function reducerNumber(number) {
  return {
    type: REDUCE_NUMBER,
    number,
  };
}

// create store
const store = createStore(countReducer);

class PureRedux extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      number: 2,
      times: 0,
    };
    this.onChangeNumber = this.onChangeNumber.bind(this);
  }

  componentDidMount() {
    store.subscribe(() => {
      console.log(store.getState());
      this.setState({
        count: store.getState().count,
        times: store.getState().times,
      });

      // this.setState({
      //   count: store.getState().countReducer.count,
      // });
    });
  }

  onChangeNumber(e) {
    this.setState({
      number: e.target.value,
      times: this.state.times,
    });
    console.log(this.state.number);
  }

  render() {
    const {count, number, times} = this.state;
    return (
      <div>
        <p>the cunter's result is:{count}</p>
        <p>the changed times is:{times}</p>
        <input type="text" value={number} onChange={this.onChangeNumber} />
        <input
          type="button"
          value="+"
          onClick={() => {
            store.dispatch(addNumber(number));
          }}
        />
        <input
          type="button"
          value="-"
          onClick={() => {
            store.dispatch(reducerNumber(number));
          }}
        />
      </div>
    );
  }
}

export default PureRedux;
