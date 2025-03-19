import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React, { FC, memo } from "react";
import CustomAvatar from "../../../../Component/CustomAvatar";
import FormDialog from "../../../../Component/FormDialog/FormDialog";
import { FamMemberModel } from "../../../../Services/Models/FamilyModel";
interface IDialogViewFamMem {
  family_members: Array<FamMemberModel>;
  handleClose: () => void;
}

export const DialogViewFamMem: FC<IDialogViewFamMem> = memo(({ family_members, handleClose }) => {
  return (
    <>
      <FormDialog
        open={!!family_members}
        title="Family Members"
        handleClose={() => {
          handleClose();
        }}
        body={
          <>
            <TableContainer
              style={{
                maxHeight: 400,
              }}
            >
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Relationship</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {family_members?.length <= 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No Family Members added.
                      </TableCell>
                    </TableRow>
                  )}
                  {family_members?.map((f, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div
                          style={{
                            display: `grid`,
                            gridGap: `.5em`,
                            alignItems: `center`,
                            alignContent: `center`,
                            justifyContent: `start`,
                            gridAutoFlow: `column`,
                          }}
                        >
                          <CustomAvatar
                            height={3}
                            width={3}
                            errorMessage={f?.resident_info?.first_name.charAt(0) + f?.resident_info?.last_name.charAt(0)}
                            src={f?.resident_info?.pic}
                          />
                          <div>
                            {f?.resident_info?.last_name} {f?.resident_info?.first_name} {f?.resident_info?.middle_name} {f?.resident_info?.suffix}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>{f.rel}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        }
      />
    </>
  );
});

export default DialogViewFamMem;
