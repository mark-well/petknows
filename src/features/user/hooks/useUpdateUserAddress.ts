import { useForm } from "react-hook-form";
import { AddressFormType } from "../types";

export default function useUpdateUserAddress() {
  const { control, handleSubmit, reset } = useForm<AddressFormType>();

  const submit = (data: AddressFormType) => {};

  return {
    control,
    handleSubmit,
    submit,
    reset,
  };
}
