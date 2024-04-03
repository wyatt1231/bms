import { Button, ButtonGroup, PropTypes } from "@material-ui/core";
import React, { memo, FC, useState, useEffect } from "react";

interface ButtonItem {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

interface ICustomButtonGroup {
  buttons: Array<ButtonItem>;
  variant?: "text" | "contained" | "outlined";
  color?: PropTypes.Color;
  getViewValue?: (val: any) => void;
}

export const CustomButtonGroup: FC<ICustomButtonGroup> = memo(
  ({ variant, color, buttons, getViewValue }) => {
    const [view, set_view] = useState<number>(0);

    useEffect(() => {
      getViewValue(view);
    }, [view]);

    return (
      <ButtonGroup
        variant={variant}
        color={color}
        aria-label="text primary button group"
        disableElevation
      >
        {buttons.map((b, i) => (
          <Button
            key={`button-group` + i}
            variant={view === i ? "contained" : "text"}
            onClick={() => set_view(i)}
          >
            {b.text}
          </Button>
        ))}
      </ButtonGroup>
    );
  }
);

export default CustomButtonGroup;
