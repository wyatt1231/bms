import { Button, Chip, Grid } from "@material-ui/core";
import React, { FC, memo, useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import DateFieldHookForm from "../../../Component/HookForm/DateFieldHookForm";
import MultCheckboxHookForm from "../../../Component/HookForm/MultCheckboxHookForm";
import TextFieldHookForm from "../../../Component/HookForm/TextFieldHookForm";
import ITableInitialSort from "../../../Services/Interface/ITableInitialSort";
import { PaginationModel } from "../../../Services/Models/PaginationModels";
interface IFilterDtNewsAdminView {
  handleSetTableFilter: (table_filter: PaginationModel) => void;
  table_filter: PaginationModel;
  handleRefetchTable: () => void;
}

const initialTableSort: Array<ITableInitialSort> = [
  {
    label: "Encoded (desc)",
    value: {
      column: "encoded_at",
      direction: "desc",
    },
  },
  {
    label: "Encoded (asc)",
    value: {
      column: "encoded_at",
      direction: "asc",
    },
  },
  {
    label: "Title (asc)",
    value: {
      column: "title",
      direction: "asc",
    },
  },
  {
    label: "Title (desc)",
    value: {
      column: "title",
      direction: "desc",
    },
  },
];

export const FilterDtNewsAdminView: FC<IFilterDtNewsAdminView> = memo(({ handleSetTableFilter, table_filter, handleRefetchTable }) => {
  const form_add_news = useForm({
    mode: "onChange",
    defaultValues: table_filter.filters,
  });

  const [selected_sort, set_selected_sort] = useState(0);

  const handleChangeSort = useCallback((index: number) => {
    set_selected_sort(index);
  }, []);

  const handleSubmitForm = useCallback(
    (data) => {
      const payload: PaginationModel = {
        ...table_filter,
        filters: {
          ...data,
        },
        sort: initialTableSort[selected_sort].value,
        page: {
          begin: 0,
          limit: 5,
        },
      };

      handleSetTableFilter(payload);
      handleRefetchTable();
    },
    [handleRefetchTable, handleSetTableFilter, selected_sort]
  );

  // useEffect(() => {
  //   form_add_news.reset(table_filter.filters);
  // }, []);

  return (
    <>
      <StyledFilter>
        <FormProvider {...form_add_news}>
          <form onSubmit={form_add_news.handleSubmit(handleSubmitForm)} noValidate id="form-filter-records">
            <Grid container justify="center" spacing={2}>
              <Grid item xs={12}>
                <div className="filter-main-title">Search</div>
                <TextFieldHookForm
                  name="search"
                  variant="outlined"
                  fullWidth={true}
                  placeholder="Ibutang ang mga letra sa Title nga gusto pangitaon"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <div className="filter-main-title">Sort</div>
                <Grid container spacing={1}>
                  {initialTableSort.map((s, i) => (
                    <Grid key={i} item>
                      <Chip
                        label={s.label}
                        clickable
                        color={selected_sort === i ? "primary" : "default"}
                        onClick={() => {
                          handleChangeSort(i);
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <div className="filter-main-title">Filter</div>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MultCheckboxHookForm
                      label="Status"
                      name="sts_pk"
                      row={true}
                      radio_items={[
                        {
                          label: "Unpublished",
                          value: "UP",
                        },
                        {
                          label: "Published",
                          value: "PU",
                        },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DateFieldHookForm
                      type="date"
                      name="date_from"
                      label="Date From"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      clearable
                      fullWidth
                      inputVariant="outlined"
                      autoOk
                      defaultValue={null}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DateFieldHookForm
                      type="date"
                      name="date_to"
                      label="Date To"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      clearable
                      fullWidth
                      inputVariant="outlined"
                      autoOk
                      defaultValue={null}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid
                    container
                    spacing={2}
                    justify="center"
                    style={{
                      marginTop: `2em`,
                      marginBottom: `2em`,
                    }}
                  >
                    <Grid item>
                      <Button type="reset" onClick={() => {}} variant="contained">
                        Reset
                      </Button>
                    </Grid>

                    <Grid item>
                      <Button variant="contained" form="form-filter-records" color="primary" type="submit">
                        Apply Filters
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </StyledFilter>
    </>
  );
});

export default FilterDtNewsAdminView;

const StyledFilter = styled.div`
  /* text-align: center; */
  background-color: #fff;
  border-radius: 7px;
  padding: 1em;

  .filter-main-title {
    padding: 0.2em 0;
    /* border-bottom: 0.1em solid rgba(0, 0, 0, 0.15); */
    font-weight: 900;
    margin: 0.5em 0;
    opacity: 0.37;
    text-align: start;
  }
`;
