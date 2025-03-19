import { Grid } from "@material-ui/core";
import React, { FC, memo } from "react";
import FormDialog from "../../../../Component/FormDialog/FormDialog";
import { InvalidDateToDefault } from "../../../../Hooks/UseDateParser";
import { ResidentModel } from "../../../../Services/Models/ResidentModels";
interface IResidentInfo {
  resident: ResidentModel;
  handleSetResident: (val: any) => void;
}

export const ResidentInfo: FC<IResidentInfo> = memo(({ resident, handleSetResident }) => {
  return (
    <>
      <FormDialog
        open={resident !== null}
        title="Tibuok Information of Risedente"
        maxWidth={"sm"}
        handleClose={() => handleSetResident(null)}
        body={
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="info-group-column">
                <div className="label">Last Name</div>
                <div className="value">{resident?.last_name}</div>
              </div>
              <div className="info-group-column">
                <div className="label">First Name</div>
                <div className="value">{resident?.first_name}</div>
              </div>
              <div className="info-group-column">
                <div className="label">Middle Name</div>
                <div className="value">{resident?.middle_name}</div>
              </div>
              <div className="info-group-column">
                <div className="label">Suffix</div>
                <div className="value">{resident?.suffix}</div>
              </div>
              <div className="info-group-column">
                <div className="label">Sex</div>
                <div className="value">{resident?.gender === "m" ? "Male" : "Female"}</div>
              </div>
              <div className="info-group-column">
                <div className="label">Birth Date</div>
                <div className="value">{InvalidDateToDefault(new Date(resident?.birth_date), "-")}</div>
              </div>

              <div className="info-group-column">
                <div className="label">Civil Status</div>
                <div className="value">{resident?.civil_status}</div>
              </div>
              <div className="info-group-column">
                <div className="label">Religion</div>
                <div className="value">{resident?.religion}</div>
              </div>
              <div className="info-group-column">
                <div className="label">Tribe</div>
                <div className="value">{resident?.tribe}</div>
              </div>
              <div className="info-group-column">
                <div className="label">School Attainment</div>
                {/* <div className="value">{resident?.suffix}</div> */}
              </div>
              <div className="info-group-column">
                <div className="label">Living Status</div>
                {/* <div className="value">{resident?.suffix}</div> */}
              </div>
              {/* <div className="info-group-column">
                <div className="label">Kahimtang sa panglawas</div>
              </div> */}
            </Grid>
          </Grid>
        }
      />
    </>
  );
});

export default ResidentInfo;
