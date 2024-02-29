import { useRef, useState } from 'preact/hooks';
import QRCode from 'qrcode.react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { getFieldValue, useQRScoutState } from '../../store/store';
import { Config } from '../inputs/BaseInputProps';
import { CloseButton } from './CloseButton';
import { PreviewText } from './PreviewText';
import { NextButton } from './NextButton';
import { useSaveState } from '../../store/store';

export interface QRModalProps {
  show: boolean;
  onDismiss: () => void;
  type: string;
}

export function getQRCodeData(formData: Config): string {
  return formData.sections
    .map(s => s.fields)
    .flat()
    .map(v => `${v.value}`.replace(/\n/g, ' '))
    .join('\t');
}

export function QRModal(props: QRModalProps) {
  const modalRef = useRef(null);
  const formData = useQRScoutState(state => state.formData);

  const title = `${getFieldValue('robot')} - M${getFieldValue(
    'matchNumber',
  )}`.toUpperCase();

  const saveData = useSaveState(state => state.saveData);
//  const isSaveData = useSaveState(state => state.isSaveData);
  const [index, setCodeIndex] = useState(0);

  let qrCodeData = getQRCodeData(formData);
  if (props.type == "saved") {
    qrCodeData = saveData[index];
  }

  function goNext () {
    if (index > saveData.length -1 ){
      setCodeIndex(0);
      props.onDismiss();
      return;
    }
    if (saveData.length > 0){
      qrCodeData = saveData[index]
      setCodeIndex(index + 1)
    }
    else {
      setCodeIndex(0);
      props.onDismiss();
    }
  }

  function dismiss() {
    setCodeIndex(0);
    props.onDismiss();
  }
  
  useOnClickOutside(modalRef, dismiss);
  
  return (
    <>
      {props.show && (
        <>
          <div
            className="fixed inset-0 h-full w-full overflow-y-auto bg-gray-600 bg-opacity-50 dark:bg-opacity-70 backdrop-blur-sm "
            id="my-modal"
          />
          <div
            ref={modalRef}
            className="fixed top-20 rounded-md bg-white border shadow-lg w-96"
          >
            <div className="flex flex-col items-center pt-8 ">
              <CloseButton onClick={dismiss} />
              <QRCode className="m-2 mt-4" size={256} value={qrCodeData} />
              <h1 className="text-3xl text-gray-800 font-rhr-ns ">{title}</h1>
              <PreviewText data={qrCodeData} />
              <NextButton onClick={goNext} disabled={index >= saveData.length - 1}/>
            </div>
          </div>
        </>
      )}
    </>
  );
}
