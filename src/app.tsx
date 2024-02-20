import { useTheme } from 'next-themes';
import { useMemo, useState } from 'preact/hooks';
import { Logo } from './components/Logo';
import QRModal from './components/QRModal';
import Section from './components/Section';
import Button, { Variant } from './components/core/Button';
import {
  getQRCodeData,
  resetSections,
  resetToDefaultConfig,
  uploadConfig,
  useQRScoutState,
  saveData,
  clearSaveData,
  useSaveState
} from './store/store';

export function App() {
  const { theme, setTheme } = useTheme();

  const formData = useQRScoutState(state => state.formData);

  const [showQR, setShowQR] = useState(false);
  const [whichCode, setCode] = useState(-1);
  const isSaveData = useSaveState(state => state.isSaveData);
  const savedData = useSaveState(state => state.saveData);
  const [isMoreData, setMore] = useState(false)

  const missingRequiredFields = useMemo(() => {
    return formData.sections
      .map(s => s.fields)
      .flat()
      .filter(
        f =>
          f.required &&
          (f.value === null || f.value === undefined || f.value === ``),
      );
  }, [formData]);

  function getFieldValue(code: string): any {
    return formData.sections
      .map(s => s.fields)
      .flat()
      .find(f => f.code === code)?.value;
  }

  function download(filename: string, text: string) {
    var element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(text),
    );
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  function downloadConfig() {
    const configDownload = { ...formData };

    configDownload.sections.forEach(s =>
      s.fields.forEach(f => (f.value = undefined)),
    );
    download('QRScout_config.json', JSON.stringify(configDownload));
  }

  function getCurrentQRCodeData(): string {
    if (whichCode === -1) {
      setMore(false)
      return getQRCodeData();
    }
    setMore(true)
    return savedData[whichCode];
  }
  
  function dismissQR(fastExit: boolean) {
    if (fastExit) {
      setShowQR(false)
      setCode(-1)
      return
    }
    if (whichCode >= savedData.length - 1 || whichCode === -1) {
      setCode(-1)
      setMore(false)
      setShowQR(false)
    }
    else if (whichCode >= savedData.length - 2){
      setShowQR(false)
      setMore(false)
      setCode(-1);
      setShowQR(true);
    }
    else {
      setShowQR(false)
      setMore(true)
      setCode(whichCode + 1);
      setShowQR(true)
    }
  }

  return (
    <div className="min-h-screen py-2 dark:bg-gray-700">
      <head>
        <title>QRScout|{formData.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="font-sans text-6xl font-bold">
          <div className={`font-rhr text-red-rhr`}>{formData.page_title}</div>
        </h1>
        <QRModal
          show={showQR}
          title={`${getFieldValue('robot')} - ${getFieldValue('matchNumber')}`}
          data={getCurrentQRCodeData()}
          onDismiss={dismissQR}
          isMore={isMoreData}
        />

        <form className="w-full px-4">
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {formData.sections.map(section => {
              return <Section key={section.name} name={section.name} />;
            })}

<div className="mb-4 flex flex-col justify-center rounded bg-white py-2 shadow-md dark:bg-gray-600">
              <button
                className="focus:shadow-outline mx-2 my-2 rounded bg-gray-700 py-6 px-6 font-bold uppercase text-white hover:bg-gray-700 focus:shadow-lg focus:outline-none disabled:bg-gray-300 dark:bg-red-rhr"
                type="button"
                onClick={() => {setCode(-1); setShowQR(true)}}
                disabled={missingRequiredFields.length > 0}
              >
                Show Current QRCode
              </button>
              <button
                className="focus:shadow-outline mx-2 my-2 rounded bg-gray-700 py-3 px-6 font-bold uppercase text-white hover:bg-gray-700 focus:shadow-lg focus:outline-none disabled:bg-gray-300 dark:bg-red-rhr"
                type="button"
                onClick={() => {saveData(getQRCodeData())}}
                disabled={missingRequiredFields.length > 0}
              >
                Save QR to Local Storage
              </button>
              <button
                className="focus:shadow-outline mx-2 my-2 rounded bg-gray-700 py-3 px-6 font-bold uppercase text-white hover:bg-gray-700 focus:shadow-lg focus:outline-none disabled:bg-gray-300 dark:bg-red-rhr"
                type="button"
                onClick={() => {setCode(0); setShowQR(true)}}
                disabled={!isSaveData}
              >
                Load QR from Local Storage
              </button>
              <button
                className="focus:shadow-outline mx-2 my-6 rounded border border-red-rhr bg-red-400 py-2 font-bold uppercase text-red-rhr hover:bg-red-200 focus:outline-none dark:bg-red-500 dark:text-white dark:hover:bg-gray-700 disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:border-gray-300"
                type="button"
                onClick={() => {if (confirm("Are you sure you want to clear the data?")){clearSaveData()}}}
                disabled={!isSaveData}
              >
                Clear Saved Data
              </button>
              <button
                className="focus:shadow-outline mx-2 my-6 rounded border border-red-rhr bg-white py-2 font-bold uppercase text-red-rhr hover:bg-red-200 focus:outline-none dark:bg-gray-500 dark:text-white dark:hover:bg-gray-700"
                type="button"
                onClick={() => resetSections()}
              >
                Reset Form
              </button>
            </div>
            <div className="mb-4 flex flex-col justify-center rounded bg-white shadow-md dark:bg-gray-600 gap-2 p-2">
              <Button
                variant={Variant.Secondary}
                onClick={() =>
                  navigator.clipboard.writeText(
                    formData.sections
                      .map(s => s.fields)
                      .flat()
                      .map(f => f.title)
                      .join('\t'),
                  )
                }
              >
                Copy Column Names
              </Button>
              <Button
                variant={Variant.Secondary}
                onClick={() => downloadConfig()}
              >
                Download Config
              </Button>
              <label className="mx-2 flex cursor-pointer flex-row justify-center rounded bg-gray-500 py-2 text-center font-bold text-white shadow-sm hover:bg-gray-600">
                <span className="text-base leading-normal">Upload Config</span>
                <input
                  type="file"
                  className="hidden"
                  accept=".json"
                  onChange={e => uploadConfig(e)}
                />
              </label>
              <div className="mx-2 flex flex-col justify-start bg-gray-500 p-2 rounded">
                <div className="rounded-t pb-2 text-left font-bold text-white">
                  Theme
                </div>
                <select
                  className="rounded bg-white px-4 py-2 dark:bg-gray-700 dark:text-white"
                  name="Theme"
                  id="theme"
                  onInput={v => setTheme(v.currentTarget.value)}
                  value={theme}
                >
                  <option key={'system'} value={'system'}>
                    System
                  </option>
                  <option key={'dark'} value={'dark'}>
                    Dark
                  </option>
                  <option key={'light'} value={'light'}>
                    Light
                  </option>
                </select>
              </div>

              <Button
                variant={Variant.Secondary}
                onClick={() => resetToDefaultConfig()}
              >
                Reset To Default Config
              </Button>
            </div>
          </div>
        </form>
      </main>
      <footer>
        <div className="mt-8 flex h-24 flex-col items-center justify-center p-2">
          <Logo />
        </div>
      </footer>
    </div>
  );
}
