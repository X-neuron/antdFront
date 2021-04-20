import { Suspense } from "react";
import { i18n } from "@lingui/core"
import { I18nProvider } from "@lingui/react"
import PageLoading from "@/components/PageLoading";
import { useMount } from "ahooks";
import { ConfigProvider } from "antd";
import { curLangAtom,antdLocaleAtom } from "@/atoms";
import { useRecoilValue } from "recoil";

// import zh from "@/locales/zh-CN"; // 默认加载中文。 lingui-detect尚不稳定


const Locale = ({ children }) => {
  const lang = useRecoilValue(curLangAtom);
  const antdLocale = useRecoilValue(antdLocaleAtom);

  useMount(async () => {
    const { messages } = await import(/* webpackChunkName: 'i18n' */`@/locales/zh-CN.js`);
    i18n.load(lang, messages)
    i18n.activate(lang)
  })

  return (
    <Suspense fallback={<PageLoading />} >
      <I18nProvider i18n={i18n}>
        <ConfigProvider locale={antdLocale}>
          {children}
        </ConfigProvider>
      </I18nProvider>
    </Suspense>
  )
}

export default Locale;
