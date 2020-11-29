import { OPEN_MODAL, CLOSE_MODAL } from "../../actions/modal_actions";

const modalReducer = (state = null, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      // console.log(action.modalType)
      return {
        modalType: action.modalType,
        metadata: action.metadata,
      };
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
};

export default modalReducer;