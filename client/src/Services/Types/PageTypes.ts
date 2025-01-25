import { OptionsObject } from "notistack";
import { SelectedFamHeadModel } from "../Models/SelectedFamHeadModel";

export type PagePromptTypes = {
  open: boolean;
  continue_callback: () => any;
  close_callback?: () => any;
  custom_title?: null | string;
  custom_subtitle?: null | string;
};

export type PageLoadingTypes = {
  show: boolean;
  loading_message?: null | string;
};

export type PageLinkTypes = {
  link: string;
  title: string;
};

export type PageSnackbarTypes = {
  message: null | string;
  options?: OptionsObject;
};

export type PageSuccessPromptTypes = {
  show?: boolean;
  message?: string | number;
  action_buttons?: Array<PageSuccessActionButtonInterface>;
};

export interface PageSuccessActionButtonInterface {
  text: string;
  handleClick: () => any;
  color?: "primary" | "secondary";
}

export type PageReducerTypes =
  | {
      type: "SET_PAGE_PROMPT";
      page_prompt: PagePromptTypes;
    }
  | {
      type: "SET_PAGE_LOADING";
      page_loading: PageLoadingTypes;
    }
  | {
      type: "SET_PAGE_SNACKBAR";
      page_snackbar: PageSnackbarTypes;
    }
  | {
      type: "SET_PAGE_LINKS";
      page_links: Array<PageLinkTypes>;
    }
  | {
      type: "SET_PAGE_SUCCESS_PROMPT";
      page_success_prompt: PageSuccessPromptTypes;
    }
  | {
      type: "SET_PAGE_SELECTED_HEAD_FAM";
      selected_head_fam: SelectedFamHeadModel;
    }
  | {
      type: "SET_FILE_PREVIEW";
      file_preview: { type: string; url: string };
    };

export interface PageReducerModel {
  page_prompt: PagePromptTypes;
  page_loading: PageLoadingTypes;
  page_snackbar: PageSnackbarTypes;
  page_links: Array<PageLinkTypes>;
  page_success_prompt?: PageSuccessPromptTypes;
  selected_head_fam?: SelectedFamHeadModel;
  file_preview?: { type: string; url: string };
}
