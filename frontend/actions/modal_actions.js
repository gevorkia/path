export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = (modalType, metadata) => {
  return {
    type: OPEN_MODAL,
    modalType,
    metadata,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};
