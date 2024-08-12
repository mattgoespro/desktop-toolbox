import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

export type ItemBatchSize = "single" | "batch";

type ItemBatchRadioGroupProps = {
  onChange: (count: ItemBatchSize) => void;
};

export function ItemBatchRadioGroup(props: ItemBatchRadioGroupProps) {
  return (
    <RadioGroup
      aria-labelledby="item-count-radio-label"
      defaultValue="single"
      name="item-count-radio-group"
      row
      onChange={(event) => props.onChange(event.target.value as "single" | "batch")}
    >
      <FormControlLabel label="Single" control={<Radio />} value="single" labelPlacement="top" />
      <FormControlLabel
        label="Batch"
        control={<Radio />}
        value="batch"
        labelPlacement="top"
        disabled={true}
      />
    </RadioGroup>
  );
}
