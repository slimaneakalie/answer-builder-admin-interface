import { GETData } from "_action_creators/ApiMiddleware";
import ActionTypes from "_action_creators/ActionTypes";

export default function fetchAnswerItems(store) {
  GETData("/answer_items/all", {})
    .then(result => result.json())
    .then(result => {
      const action = { type: ActionTypes.FETCH_ITEMS, data: result };
      store.dispatch(action);
    })
    .catch(() => {
      fetchAnswerItems(store);
    });
}

export function fetchAnswerItemsByText(text, dispatch) {
  GETData("/answer_items/all_by_text", { text })
    .then(result => result.json())
    .then(result => {
      const action = { type: ActionTypes.FETCH_ITEMS, data: result };
      dispatch(action);
    })
    .catch(() => {
      fetchAnswerItemsByText(dispatch);
    });
}
