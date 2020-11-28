import { produce } from "immer";
import { appActions } from "../actions/actionsTypes";
let initialState = {
  previewMode: false,
};

export default produce((draft, action) => {
  switch (action.type) {
    case appActions.TOGGLE_PREVIEW_MODE:
      draft.previewMode = !draft.previewMode;
      break;
    default:
      return;
  }
}, initialState);
