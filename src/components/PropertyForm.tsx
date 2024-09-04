import { useTranslation } from "next-i18next";
import { useFormContext } from "react-hook-form";

import { listTypeProperty } from "@/utils/list";

import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { FormTextArea } from "./FormTextArea";

export const PropertyForm = () => {
  const form = useFormContext();
  const { t } = useTranslation("property");

  return (
    <>
      <div className="grid grid-rows-3 grid-cols-1 gap-2 w-full max-w-xl">
        <FormInput required type="text" control={form.control} name="name" label={t("name.name")} placeholder={t("name.placeholder")} />
        <FormInput required type="text" control={form.control} name="address" label={t("address.name")} placeholder={t("address.placeholder")} />
        <FormSelect control={form.control} listOptions={listTypeProperty} name="propertyType" label={t("type-property.name")} placeholder={t("type-property.placeholder")} />
        <div className="grid grid-cols-2 gap-2">
          <FormInput required type="number" control={form.control} name="price" label={t("price.name")} placeholder={t("price.placeholder")} />
          <FormInput required type="number" control={form.control} name="capacity" label={t("capacity.name")} placeholder={t("capacity.placeholder")} />
        </div>
      </div>

      <FormTextArea control={form.control} name="description" label={t("description.name")} placeholder={t("description.placeholder")} />

    </>
  )
}