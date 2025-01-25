import { PageReducerModel, PageReducerTypes } from "../Types/PageTypes";

const defaultState: PageReducerModel = {
  page_prompt: {
    open: false,
    custom_title: null,
    custom_subtitle: null,
    continue_callback: null,
    close_callback: null,
  },
  page_loading: {
    show: false,
  },
  page_snackbar: {
    message: null,
  },
  page_links: [],
  selected_head_fam: {
    open: false,
    resident_pk: null,
  },
  // file_preview: { type: string, url: string },
};

const PageReducer = (state: PageReducerModel = defaultState, action: PageReducerTypes): PageReducerModel => {
  switch (action.type) {
    case "SET_PAGE_PROMPT":
      return { ...state, page_prompt: action.page_prompt };
    case "SET_PAGE_LOADING":
      return { ...state, page_loading: action.page_loading };
    case "SET_PAGE_SNACKBAR":
      return { ...state, page_snackbar: action.page_snackbar };

    case "SET_PAGE_LINKS":
      return { ...state, page_links: action.page_links };

    case "SET_PAGE_SUCCESS_PROMPT":
      return { ...state, page_success_prompt: action.page_success_prompt };

    case "SET_PAGE_SELECTED_HEAD_FAM":
      return { ...state, selected_head_fam: action.selected_head_fam };

    case "SET_FILE_PREVIEW":
      return { ...state, file_preview: action.file_preview };
    default:
      return state;
  }
};

export default PageReducer;
