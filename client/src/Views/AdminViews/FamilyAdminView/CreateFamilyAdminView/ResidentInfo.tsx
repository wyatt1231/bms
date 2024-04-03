import { Grid } from "@material-ui/core";
import React, { FC, memo } from "react";
import FormDialog from "../../../../Component/FormDialog/FormDialog";
import { InvalidDateToDefault } from "../../../../Hooks/UseDateParser";
import { ResidentModel } from "../../../../Services/Models/ResidentModels";
interface IResidentInfo {
  resident: ResidentModel;
  handleSetResident: (val: any) => void;
}

export const ResidentInfo: FC<IResidentInfo> = memo(
  ({ resident, handleSetResident }) => {
    return (
      <>
        <FormDialog
          open={resident !== null}
          title="Tibuok Impormasyon sa Risedente"
          maxWidth={"sm"}
          handleClose={() => handleSetResident(null)}
          body={
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="info-group-column">
                  <div className="label">Apilyedo</div>
                  <div className="value">{resident?.last_name}</div>
                </div>
                <div className="info-group-column">
                  <div className="label">Pangalan</div>
                  <div className="value">{resident?.first_name}</div>
                </div>
                <div className="info-group-column">
                  <div className="label">Apilyedo sa Inahan/pagkadalaga</div>
                  <div className="value">{resident?.middle_name}</div>
                </div>
                <div className="info-group-column">
                  <div className="label">Suffix</div>
                  <div className="value">{resident?.suffix}</div>
                </div>
                <div className="info-group-column">
                  <div className="label">Sekso</div>
                  <div className="value">
                    {resident?.gender === "m" ? "Lalaki" : "Babae"}
                  </div>
                </div>
                <div className="info-group-column">
                  <div className="label">Natawhan</div>
                  <div className="value">
                    {InvalidDateToDefault(new Date(resident?.birth_date), "-")}
                  </div>
                </div>

                <div className="info-group-column">
                  <div className="label">Estado Sibil</div>
                  <div className="value">{resident?.civil_status}</div>
                </div>
                <div className="info-group-column">
                  <div className="label">Relihiyon</div>
                  <div className="value">{resident?.religion}</div>
                </div>
                <div className="info-group-column">
                  <div className="label">Tribo</div>
                  <div className="value">{resident?.tribe}</div>
                </div>
                <div className="info-group-column">
                  <div className="label">
                    Grado nakab-ot: Nag-eskwela/wala nag eskwela
                  </div>
                  {/* <div className="value">{resident?.suffix}</div> */}
                </div>
                <div className="info-group-column">
                  <div className="label">
                    Matang sa trabaho kanunay / panagsa
                  </div>
                  {/* <div className="value">{resident?.suffix}</div> */}
                </div>
                <div className="info-group-column">
                  <div className="label">Kahimtang sa panglawas</div>
                  {/* <div className="value">{resident?.suffix}</div> */}
                </div>
              </Grid>
            </Grid>
          }
        />
      </>
    );
  }
);

export default ResidentInfo;
