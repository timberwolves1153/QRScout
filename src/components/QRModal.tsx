import QRCode from 'qrcode.react';
import { useState } from 'preact/hooks';

export interface QRModalProps {
  show: boolean;
  title: string;
  data: Array<string>;
  onDismiss: () => void;
}

export default function QRModal(props: QRModalProps) {
  const [curIndex, setIndex] = useState(0)

  function closeQR() {
    setIndex(0)
    props.onDismiss()
  }

  function nextCode() {
    if (curIndex > props.data.length) {
      closeQR()
    }
    setIndex(curIndex + 1)
  }

  return (
    <>
      {props.show && (
        <>
          <div
            className="fixed inset-0 h-full w-full overflow-y-auto bg-gray-600 bg-opacity-50"
            id="my-modal"
          />
          <div className="fixed top-20 rounded-md border bg-white p-5 shadow-lg">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl">{props.title.toUpperCase()}</h1>            
              <QRCode className="m-2 mt-4" size={256} value={props.data[curIndex]} />
              <div className="mt-4 flex w-full flex-row items-center justify-between">
                <div
                  onClick={() =>
                    navigator.clipboard.writeText(props.data + '\n')
                  }
                >
                  <svg
                    className="mr-4 h-8 w-8 text-gray-500 hover:text-gray-800 "
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />{' '}
                    <rect x="8" y="8" width="12" height="12" rx="2" />{' '}
                    <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                  </svg>
                </div>
                <div>
                
                <button
                  className="focus:shadow-outline rounded bg-primary py-2 px-4 mx-2 font-bold text-white hover:bg-red-700 focus:outline-none"
                  type="button"
                  onClick={closeQR}
                >Close</button>
                <button
                  className="focus:shadow-outline rounded bg-primary py-2 px-4 font-bold text-white hover:bg-red-700 focus:outline-none disabled:bg-red-300"
                  type="button"
                  onClick={nextCode}
                  disabled={props.data.length - curIndex <= 1}
                >
                  Next
                </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
