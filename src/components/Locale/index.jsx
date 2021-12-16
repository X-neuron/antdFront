// import { Suspense } from "react";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
// import PageLoading from "@/components/PageLoading";
import { useMount } from "ahooks";
import { ConfigProvider } from "antd";
import { useRecoilValue } from "recoil";
import { antdLocaleAtom, curLocaleLoadAtom } from "@/atoms/locale";

// import zh from "@/locales/zh-CN"; // 默认加载中文。 lingui-detect尚不稳定

const Locale = function({ children }) {
  const defaultLang = useRecoilValue(curLocaleLoadAtom);
  const lang = useRecoilValue(curLocaleLoadAtom);
  const antdLocale = useRecoilValue(antdLocaleAtom);

  useMount(async () => {
    const { messages } = await import(
      /* webpackChunkName: 'i18n' */ `@/locales/${defaultLang}.js`
    );
    i18n.load(lang, messages);
    i18n.activate(lang);
  });

  return (
    <I18nProvider i18n={i18n}>
      <ConfigProvider locale={antdLocale}>{children}</ConfigProvider>
    </I18nProvider>
  );
}

export default Locale;
