"use client";

import { resetAccountData } from "@chomp/app/actions/demo";
import { Button } from "../Button/Button";

export function ResetAccountDataButton() {
  return (
    <Button variant="warning" isPill onClick={() => resetAccountData()}>
      Reset account data
    </Button>
  );
}
