type Locale = "ar" | "en" | string;

const localesDir = `${__dirname}/../app/locales/`;
const FALLBACK = "en";

class Translation {
  private locale: Locale;

  constructor(locale: Locale = FALLBACK) {
    this.setLocale(locale);
  }

  private setLocale(locale: Locale) {
    this.locale = locale;
    return this;
  }

  private getLocale(): Locale {
    return this.locale;
  }

  public getMessage(message: string): string {
    let locale = require(`${localesDir}${FALLBACK}.json`);
    try {
      locale = require(`${localesDir}${this.getLocale()}.json`);
    } catch (error) {
      console.error(
        `tring to locate ${localesDir}${this.getLocale()}.json but was not found.`
      );
    }
    if (locale[message]) return locale[message];
    else return locale.__DEFAULT;
  }
}

export default Translation;
