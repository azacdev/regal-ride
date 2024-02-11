import Select from "react-select";
import { OptionType } from "../../types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type CustomFilterType = {
  title: string;
  options: OptionType[];
};

const CustomFilter = ({ title, options }: CustomFilterType) => {
  const [selected, setSelected] = useState<OptionType | null>();
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    // Determine the parameter to be added to the URL
    const key = title === "Fuel Type" ? "fuel" : "year";

    // If a value is selected, add it to the URL
    if (selected?.value) {
      params.set(key, selected.value.toLowerCase());
    } else {
      // If the value of the selected option is empty, remove the parameter from the URL
      params.delete(key);
    }

    // Update the URL
    setParams(params);
  }, [selected]);

  return (
    <div className="w-fit">
      <Select
        onChange={(e) => setSelected(e)}
        placeholder={title}
        options={options}
        className="text-black min-w-[100px]"
      />
    </div>
  );
};

export default CustomFilter;
