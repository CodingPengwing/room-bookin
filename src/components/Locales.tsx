/* eslint-disable */
import { ReactNode, useEffect, useState } from "react";

// third-party
import { IntlProvider, MessageFormatElement } from "react-intl";

// project import
import useConfig from "@/components/hooks/useConfig";
import { I18n } from "@/components/types/config";

// load locales files
const loadLocaleData = (locale: I18n) => {
  switch (locale) {
    case "en":
    default:
      return import("@/components/utils/locales/en.json");
  }
};

// ==============================|| LOCALIZATION ||============================== //

interface Props {
  children: ReactNode;
}

export default function Locales({ children }: Props) {
  const { i18n } = useConfig();

  const [messages, setMessages] = useState<
    Record<string, string> | Record<string, MessageFormatElement[]> | undefined
  >();

  useEffect(() => {
    loadLocaleData(i18n).then(
      (d: {
        default:
          | Record<string, string>
          | Record<string, MessageFormatElement[]>
          | undefined;
      }) => {
        setMessages(d.default);
      }
    );
  }, [i18n]);

  return (
    <>
      {messages && (
        <IntlProvider locale={i18n} defaultLocale="en" messages={messages}>
          {children as React.ReactElement}
        </IntlProvider>
      )}
    </>
  );
}
