import React from "react";
import { Alert } from "@material-tailwind/react";

export function AlertDismissible() {
  const [open, setOpen] = React.useState(true);

  return (
    <>
      {open && (
        <Alert
          onClose={() => setOpen(false)}
          className="p-3 mt-10 mb-10 bg-blue-400 border "

        >
          <span className="font-semibold">Registration Successful!</span>

        </Alert>
      )}
    </>
  );
}
