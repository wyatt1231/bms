import DateFnsUtils from "@date-io/date-fns";
import {
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import ClearAllRounded from "@material-ui/icons/ClearAllOutlined";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "chartjs-plugin-datalabels";
import "chartjs-plugin-labels";

import moment from "moment";
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { Doughnut, Line, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import img_chart from "../../../Assets/Images/Icons/chart.png";
import img_female from "../../../Assets/Images/Icons/female.png";
import img_male from "../../../Assets/Images/Icons/male.png";
import CircularLoadingProgress from "../../../Component/CircularLoadingProgress";
import CustomAvatar from "../../../Component/CustomAvatar";
import LinearLoadingProgress from "../../../Component/LinearLoadingProgress";
import { InvalidDateTimeToDefault } from "../../../Hooks/UseDateParser";
import ComplaintActions from "../../../Services/Actions/ComplaintActions";
import DashboardActions from "../../../Services/Actions/DashboardActions";
import NewsActions from "../../../Services/Actions/NewsActions";
import { setPageLinks } from "../../../Services/Actions/PageActions";
import { YearlyStatsModel } from "../../../Services/Models/DashboardModel";
import { RootStore } from "../../../Services/Store";
import { Colors } from "../../../Storage/LocalDatabase";

// import { ArcElement, Chart as ChartJS, Tooltip as ChartTooltip, Legend } from "chart.js";
// ChartJS.register(ArcElement, ChartTooltip, Legend);

interface IDashbboardAdminView {}

const puroks = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const DashbboardAdminView: FC<IDashbboardAdminView> = memo(() => {
  const dispatch = useDispatch();

  const overall_population = useSelector((store: RootStore) => store.DashboardReducer.overall_population);

  const fetch_overall_population = useSelector((store: RootStore) => store.DashboardReducer.fetch_overall_population);

  const gender_stats = useSelector((store: RootStore) => store.DashboardReducer.gender_stats);

  const fetch_gender_stats = useSelector((store: RootStore) => store.DashboardReducer.fetch_gender_stats);

  const age_group_stats_year_1 = useSelector((store: RootStore) => store.DashboardReducer.age_group_stats_year_1);
  const age_group_stats_year_2 = useSelector((store: RootStore) => store.DashboardReducer.age_group_stats_year_2);
  const fetch_age_group_stats = useSelector((store: RootStore) => store.DashboardReducer.fetch_age_group_stats);

  const life_stage_stats = useSelector((store: RootStore) => store.DashboardReducer.life_stage_stats);
  const fetch_life_stage_stats = useSelector((store: RootStore) => store.DashboardReducer.fetch_life_stage_stats);

  const news_stats = useSelector((store: RootStore) => store.DashboardReducer.news_stats);
  const fetch_news_stats = useSelector((store: RootStore) => store.DashboardReducer.fetch_news_stats);

  const complaint_stats = useSelector((store: RootStore) => store.DashboardReducer.complaint_stats);

  const fetch_complaint_stats = useSelector((store: RootStore) => store.DashboardReducer.fetch_complaint_stats);

  const news_latest = useSelector((store: RootStore) => store.NewsReducer.news_latest);
  const fetch_news_latest = useSelector((store: RootStore) => store.NewsReducer.fetch_news_latest);

  const latest_complaint = useSelector((store: RootStore) => store.ComplaintReducer.latest_complaint);
  const fetch_latest_complaint = useSelector((store: RootStore) => store.ComplaintReducer.fetch_latest_complaint);

  const total_population = useSelector((store: RootStore) => store.DashboardReducer.total_population);
  const fetch_total_population = useSelector((store: RootStore) => store.DashboardReducer.fetch_total_population);

  const total_death = useSelector((store: RootStore) => store.DashboardReducer.total_death);
  const fetch_total_death = useSelector((store: RootStore) => store.DashboardReducer.fetch_total_death);

  const total_sc = useSelector((store: RootStore) => store.DashboardReducer.total_sc);
  const fetch_total_sc = useSelector((store: RootStore) => store.DashboardReducer.fetch_total_sc);

  const total_pwd = useSelector((store: RootStore) => store.DashboardReducer.total_pwd);
  const fetch_total_pwd = useSelector((store: RootStore) => store.DashboardReducer.fetch_total_pwd);

  //

  const stats_biktima_pangabuso_year_1 = useSelector((store: RootStore) => store.DashboardReducer.stats_biktima_pangabuso_year_1);
  const stats_biktima_pangabuso_year_2 = useSelector((store: RootStore) => store.DashboardReducer.stats_biktima_pangabuso_year_2);
  const fetch_stats_biktima_pangabuso = useSelector((store: RootStore) => store.DashboardReducer.fetch_stats_biktima_pangabuso);
  //
  const stats_pasilidad_kuryente = useSelector((store: RootStore) => store.DashboardReducer.stats_pasilidad_kuryente);
  const fetch_stats_pasilidad_kuryente = useSelector((store: RootStore) => store.DashboardReducer.fetch_stats_pasilidad_kuryente);

  //
  const stats_kahimtang_komunidad = useSelector((store: RootStore) => store.DashboardReducer.stats_kahimtang_komunidad);
  const fetch_stats_kahimtang_komunidad = useSelector((store: RootStore) => store.DashboardReducer.fetch_stats_kahimtang_komunidad);
  //
  const stats_matang_basura = useSelector((store: RootStore) => store.DashboardReducer.stats_matang_basura);
  const fetch_stats_matang_basura = useSelector((store: RootStore) => store.DashboardReducer.fetch_stats_matang_basura);
  //
  const stats_matang_kasilyas = useSelector((store: RootStore) => store.DashboardReducer.stats_matang_kasilyas);
  const fetch_stats_matang_kasilyas = useSelector((store: RootStore) => store.DashboardReducer.fetch_stats_matang_kasilyas);

  const [dashboard_year_1, set_dashboard_year_1] = useState(moment().subtract(1, `year`).toDate());
  const [dashboard_year_2, set_dashboard_year_2] = useState(moment().toDate());

  const [purok, set_purok] = useState(["1", "2", "3", "4", "5", "6", "7", "8"]);

  const handleUncheckPurok = useCallback((purok: string) => {
    set_purok((p) => {
      var index = p.indexOf(purok);
      if (index !== -1) {
        p.splice(index, 1);
      }

      return [...p];
    });
  }, []);

  const handleCheckPurok = useCallback((purok: string) => {
    set_purok((p) => {
      p.push(purok);
      return [...p];
    });
  }, []);

  const handleCheckAllPurok = useCallback(() => {
    set_purok((p) => {
      return [...puroks];
    });
  }, []);

  useEffect(() => {
    // dispatch(FamilyActions.getAllFamily(purok));
    const year_1 = moment(dashboard_year_1).format("YYYY");
    const year_2 = moment(dashboard_year_2).format("YYYY");

    const filters = {
      purok: purok,
      year_1: year_1,
      year_2: year_2,
    };

    dispatch(DashboardActions.totalPopulation(filters));
    dispatch(DashboardActions.setAgeGroupStats(filters));
    dispatch(DashboardActions.setGenderStats(filters));
    dispatch(DashboardActions.setLifeStageStats(filters));
    dispatch(DashboardActions.totalDeath(filters));
    dispatch(DashboardActions.totalPwd(filters));
    dispatch(DashboardActions.totalSc(filters));

    dispatch(DashboardActions.StatsPasilidadKuryente(filters));
    dispatch(DashboardActions.StatsBiktikmaPangabuso(filters));
    dispatch(DashboardActions.StatsKahimtangKomunidad(filters));
    dispatch(DashboardActions.StatsMatangBasura(filters));
    dispatch(DashboardActions.StatsMatangKasilyas(filters));
  }, [dispatch, purok, dashboard_year_1, dashboard_year_2]);

  useEffect(() => {
    dispatch(DashboardActions.setOverallPopulation(purok));
  }, [dispatch, purok]);

  useEffect(() => {
    dispatch(NewsActions.getNewsLatest());
    dispatch(ComplaintActions.getComplaintLatest());
    dispatch(DashboardActions.statsNews());
    dispatch(DashboardActions.statsComplaint());
  }, [dispatch]);

  useEffect(() => {
    let mounted = true;

    const settingPageLinks = () => {
      dispatch(
        setPageLinks([
          {
            link: "/admin/dashboard",
            title: "Dashboard",
          },
        ])
      );
    };

    mounted && settingPageLinks();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const setToArray = (arr: any[]) => {
    const uniqueSet: any = new Set(arr);
    const uniqueArray = [...uniqueSet];
    return uniqueArray;
  };
  const getYear1 = () => {
    return !!dashboard_year_1 ? moment(dashboard_year_1).format(`YYYY`) : `<Not Set>`;
  };

  const getYear2 = () => {
    return !!dashboard_year_2 ? moment(dashboard_year_2).format(`YYYY`) : `<Not Set>`;
  };

  return (
    <>
      <div style={{ padding: `0 1.5em` }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item>
                <FormControl fullWidth component="fieldset">
                  <FormLabel
                    style={{
                      display: `grid`,
                      justifyContent: `center`,
                      justifyItems: `center`,
                      margin: `.3em 0`,
                    }}
                    component="legend"
                  >
                    Pilia nag purok na gusto makita
                  </FormLabel>
                  <FormGroup row={true}>
                    <FormControlLabel
                      label={`Tanan Purok`}
                      checked={purok.length === 8}
                      onChange={() => {
                        handleCheckAllPurok();
                      }}
                      control={<Checkbox color="primary" />}
                    />
                    {puroks.map((p) => (
                      <FormControlLabel
                        key={`filter-purok` + p}
                        label={`Purok ${p}`}
                        checked={purok.includes(p)}
                        onChange={() => {
                          console.log(`purok.includes(p)`, purok.includes(p));
                          if (purok.includes(p)) {
                            handleUncheckPurok(p);
                          } else {
                            handleCheckPurok(p);
                          }
                        }}
                        control={<Checkbox />}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Grid>

              <Grid item>
                <Tooltip title="Clear Filters">
                  <IconButton
                    style={{ marginTop: "18px" }}
                    color="primary"
                    size="small"
                    onClick={() => {
                      set_purok([]);
                    }}
                  >
                    <ClearAllRounded />
                  </IconButton>
                </Tooltip>

                {/* <Button
                  style={{
                    marginTop: "8px",
                  }}
                  variant="contained"
                  color="secondary"
                  type="button"
                  size="small"
                  onClick={() => {
                    set_purok([]);
                  }}
                >
                  Clear Filters
                </Button> */}
              </Grid>
            </Grid>
          </Grid>

          <Grid item container spacing={2} xs={12}>
            <Grid item xs={6} md={3}>
              <div className="stats-item">
                <div className="value">{fetch_total_population ? <CircularProgress /> : total_population}</div>
                <div className="label">TIBUOK PAPOLASYON</div>
              </div>
            </Grid>

            <Grid item xs={6} md={3}>
              <div className="stats-item">
                <div className="value">{fetch_total_death ? <CircularProgress /> : total_death}</div>
                <div className="label">NAMATAY</div>
              </div>
            </Grid>
            <Grid item xs={6} md={3}>
              <div className="stats-item">
                <div className="value">{fetch_total_pwd ? <CircularProgress /> : total_pwd}</div>
                <div className="label">PWD</div>
              </div>
            </Grid>
            <Grid item xs={6} md={3}>
              <div className="stats-item">
                <div className="value">{fetch_total_sc ? <CircularProgress /> : total_sc}</div>
                <div className="label">Senior Citizen</div>
              </div>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div
              style={{
                padding: `1em`,
                paddingTop: `.5em`,
                width: `100%`,
                height: `100%`,
                borderRadius: 5,
                boxShadow: `0 2px 5px rgba(0,0,0,.1)`,
              }}
            >
              <div className="title">Tinuig nga Estadistika sa sulod sa pulo (10) ka tuig</div>
              {fetch_overall_population || !overall_population ? (
                <CircularLoadingProgress />
              ) : (
                <Line
                  type="line"
                  height={50}
                  data={{
                    labels: overall_population.labels,
                    datasets: [
                      {
                        label: "Buhi",
                        yAxesGroup: "1",
                        fill: false,
                        fillColor: "blue",
                        strokeColor: "blue",
                        highlightFill: "blue",
                        highlightStroke: "blue",
                        borderColor: "blue",
                        scales: {
                          yAxes: [
                            {
                              stacked: true,
                            },
                          ],
                        },
                        data: overall_population.alive,
                      },
                      {
                        label: "Namatay",
                        yAxesGroup: "2",
                        fill: false,
                        fillColor: "red",
                        strokeColor: "red",
                        highlightFill: "red",
                        highlightStroke: "red",
                        borderColor: "red",
                        scales: {
                          yAxes: [
                            {
                              stacked: true,
                            },
                          ],
                        },
                        data: overall_population.death,
                      },
                    ],
                  }}
                  options={{
                    responsiveAnimationDuration: 1,
                    scales: {
                      yAxes: [
                        {
                          scaleLabel: {
                            display: true,
                            labelString: "Population",
                            lineHeight: 2,
                            fontColor: `#333`,
                            fontFamily: `Nunito`,
                          },
                          ticks: {
                            beginAtZero: true,
                            userCallback: function (label, index, labels) {
                              // when the floored value is the same as the value we have a whole number
                              if (Math.floor(label) === label) {
                                return label;
                              }
                            },
                          },
                        },
                      ],
                    },
                  }}
                />
              )}
            </div>
          </Grid>

          <Grid item xs={12}>
            <Grid container justify="center" spacing={3}>
              <Grid item>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    views={["year"]}
                    label={"Unang Tuig"}
                    value={dashboard_year_1}
                    onChange={(date: Date) => {
                      set_dashboard_year_1(date);
                    }}
                    autoOk
                    disableFuture
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    views={["year"]}
                    label={"Ikaduhang Tuig"}
                    value={dashboard_year_2}
                    onChange={(date: Date) => {
                      set_dashboard_year_2(date);
                    }}
                    autoOk
                    disableFuture
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <div
              style={{
                backgroundColor: `#fff`,
                boxShadow: `0 2px 5px rgba(0, 0, 0, 0.1)`,
                padding: `1em`,
                paddingTop: `.5em`,

                borderRadius: 5,
                height: `100%`,
              }}
            >
              <div className="title">Estadistika sa Grupo sa Edad</div>

              {fetch_age_group_stats || !age_group_stats_year_1 || !age_group_stats_year_2 ? (
                <CircularLoadingProgress />
              ) : (
                <Line
                  type="line"
                  height={175}
                  data={{
                    labels: setToArray([...age_group_stats_year_1.labels, ...age_group_stats_year_2.labels]),
                    datasets: [
                      {
                        label: getYear1(),
                        fillColor: "blue",
                        strokeColor: "blue",
                        highlightFill: "blue",
                        highlightStroke: "blue",
                        borderColor: "blue",
                        scales: {
                          yAxes: [
                            {
                              stacked: true,
                            },
                          ],
                        },
                        data: age_group_stats_year_1.data_set,
                      },
                      {
                        label: getYear2(),
                        fillColor: "red",
                        strokeColor: "red",
                        highlightFill: "red",
                        highlightStroke: "red",
                        borderColor: "red",
                        scales: {
                          yAxes: [
                            {
                              stacked: true,
                            },
                          ],
                        },
                        data: age_group_stats_year_2.data_set,
                      },
                    ],
                  }}
                  options={{
                    responsiveAnimationDuration: 1,
                    scales: {
                      yAxes: [
                        {
                          scaleLabel: {
                            display: true,
                            labelString: "Population",
                            lineHeight: 2,
                            fontColor: `#333`,
                            fontFamily: `Nunito`,
                          },
                          ticks: {
                            beginAtZero: true,
                            userCallback: function (label, index, labels) {
                              // when the floored value is the same as the value we have a whole number
                              if (Math.floor(label) === label) {
                                return label;
                              }
                            },
                          },
                        },
                      ],
                    },
                  }}
                />
              )}
            </div>
          </Grid>

          <Grid item xs={12} md={4}>
            <div
              style={{
                backgroundColor: `#fff`,
                boxShadow: `0 2px 5px rgba(0, 0, 0, 0.1)`,
                padding: `1em`,
                paddingTop: `.5em`,

                borderRadius: 5,
                height: `100%`,
              }}
            >
              <div className="title">Estadistika sa Biktima sa Pang-abuso</div>
              <div
                style={{
                  padding: `1em`,
                  paddingTop: `.5em`,
                }}
              >
                {fetch_stats_biktima_pangabuso || !stats_biktima_pangabuso_year_1 || !stats_biktima_pangabuso_year_2 ? (
                  <CircularLoadingProgress />
                ) : (
                  <div style={{ display: `grid`, gridAutoFlow: `column`, gridAutoColumns: `1fr 1fr` }}>
                    <div className="pie-chart-wrapper">
                      <label>{getYear1()}</label>

                      {stats_biktima_pangabuso_year_1.some((p) => p.total > 0) ? (
                        <Pie
                          type="pie"
                          data={{
                            datasets: [
                              {
                                labels: stats_biktima_pangabuso_year_1.map((a) => a.label),
                                data: stats_biktima_pangabuso_year_1.map((a) => a.total),
                                backgroundColor: [`red`, `orange`, `yellow`, `green`, `blue`],
                                borderColor: "#fff",
                              },
                            ],
                          }}
                          options={{
                            responsive: true, // Disable responsiveness
                            maintainAspectRatio: false, // Allow custom width & height
                            tooltips: {
                              callbacks: {
                                label: function (tooltipItem) {
                                  const label = stats_biktima_pangabuso_year_1.map((a) => a.label)[tooltipItem.index]; // Corresponding label
                                  return `${label}`;
                                },
                              },
                            },
                            plugins: {
                              labels: {
                                render: "percentage",
                                precision: 0,
                                showZero: true,
                                fontSize: 12,
                                fontColor: "#fff",
                              },
                            },
                          }}
                        />
                      ) : (
                        <label>No census found in {getYear1()}</label>
                      )}
                    </div>

                    <div className="pie-chart-wrapper">
                      <label>{getYear2()}</label>
                      {stats_biktima_pangabuso_year_2.some((p) => p.total > 0) ? (
                        <Pie
                          type="pie"
                          data={{
                            datasets: [
                              {
                                labels: stats_biktima_pangabuso_year_2.map((a) => a.label),
                                data: stats_biktima_pangabuso_year_2.map((a) => a.total),
                                backgroundColor: [`red`, `orange`, `yellow`, `green`, `blue`],
                                borderColor: "#fff",
                              },
                            ],
                          }}
                          options={{
                            responsive: true, // Disable responsiveness
                            maintainAspectRatio: false, // Allow custom width & height
                            tooltips: {
                              callbacks: {
                                label: function (tooltipItem) {
                                  const label = stats_biktima_pangabuso_year_2.map((a) => a.label)[tooltipItem.index]; // Corresponding label
                                  return `${label}`;
                                },
                              },
                            },
                            plugins: {
                              labels: {
                                render: "percentage",
                                precision: 0,
                                showZero: true,
                                fontSize: 12,
                                fontColor: "#fff",
                              },
                            },
                          }}
                        />
                      ) : (
                        <label>No census found in {getYear2()}</label>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={4}></Grid>

          <Grid item xs={12} md={4}>
            <div
              style={{
                backgroundColor: `#fff`,
                boxShadow: `0 2px 5px rgba(0, 0, 0, 0.1)`,
                padding: `1em`,
                paddingTop: `.5em`,

                borderRadius: 5,
                height: `100%`,
              }}
            >
              <div className="title">Estadistika sa Pasilidad sa Kuryente</div>
              <div
                style={{
                  padding: `1em`,
                  paddingTop: `.5em`,
                }}
              >
                {fetch_stats_pasilidad_kuryente || !stats_pasilidad_kuryente ? (
                  <CircularLoadingProgress />
                ) : (
                  <Pie
                    type="pie"
                    height={200}
                    data={{
                      labels: stats_pasilidad_kuryente.map((a) => a.label),
                      datasets: [
                        {
                          labels: stats_pasilidad_kuryente.map((a) => a.label),
                          data: stats_pasilidad_kuryente.map((a) => a.total),
                          backgroundColor: stats_pasilidad_kuryente.map((a) => {
                            const color = Colors[Math.floor(Math.random() * Colors.length)];
                            return color;
                          }),
                          borderColor: "#fff",
                        },
                      ],
                    }}
                    options={{
                      responsiveAnimationDuration: 1,
                      tooltips: {
                        enabled: false,
                      },
                      plugins: {
                        labels: {
                          render: "percentage",
                          precision: 0,
                          showZero: true,
                          fontSize: 12,
                          fontColor: "#fff",
                        },
                      },
                    }}
                  />
                )}
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={4}>
            <div
              style={{
                backgroundColor: `#fff`,
                boxShadow: `0 2px 5px rgba(0, 0, 0, 0.1)`,
                padding: `1em`,
                paddingTop: `.5em`,

                borderRadius: 5,
                height: `100%`,
              }}
            >
              <div className="title">Estadistika sa Kahimtang sa Komunidad</div>
              <div
                style={{
                  padding: `1em`,
                  paddingTop: `.5em`,
                }}
              >
                {fetch_stats_kahimtang_komunidad || !stats_kahimtang_komunidad ? (
                  <CircularLoadingProgress />
                ) : (
                  <Pie
                    type="pie"
                    height={200}
                    data={{
                      labels: stats_kahimtang_komunidad.map((a) => a.label),
                      datasets: [
                        {
                          labels: stats_kahimtang_komunidad.map((a) => a.label),
                          data: stats_kahimtang_komunidad.map((a) => a.total),
                          backgroundColor: stats_kahimtang_komunidad.map((a) => {
                            const color = Colors[Math.floor(Math.random() * Colors.length)];
                            return color;
                          }),
                          borderColor: "#fff",
                        },
                      ],
                    }}
                    options={{
                      responsiveAnimationDuration: 1,
                      tooltips: {
                        enabled: false,
                      },
                      plugins: {
                        labels: {
                          render: "percentage",
                          precision: 0,
                          showZero: true,
                          fontSize: 12,
                          fontColor: "#fff",
                        },
                      },
                    }}
                  />
                )}
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={4}>
            <div
              style={{
                backgroundColor: `#fff`,
                boxShadow: `0 2px 5px rgba(0, 0, 0, 0.1)`,
                padding: `1em`,
                paddingTop: `.5em`,

                borderRadius: 5,
                height: `100%`,
              }}
            >
              <div className="title">Estadistika sa Matang sa Basura</div>
              <div
                style={{
                  padding: `1em`,
                  paddingTop: `.5em`,
                }}
              >
                {fetch_stats_matang_basura || !stats_matang_basura ? (
                  <CircularLoadingProgress />
                ) : (
                  <Pie
                    type="pie"
                    height={200}
                    data={{
                      labels: stats_matang_basura.map((a) => a.label),
                      datasets: [
                        {
                          labels: stats_matang_basura.map((a) => a.label),
                          data: stats_matang_basura.map((a) => a.total),
                          backgroundColor: stats_matang_basura.map((a) => {
                            const color = Colors[Math.floor(Math.random() * Colors.length)];
                            return color;
                          }),
                          borderColor: "#fff",
                        },
                      ],
                    }}
                    options={{
                      responsiveAnimationDuration: 1,
                      tooltips: {
                        enabled: false,
                      },
                      plugins: {
                        labels: {
                          render: "percentage",
                          precision: 0,
                          showZero: true,
                          fontSize: 12,
                          fontColor: "#fff",
                        },
                      },
                    }}
                  />
                )}
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={4}>
            <div
              style={{
                backgroundColor: `#fff`,
                boxShadow: `0 2px 5px rgba(0, 0, 0, 0.1)`,
                padding: `1em`,
                paddingTop: `.5em`,

                borderRadius: 5,
                height: `100%`,
              }}
            >
              <div className="title">Estadistika sa Matang sa Kasilyas</div>
              <div
                style={{
                  padding: `1em`,
                  paddingTop: `.5em`,
                }}
              >
                {fetch_stats_matang_kasilyas || !stats_matang_kasilyas ? (
                  <CircularLoadingProgress />
                ) : (
                  <Pie
                    type="pie"
                    height={200}
                    data={{
                      labels: stats_matang_kasilyas.map((a) => a.label),
                      datasets: [
                        {
                          labels: stats_matang_kasilyas.map((a) => a.label),
                          data: stats_matang_kasilyas.map((a) => a.total),
                          backgroundColor: stats_matang_kasilyas.map((a) => {
                            const color = Colors[Math.floor(Math.random() * Colors.length)];
                            return color;
                          }),
                          borderColor: "#fff",
                        },
                      ],
                    }}
                    options={{
                      responsiveAnimationDuration: 1,
                      tooltips: {
                        enabled: false,
                      },
                      plugins: {
                        labels: {
                          render: "percentage",
                          precision: 0,
                          showZero: true,
                          fontSize: 12,
                          fontColor: "#fff",
                        },
                      },
                    }}
                  />
                )}
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={8}>
            <div
              style={{
                backgroundColor: `#fff`,
                boxShadow: `0 2px 5px rgba(0, 0, 0, 0.1)`,
                padding: `1em`,
                paddingTop: `.5em`,
                borderRadius: 5,
                height: `100%`,
              }}
            >
              <div className="title">Proporsiyon sa Sekso</div>

              {fetch_gender_stats || !gender_stats ? (
                <CircularLoadingProgress />
              ) : (
                <div className="sekso-ctnr">
                  <div className="sekso-item">
                    <img className="dp" src={img_female} alt="" />
                    <div className="label">BABAE</div>
                    <div className="value">{gender_stats.data_set[1].y}</div>
                    <img className="graph" src={img_chart} alt="" />
                  </div>
                  <div className="sekso-item">
                    <img className="dp" src={img_male} alt="" />
                    <div className="label">LALAKI</div>
                    <div className="value">{gender_stats.data_set[0].y}</div>
                    <img className="graph" src={img_chart} alt="" />
                  </div>

                  <div style={{ justifySelf: `center`, alignSelf: `center` }}>
                    <Doughnut
                      data={{
                        labels: gender_stats.labels,
                        datasets: [
                          {
                            labels: gender_stats.labels,
                            data: findValuesOfStats(gender_stats.data_set),
                            backgroundColor: ["#5c6bc0", "#66bb6a"],
                            borderColor: "#fff",
                          },
                        ],
                      }}
                      options={{
                        responsiveAnimationDuration: 1,
                        tooltips: {
                          enabled: false,
                        },
                        plugins: {
                          labels: {
                            render: "percentage",
                            precision: 0,
                            showZero: true,
                            fontSize: 12,
                            fontColor: "#fff",
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div
              style={{
                backgroundColor: `#fff`,
                boxShadow: `0 2px 5px rgba(0, 0, 0, 0.1)`,
                padding: `1em`,
                paddingTop: `.5em`,

                borderRadius: 5,
                height: `100%`,
              }}
            >
              <div className="title">Proporsyon sa Edad</div>
              <div
                style={{
                  padding: `1em`,
                  paddingTop: `.5em`,
                }}
              >
                {fetch_life_stage_stats || !life_stage_stats ? (
                  <CircularLoadingProgress />
                ) : (
                  <Pie
                    type="pie"
                    height={200}
                    data={{
                      labels: life_stage_stats.labels,
                      datasets: [
                        {
                          labels: life_stage_stats.labels,
                          data: findValuesOfStats(life_stage_stats.data_set),
                          backgroundColor: ["#ef5350", "#66bb6a", "#5c6bc0"],
                          borderColor: "#fff",
                        },
                      ],
                    }}
                    options={{
                      responsiveAnimationDuration: 1,
                      tooltips: {
                        enabled: false,
                      },
                      plugins: {
                        labels: {
                          render: "percentage",
                          precision: 0,
                          showZero: true,
                          fontSize: 12,
                          fontColor: "#fff",
                        },
                      },
                    }}
                  />
                )}
              </div>
            </div>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} md={8}>
                <div
                  style={{
                    backgroundColor: `#fff`,
                    boxShadow: `0 2px 5px rgba(0, 0, 0, 0.1)`,
                    padding: `1em`,
                    paddingTop: `.5em`,

                    borderRadius: 5,
                    height: `100%`,
                  }}
                >
                  <div className="title">Mga Bag-ong Reklamo</div>

                  <TableContainer style={{ maxHeight: 300 }}>
                    <LinearLoadingProgress show={fetch_latest_complaint} />
                    <Table size="small" stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>Nag Reklamo</TableCell>
                          <TableCell>Ang Reklamo</TableCell>
                          <TableCell>Oras sa Pagreklamo</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {latest_complaint?.map((f, i) => (
                          <TableRow key={i}>
                            <TableCell>
                              <div className="table-cell-profile">
                                <CustomAvatar
                                  className="image"
                                  variant="circle"
                                  src={`${f.user?.pic}`}
                                  errorMessage={`${f.user?.full_name?.charAt(0)}`}
                                />
                                <div className="title">
                                  <span style={{ textTransform: "capitalize" }}>{f.user.full_name}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <b>{f.title}</b>
                            </TableCell>
                            <TableCell>
                              <small>{InvalidDateTimeToDefault(f.reported_at, "-")}</small>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div
                  style={{
                    backgroundColor: `#fff`,
                    boxShadow: `0 2px 5px rgba(0, 0, 0, 0.1)`,
                    padding: `1em`,
                    paddingTop: `.5em`,

                    borderRadius: 5,
                    height: `100%`,
                  }}
                >
                  <div className="title">Proporsyon sa estado sa mga reklamo</div>
                  <div
                    style={{
                      padding: `1em`,
                      paddingTop: `.5em`,
                    }}
                  >
                    {fetch_complaint_stats || !complaint_stats ? (
                      <CircularLoadingProgress />
                    ) : (
                      <Pie
                        type="pie"
                        height={200}
                        data={{
                          labels: complaint_stats.map((a) => a.label),
                          datasets: [
                            {
                              labels: complaint_stats.map((a) => a.label),
                              data: complaint_stats.map((a) => a.total),
                              backgroundColor: complaint_stats.map((a) => a.backgroundColor),
                              borderColor: "#fff",
                            },
                          ],
                        }}
                        options={{
                          responsiveAnimationDuration: 1,
                          tooltips: {
                            enabled: false,
                          },
                          plugins: {
                            labels: {
                              render: "percentage",
                              precision: 0,
                              showZero: true,
                              fontSize: 12,
                              fontColor: "#fff",
                            },
                          },
                        }}
                      />
                    )}
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} md={8}>
                <div
                  style={{
                    backgroundColor: `#fff`,
                    boxShadow: `0 2px 5px rgba(0, 0, 0, 0.1)`,
                    padding: `1em`,
                    paddingTop: `.5em`,

                    borderRadius: 5,
                    height: `100%`,
                  }}
                >
                  <div className="title">New News</div>

                  <TableContainer style={{ maxHeight: 300 }}>
                    <LinearLoadingProgress show={fetch_news_latest} />
                    <Table size="small" stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>Created</TableCell>
                          <TableCell>News Title</TableCell>
                          <TableCell>Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {news_latest?.map((f, i) => (
                          <TableRow key={i}>
                            <TableCell>
                              <div className="table-cell-profile">
                                <CustomAvatar
                                  className="image"
                                  variant="circle"
                                  src={`${f.user?.pic}`}
                                  errorMessage={`${f.user?.full_name?.charAt(0)}`}
                                />
                                <div className="title">
                                  <span style={{ textTransform: "capitalize" }}>{f.user?.full_name}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <b>{f.title}</b>
                            </TableCell>
                            <TableCell>
                              <small>{InvalidDateTimeToDefault(f.encoded_at, "-")}</small>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Grid>

              <Grid item xs={12} md={4}>
                <div
                  style={{
                    backgroundColor: `#fff`,
                    boxShadow: `0 2px 5px rgba(0, 0, 0, 0.1)`,
                    padding: `1em`,
                    paddingTop: `.5em`,

                    borderRadius: 5,
                    height: `100%`,
                  }}
                >
                  <div className="title">Proporsyon sa estado sa mga balita</div>
                  <div
                    style={{
                      padding: `1em`,
                      paddingTop: `.5em`,
                    }}
                  >
                    {fetch_news_stats || !news_stats ? (
                      <CircularLoadingProgress />
                    ) : (
                      <Pie
                        type="pie"
                        height={200}
                        data={{
                          labels: news_stats.map((a) => a.label),
                          datasets: [
                            {
                              labels: news_stats.map((a) => a.label),
                              data: news_stats.map((a) => a.total),
                              backgroundColor: news_stats.map((a) => a.backgroundColor),
                              borderColor: "black",
                              color: `black`,
                              borderWidth: 0.5,
                            },
                          ],
                        }}
                        options={{
                          responsiveAnimationDuration: 1,
                          tooltips: {
                            enabled: false,
                          },
                          plugins: {
                            labels: {
                              render: "percentage",
                              precision: 0,
                              showZero: true,
                              fontSize: 12,
                              fontColor: "#fff",
                            },
                          },
                        }}
                      />
                    )}
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
});

export default DashbboardAdminView;

const findValuesOfStats = (data_set: Array<YearlyStatsModel>): Array<number | string> => {
  const values: Array<number | string> = [];

  data_set.forEach((d) => {
    values.push(d.y);
  });

  return values;
};
