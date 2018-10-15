import { GETData } from "_action_creators/ApiMiddleware";
import ActionTypes from "_action_creators/ActionTypes";

export default function fetchAnswerVariables(store) {
  GETData("/answer_variables/all")
    .then(result => result.json())
    .then(result => {
      const action = { type: ActionTypes.FETCH_VARIABLES, data: result };
      store.dispatch(action);
    })
    .catch(() => {
      fetchAnswerVariables(store);
    });
}

export function fetchAnswerVariablesByText(text, dispatch) {
  GETData("/answer_variables/find", { value: text })
    .then(result => result.json())
    .then(result => {
      const action = { type: ActionTypes.FETCH_VARIABLES, data: result };
      dispatch(action);
    })
    .catch(() => {
      fetchAnswerVariablesByText(dispatch, text);
    });
}
