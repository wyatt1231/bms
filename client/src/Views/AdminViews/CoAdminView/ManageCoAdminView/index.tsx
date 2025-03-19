import { Button, Chip, Grid } from "@material-ui/core";
import React, { FC, memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import CircularLoadingProgress from "../../../../Component/CircularLoadingProgress";
import CustomAvatar from "../../../../Component/CustomAvatar";
import { InvalidDateToDefault } from "../../../../Hooks/UseDateParser";
import { StringEmptyToDefault } from "../../../../Hooks/UseStringFormatter";
import AdminActions, { getSingleAdminAction } from "../../../../Services/Actions/AdminActions";
import { setGeneralPrompt, setPageLinks } from "../../../../Services/Actions/PageActions";
import { setSingleResidentAction } from "../../../../Services/Actions/ResidentActions";
import { AdministratorModel } from "../../../../Services/Models/AdminModel";
import { RootStore } from "../../../../Services/Store";
import { ManageResident } from "./styles";

interface IManageCoAdminView {}

export const ManageCoAdminView: FC<IManageCoAdminView> = memo(() => {
  const { admin_pk } = useParams<any>();
  const dispatch = useDispatch();

  console.log(`admin_pk`, admin_pk);

  const selected_admin = useSelector((store: RootStore) => store.AdminReducer.selected_admin);
  const fetching_selected_admin = useSelector((store: RootStore) => store.AdminReducer.fetching_selected_admin);

  const handleToggleActive = useCallback(
    (sts_pk: string) => {
      const payload: AdministratorModel = {
        sts_pk: sts_pk,
        admin_pk: admin_pk,
      };
      dispatch(
        setGeneralPrompt({
          open: true,
          continue_callback: () =>
            dispatch(
              AdminActions.changeAdminStatus(payload, (msg: string) => {
                dispatch(getSingleAdminAction(admin_pk));
              })
            ),
        })
      );
    },
    [admin_pk, dispatch]
  );

  useEffect(() => {
    dispatch(setSingleResidentAction(admin_pk));
  }, [dispatch, admin_pk]);

  useEffect(() => {
    dispatch(getSingleAdminAction(admin_pk));
  }, [dispatch, admin_pk]);

  useEffect(() => {
    dispatch(
      setPageLinks([
        {
          link: "/admin/administrator",
          title: "Administrator",
        },
        {
          link: window.location.pathname,
          title: "Impormasyon",
        },
      ])
    );
  }, [dispatch]);
  return (
    <ManageResident maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid container justify="flex-end" spacing={1}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => handleToggleActive(selected_admin?.sts_pk === "A" ? "X" : "A")}>
                {selected_admin?.sts_pk === "A" && "Deactivate"}
                {selected_admin?.sts_pk === "X" && "Activate"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <div
            style={{
              height: `100%`,
              width: `100%`,
              padding: `1em`,
              borderRadius: 7,
              backgroundColor: `#fff`,
            }}
          >
            <div className="title">Information of Administrator</div>
            {fetching_selected_admin ? (
              <CircularLoadingProgress />
            ) : (
              selected_admin && (
                <Grid container spacing={4}>
                  <Grid item xs={12} md={3} justify="center" spacing={1} container alignItems="flex-start" alignContent="flex-start">
                    <Grid item>
                      <CustomAvatar height={20} width={20} src={selected_admin?.pic} errorMessage={selected_admin?.firstname?.charAt(0)} />
                    </Grid>
                    <Grid
                      item
                      style={{
                        fontWeight: 900,
                        fontSize: `1.5em`,
                        textAlign: `center`,
                      }}
                      xs={12}
                    >
                      {selected_admin?.firstname} {selected_admin?.lastname}
                    </Grid>
                    <Grid item>
                      <Chip
                        label={selected_admin?.status?.sts_desc}
                        style={{
                          backgroundColor: selected_admin?.status?.sts_backgroundColor,
                          color: selected_admin?.status?.sts_color,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={4}>
                        <div className="info-group row">
                          <div className="label">Gender</div>
                          <div className="value">{selected_admin.gender === "m" ? "Lalaki" : "Babae"}</div>
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <div className="info-group row ">
                          <div className="label">Email Address</div>
                          <div className="value">{StringEmptyToDefault(selected_admin.email, "-")}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <div className="info-group row ">
                          <div className="label">Telephone Number</div>
                          <div className="value">{StringEmptyToDefault(selected_admin.phone, "-")}</div>
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <div className="info-group row ">
                          <div className="label">Joined At</div>
                          <div className="value">{InvalidDateToDefault(selected_admin.encoded_at, "-")}</div>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )
            )}
          </div>
        </Grid>
      </Grid>
    </ManageResident>
  );
});

export default ManageCoAdminView;
