import {
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import PrintRoundedIcon from "@material-ui/icons/PrintRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { Form, Formik } from "formik";
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import CustomAvatar from "../../../Component/CustomAvatar";
import DataTableSearch from "../../../Component/DataTableSearch";
import DataTableSort from "../../../Component/DataTableSort";
import FormikCheckbox from "../../../Component/Formik/FormikCheckbox";
import FormikInputField from "../../../Component/Formik/FormikInputField";
import IconButtonPopper from "../../../Component/IconButtonPopper/IconButtonPopper";
import LinearLoadingProgress from "../../../Component/LinearLoadingProgress";
import LoadingButton from "../../../Component/LoadingButton";
import PreviewPDF from "../../../Component/PreviewPDF";
import UsePdf from "../../../Hooks/UsePdf";
import useFilter from "../../../Hooks/useFilter";
import FamilyActions from "../../../Services/Actions/FamilyActions";
import { setPageLinks } from "../../../Services/Actions/PageActions";
import FamilyApi from "../../../Services/Api/FamilyApi";
import ITableInitialSort from "../../../Services/Interface/ITableInitialSort";
import { FamMemberModel } from "../../../Services/Models/FamilyModel";
import { PaginationModel } from "../../../Services/Models/PaginationModels";
import { RootStore } from "../../../Services/Store";
import DialogViewFamMem from "./ManageFamilyAdminView/DialogViewFamMem";

interface IFamilyAdminView {}

const initialSearch = {
  quick_search: "",
  ulo_pamilya_first_name: "",
  ulo_pamilya_last_name: "",
  ulo_fam_purok: ["all", "1", "2", "3", "4", "5", "6", "7", "8"],

  tinubdan_tubig: ["all", "blanko", "walay konesyon sa tubig", "bomba", "ulan", "barangay water work", "tubod", "balon", "DCWD"],

  matang_kasilyas: ["all", "blanko", "walay kasilyas", "antipolo", "buhos", "water-seated"],

  pasilidad_kuryente: ["all", "blanko", "walay koneksyon", "lampara (gas)", "kandila", "petromaks (gas)", "davao light"],

  matang_basura: ["all", "blanko", "ginalain ang mabulok ug dili mabulok", "ginakolekta sa CENTRO O Barangay", "ginalubong", "ginalabay"],

  biktima_pangabuso: ["all", "blanko", "gibeya-an", "pangulata", "ginabaligya/illegal rekroter", "droga", "krime"],
};

const initialTableSort: Array<ITableInitialSort> = [
  {
    label: "Newest first",
    value: {
      column: "encoded_at",
      direction: "desc",
    },
  },
  {
    label: "Oldest first",
    value: {
      column: "encoded_at",
      direction: "asc",
    },
  },
  {
    label: "Alphabetical Asc",
    value: {
      column: "ulo_fam_member",
      direction: "asc",
    },
  },
  {
    label: "Alphabetical Desc",
    value: {
      column: "ulo_fam_member",
      direction: "desc",
    },
  },
];

export const FamilyAdminView: FC<IFamilyAdminView> = memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();

  const family_table = useSelector((store: RootStore) => store.FamilyReducer.family_table);
  const fetch_family_table = useSelector((store: RootStore) => store.FamilyReducer.fetch_family_table);

  const [selected_family_member, set_selected_family_member] = useState<null | Array<FamMemberModel>>(null);

  const [soa, set_soa] = useState();
  const [loading_soa, set_loading_soa] = useState(false);

  const [
    tableSearch,
    tableLimit,
    tablePage,
    tableCount,
    activeSort,
    searchField,
    selectedSortIndex,
    handleSetTableSearch,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChagenSelectedSortIndex,
    handleSetSearchField,
  ] = useFilter(initialSearch, initialTableSort, 50);

  const handlePrintPerTransacReport = useCallback(() => {
    if (soa) {
      UsePdf.printPdf(soa);
    }
  }, [soa]);

  const handleDownloadPerTransacReport = useCallback(() => {
    if (soa) {
      UsePdf.downloadPdf(soa, "Resident_Report.pdf");
    }
  }, [soa]);

  const handleClickSOA = useCallback(async () => {
    set_loading_soa(true);
    const filters: PaginationModel = {
      page: {
        begin: tablePage,
        limit: tableLimit,
      },
      sort: activeSort,
      filters: {
        ...tableSearch,
        ulo_fam_purok: tableSearch.ulo_fam_purok.filter((o: any) => o !== "all"),
        tinubdan_tubig: tableSearch.tinubdan_tubig.filter((o: any) => o !== "all"),
        matang_kasilyas: tableSearch.matang_kasilyas.filter((o: any) => o !== "all"),
        pasilidad_kuryente: tableSearch.pasilidad_kuryente.filter((o: any) => o !== "all"),
        matang_basura: tableSearch.matang_basura.filter((o: any) => o !== "all"),
        biktima_pangabuso: tableSearch.biktima_pangabuso.filter((o: any) => o !== "all"),
      },
    };
    const response = await FamilyApi.getFamilyDataTablePdf(filters);

    if (response.success) {
      set_soa(response.data);
    }
    set_loading_soa(false);
  }, [activeSort, tableLimit, tablePage, tableSearch]);

  useEffect(() => {
    let mounted = true;
    const fetchTableData = () => {
      const filters: PaginationModel = {
        page: {
          begin: tablePage,
          limit: tableLimit,
        },
        sort: activeSort,
        filters: {
          ...tableSearch,
          ulo_fam_purok: tableSearch.ulo_fam_purok.filter((o: any) => o !== "all"),
          tinubdan_tubig: tableSearch.tinubdan_tubig.filter((o: any) => o !== "all"),
          matang_kasilyas: tableSearch.matang_kasilyas.filter((o: any) => o !== "all"),
          pasilidad_kuryente: tableSearch.pasilidad_kuryente.filter((o: any) => o !== "all"),
          matang_basura: tableSearch.matang_basura.filter((o: any) => o !== "all"),
          biktima_pangabuso: tableSearch.biktima_pangabuso.filter((o: any) => o !== "all"),
        },
      };

      dispatch(FamilyActions.getFamilyDataTable(filters));
    };

    mounted && activeSort && fetchTableData();

    return () => {
      mounted = false;
    };
  }, [activeSort, dispatch, tableLimit, tablePage, tableSearch]);

  useEffect(() => {
    dispatch(
      setPageLinks([
        {
          link: "/admin/family",
          title: "Families",
        },
      ])
    );
  }, [dispatch]);
  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
          style={{
            backgroundColor: `#fff`,
            padding: `1em`,
            borderRadius: 10,
          }}
        >
          <Grid item xs={12} spacing={2} container justify="flex-end" alignItems="center">
            <Grid item>
              <NavLink to="/admin/family/add">
                <Button disableElevation color="primary" variant="contained">
                  Create Family
                </Button>
              </NavLink>
            </Grid>

            <Grid item>
              <LoadingButton handleClick={handleClickSOA} color="primary" variant="contained" loading={loading_soa} type="button">
                View Pdf Report
              </LoadingButton>
            </Grid>
          </Grid>
          {/* 
          <Grid
            xs={12}
            item
            container
            spacing={1}
            alignItems="center"
            alignContent="center"
          >
            <Grid
              item
              xs={12}
              md={6}
              container
              spacing={2}
              justify="flex-start"
              alignContent="center"
              alignItems="center"
            >
              <Grid item>
                <TablePagination
                  rowsPerPageOptions={[50, 100, 500]}
                  component="div"
                  count={!!family_table?.count ? family_table.count : -1}
                  rowsPerPage={tableLimit}
                  page={tablePage}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              container
              spacing={3}
              alignContent="center"
              alignItems="center"
              justify="flex-end"
            >
              <Grid item>
                <DataTableSort
                  handleChagenSelectedSortIndex={handleChagenSelectedSortIndex}
                  initialTableSort={initialTableSort}
                  selectedSortIndex={selectedSortIndex}
                />
              </Grid>

              <Grid item>
                <DataTableSearch
                  width={900}
                  FilterComponent={
                    <Formik
                      initialValues={tableSearch}
                      enableReinitialize
                      onSubmit={(form_values) => {
                        const filter_payload = {
                          ...form_values,
                        };
                        handleSetTableSearch(filter_payload);
                      }}
                    >
                      {() => (
                        <Form className="form">
                          
                        </Form>
                      )}
                    </Formik>
                  }
                />
              </Grid>
              <Grid item>
                
              </Grid>
            </Grid>
          </Grid> */}

          <Grid xs={12} item container spacing={1} alignItems="center" alignContent="center">
            <Grid item xs={12}>
              <Formik
                initialValues={tableSearch}
                enableReinitialize
                onSubmit={(form_values) => {
                  const filter_payload = {
                    ...form_values,
                  };
                  handleSetTableSearch(filter_payload);
                }}
              >
                {() => (
                  <Form className="form" id="form_instance">
                    <Grid container spacing={3} alignContent="center" alignItems="center" justify="flex-end">
                      <Grid item>
                        <DataTableSort
                          handleChagenSelectedSortIndex={handleChagenSelectedSortIndex}
                          initialTableSort={initialTableSort}
                          selectedSortIndex={selectedSortIndex}
                        />
                      </Grid>
                      <Grid item>
                        <FormikInputField
                          name="quick_search"
                          placeholder="Enter the first, last name..."
                          type="text"
                          fullWidth={true}
                          style={{
                            minWidth: 300,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="Click to apply search"
                                  type="submit"
                                  form="form_instance"
                                  color="primary"
                                  //  onClick={handleClickShowPassword}
                                >
                                  <SearchRoundedIcon color="primary" />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <DataTableSearch
                          width={450}
                          FilterComponent={
                            <Formik
                              initialValues={tableSearch}
                              enableReinitialize
                              onSubmit={(form_values) => {
                                const filter_payload = {
                                  ...form_values,
                                };
                                handleSetTableSearch(filter_payload);
                              }}
                            >
                              {() => (
                                <Form className="form">
                                  <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                      <FormikInputField
                                        name="ulo_pamilya_first_name"
                                        label="Head of the Family First Name"
                                        type="text"
                                        fullWidth={true}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    </Grid>
                                    <Grid item xs={6}>
                                      <FormikInputField
                                        name="ulo_pamilya_last_name"
                                        label="Head of the Family Last Name"
                                        type="text"
                                        fullWidth={true}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    </Grid>
                                    <Grid item xs={12}>
                                      <FormikCheckbox
                                        row={true}
                                        color="primary"
                                        name="ulo_fam_purok"
                                        label="Purok"
                                        data={[
                                          {
                                            id: "all",
                                            label: "Tanan",
                                          },
                                          {
                                            id: "1",
                                            label: "Purok 1",
                                          },
                                          {
                                            id: "2",
                                            label: "Purok 2",
                                          },
                                          {
                                            id: "3",
                                            label: "Purok 3",
                                          },
                                          {
                                            id: "4",
                                            label: "Purok 4",
                                          },
                                          {
                                            id: "5",
                                            label: "Purok 5",
                                          },
                                          {
                                            id: "6",
                                            label: "Purok 6",
                                          },
                                          {
                                            id: "7",
                                            label: "Purok 7",
                                          },
                                          {
                                            id: "8",
                                            label: "Purok 8",
                                          },
                                        ]}
                                      />
                                    </Grid>
                                    <Grid item xs={12}>
                                      <FormikCheckbox
                                        row={true}
                                        color="primary"
                                        name="tinubdan_tubig"
                                        label="1. Tinubdan sa tubig"
                                        data={[
                                          {
                                            id: "all",
                                            label: "Tanan",
                                          },
                                          {
                                            id: "blanko",
                                            label: "Blanko",
                                          },
                                          {
                                            id: "walay konesyon sa tubig",
                                            label: "walay konesyon sa tubig",
                                          },
                                          {
                                            id: "bomba",
                                            label: "bomba",
                                          },
                                          {
                                            id: "ulan",
                                            label: "ulan",
                                          },
                                          {
                                            id: "barangay water work",
                                            label: "barangay water work",
                                          },
                                          {
                                            id: "tubod",
                                            label: "tubod",
                                          },
                                          {
                                            id: "balon",
                                            label: "balon",
                                          },
                                          {
                                            id: "DCWD",
                                            label: "DCWD",
                                          },
                                        ]}
                                      />
                                    </Grid>

                                    <Grid item xs={12}>
                                      <FormikCheckbox
                                        row={true}
                                        color="primary"
                                        name="matang_kasilyas"
                                        label="2. Matang sa Kasilyas"
                                        data={[
                                          {
                                            id: "all",
                                            label: "Tanan",
                                          },
                                          {
                                            id: "blanko",
                                            label: "Blanko",
                                          },
                                          {
                                            id: "walay kasilyas",
                                            label: "walay kasilyas",
                                          },
                                          {
                                            id: "antipolo",
                                            label: "antipolo",
                                          },
                                          {
                                            id: "buhos",
                                            label: "buhos",
                                          },
                                          {
                                            id: "water-seated",
                                            label: "water-seated",
                                          },
                                        ]}
                                      />
                                    </Grid>

                                    <Grid item xs={12}>
                                      <FormikCheckbox
                                        row={true}
                                        color="primary"
                                        name="pasilidad_kuryente"
                                        label="3. Pasilidad sa Kurwente"
                                        data={[
                                          {
                                            id: "all",
                                            label: "Tanan",
                                          },
                                          {
                                            id: "blanko",
                                            label: "Blanko",
                                          },
                                          {
                                            label: "walay koneksyon",
                                            id: "walay koneksyon",
                                          },
                                          {
                                            label: "lampara (gas)",
                                            id: "lampara (gas)",
                                          },
                                          {
                                            label: "kandila",
                                            id: "kandila",
                                          },
                                          {
                                            label: "petromaks (gas)",
                                            id: "petromaks (gas)",
                                          },
                                          {
                                            label: "davao light",
                                            id: "davao light",
                                          },
                                        ]}
                                      />
                                    </Grid>
                                    <Grid item xs={12}>
                                      <FormikCheckbox
                                        row={true}
                                        color="primary"
                                        name="matang_basura"
                                        label="4. Matang sa Paghipos sa basura"
                                        data={[
                                          {
                                            id: "all",
                                            label: "Tanan",
                                          },
                                          {
                                            id: "blanko",
                                            label: "Blanko",
                                          },
                                          {
                                            label: "ginalain ang mabulok ug dili mabulok",
                                            id: "ginalain ang mabulok ug dili mabulok",
                                          },
                                          {
                                            label: "ginakolekta sa CENTRO O Barangay",
                                            id: "ginakolekta sa CENTRO O Barangay",
                                          },
                                          {
                                            label: "ginalubong",
                                            id: "ginalubong",
                                          },
                                          {
                                            label: "ginalabay",
                                            id: "ginalabay",
                                          },
                                        ]}
                                      />
                                    </Grid>
                                    <Grid item xs={12}>
                                      <FormikCheckbox
                                        row={true}
                                        color="primary"
                                        name="biktima_pangabuso"
                                        label="5. Biktima sa pang-abuso"
                                        data={[
                                          {
                                            id: "all",
                                            label: "Tanan",
                                          },
                                          {
                                            id: "blanko",
                                            label: "Blanko",
                                          },
                                          {
                                            label: "gibeya-an",
                                            id: "gibeya-an",
                                          },
                                          {
                                            label: "pangulata",
                                            id: "pangulata",
                                          },
                                          {
                                            label: "ginabaligya/illegal rekroter",
                                            id: "ginabaligya/illegal rekroter",
                                          },
                                          {
                                            label: "droga",
                                            id: "droga",
                                          },
                                          {
                                            label: "krime",
                                            id: "krime",
                                          },
                                        ]}
                                      />
                                    </Grid>

                                    <Grid item xs={12}>
                                      <Grid container spacing={2} justify="flex-end">
                                        <Grid item>
                                          <Button
                                            variant="contained"
                                            color="secondary"
                                            type="button"
                                            onClick={() => {
                                              const filter_payload = {
                                                quick_search: "",
                                                ulo_pamilya_first_name: "",
                                                ulo_pamilya_last_name: "",
                                                ulo_fam_purok: [],

                                                tinubdan_tubig: [],

                                                matang_kasilyas: [],

                                                pasilidad_kuryente: [],

                                                matang_basura: [],

                                                biktima_pangabuso: [],

                                                search: ``,
                                              };
                                              handleSetTableSearch(filter_payload);
                                            }}
                                          >
                                            Clear Filters
                                          </Button>
                                        </Grid>
                                        <Grid item>
                                          <Button
                                            variant="contained"
                                            color="secondary"
                                            type="button"
                                            onClick={() => {
                                              const filter_payload = {
                                                ...initialSearch,
                                                search: tableSearch.search,
                                              };
                                              handleSetTableSearch(filter_payload);
                                            }}
                                          >
                                            Reset Filters
                                          </Button>
                                        </Grid>
                                        <Grid item>
                                          <Button type="submit" variant="contained" color="primary">
                                            Apply Filters
                                          </Button>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Form>
                              )}
                            </Formik>
                          }
                        />
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>

              <Grid item></Grid>
            </Grid>

            <Grid item xs={12} container spacing={2} justify="flex-start" alignContent="center" alignItems="center">
              <Grid item>
                <TablePagination
                  rowsPerPageOptions={[50, 100, 250]}
                  component="div"
                  count={tableCount}
                  rowsPerPage={tableLimit}
                  page={tablePage}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <LinearLoadingProgress show={fetch_family_table} />
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Head of the Family</TableCell>
                    <TableCell>Purok</TableCell>
                    <TableCell>Family Members</TableCell>
                    {/* <TableCell>Kadugayon sa Pagpuyo</TableCell> */}
                    {/* <TableCell>Petsa</TableCell> */}
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {family_table?.table?.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="table-cell-profile">
                          <CustomAvatar
                            className="image"
                            variant="circle"
                            height={4}
                            width={4}
                            src={`${row?.ulo_pamilya_info?.pic}`}
                            errorMessage={`${row?.ulo_pamilya_info?.first_name?.charAt(0)}${row?.ulo_pamilya_info?.first_name?.charAt(0)}`}
                          />
                          <NavLink className="title" to={`/admin/resident/${row?.ulo_pamilya_info.resident_pk}`}>
                            <span style={{ textTransform: "capitalize" }}>
                              {row?.ulo_pamilya_info.last_name}
                              {", "}
                              {row?.ulo_pamilya_info.first_name} {row?.ulo_pamilya_info.middle_name} {row?.ulo_pamilya_info.suffix}
                            </span>
                          </NavLink>
                        </div>
                      </TableCell>

                      <TableCell>Purok {row?.ulo_pamilya_info?.purok}</TableCell>
                      <TableCell>
                        {/* */}

                        <Chip
                          onClick={() => set_selected_family_member(row.fam_members)}
                          label={
                            <>
                              <b>{row?.fam_members.length}</b> <small>kabuok miyembre</small>
                            </>
                          }
                          // label={`${row?.fam_members.length} kabuok sakop`}
                        />
                      </TableCell>
                      {/* <TableCell>
                        <small>
                          {InvalidDateTimeToDefault(row?.encoded_at, "-")}
                        </small>
                      </TableCell> */}
                      <TableCell align="center">
                        <IconButtonPopper
                          buttons={[
                            {
                              text: "Tan-awon ang tibuok impormasyon",
                              handleClick: () => {
                                history.push(`/admin/family/${row.fam_pk}`);
                              },
                            },
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        {soa && (
          <PreviewPDF
            file={soa}
            doc_title={`Family_Report.pdf`}
            type="pdf"
            handleClose={() => {
              set_soa(null);
            }}
            actions={
              <>
                <IconButton
                  onClick={() => {
                    handleDownloadPerTransacReport();
                  }}
                >
                  <GetAppRoundedIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    handlePrintPerTransacReport();
                  }}
                >
                  <PrintRoundedIcon />
                </IconButton>
              </>
            }
          />
        )}

        {selected_family_member && <DialogViewFamMem family_members={selected_family_member} handleClose={() => set_selected_family_member(null)} />}
      </Container>
    </>
  );
});

export default FamilyAdminView;
