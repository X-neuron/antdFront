import useLocaleModel from "@/models/useLocale";

const DataLocales = () => {
  const { intl } = useLocaleModel();
  const start = new Date();
  const end = new Date();
  const expires = new Date();
  return (
    <>
      <div>{intl.get("SALE_START", { start })}</div>
      <div>{intl.get("SALE_END", { end })}</div>
      <div>{intl.get("COUPON", { expires })}</div>
    </>
  )
}

export default DataLocales;
