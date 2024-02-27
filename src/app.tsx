import { useState } from 'preact/hooks';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { QRModal } from './components/QR';
import { Sections } from './components/Sections';
import { CommitAndResetSection } from './components/Sections/CommitAndResetSection/CommitAndResetSection';
import { ConfigSection } from './components/Sections/ConfigSection';
import { useQRScoutState, useSaveState, saveData, clearSaveData } from './store/store';
import { getQRCodeData } from './components/QR';

export function App() {
  const formData = useQRScoutState(state => state.formData);
  const savedData = useSaveState(state => state.saveData)
  const [showQR, setShowQR] = useState(false);
  const [type, setType] = useState("commit")

  return (
    <div className="min-h-screen py-2 dark:bg-gray-700">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="font-sans text-6xl font-bold">
          <div className={`font-rhr text-red-rhr`}>{formData.page_title}</div>
        </h1>
        <QRModal show={showQR} onDismiss={() => setShowQR(false)} type={type} />

        <form className="w-full px-4">
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <Sections />
            <CommitAndResetSection 
              onCommit={() => {setType("commit"); setShowQR(true)}} 
              onLoad={() => {
                setType("saved")
                setShowQR(true) 
              }}
              onSave={() => {
                const newData = getQRCodeData(formData)
                if (newData == savedData[savedData.length - 1 ]){
                  if (confirm("Form hasn't changed, are you sure you want to save?")) {
                    saveData(newData)
                  }
                }
                else {
                  saveData(newData)
                }
              }}
              onClearSave={() => {
                if (confirm("Are you sure you want to clear the saved codes?")){
                  clearSaveData()
                }
              }}
            />
            <ConfigSection />
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
