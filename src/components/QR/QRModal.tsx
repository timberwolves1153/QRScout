import { Copy, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useState, useMemo } from 'react';
import { getFieldValue, useQRScoutState, clearSaveData, useSaveState, saveData  } from '../../store/store';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { PreviewText } from './PreviewText';

export interface QRModalProps {
  disabled?: boolean;
}

export function QRModal(props: QRModalProps) {
  const fieldValues = useQRScoutState(state => state.fieldValues);

  const title = `${getFieldValue('robot')} - M${getFieldValue(
    'matchNumber',
  )}`.toUpperCase();

  const [stored, isStored] = useSaveState(state => [state.saveData, state.isSaveData]);
  const [index, setCodeIndex] = useState(0);

  const currentFormData = useMemo(() => fieldValues.map(f => f.value).join(','), [fieldValues])
  if (index >= stored.length && index > 0){
    setCodeIndex(0)
  }
 const qrCodeData = stored[index]

  return (
    <Dialog>
      <Button
        disabled={props.disabled}
        onClick={() => saveData(currentFormData)}>
          Save
      </Button>
      <DialogTrigger asChild>
        <Button 
          disabled={stored.length == 0}
          onClick={() => {setCodeIndex(0)}}
        >
          <QrCode className="size-5" />
          Show QR
        </Button>
      </DialogTrigger>
      
      <Button
        disabled={!isStored}
          onClick={() => {
            if (!confirm("Clear saved QR codes?")){
              return
            }
            setCodeIndex(0); clearSaveData()}}
        >
          Clear data
        </Button>
      <DialogContent>
        <DialogTitle className="text-3xl text-primary text-center font-rhr-ns tracking-wider ">
          {title}
        </DialogTitle>
        <div className="flex flex-col items-center gap-6">
          <div className="bg-white p-4 rounded-md">
            <QRCodeSVG className="m-2 mt-4" size={256} value={qrCodeData} />
          </div>
          <PreviewText data={qrCodeData} />
        </div>
        <DialogFooter>
        
        <Button
            variant="ghost"
            onClick={() => setCodeIndex(index - 1)}
            disabled={index <= 0}
            >PREV CODE
          </Button>
          <Button
            variant="ghost"
            onClick={() => setCodeIndex(index + 1)}
            disabled={index >= stored.length - 1}
            >NEXT CODE
            </Button>
          <Button
            variant="ghost"
            onClick={() => navigator.clipboard.writeText(qrCodeData)}
          >
            <Copy className="size-4" /> Copy Data
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
