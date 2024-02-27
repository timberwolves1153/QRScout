import { useMemo } from 'preact/hooks';
import { useQRScoutState, useSaveState } from '../../../store/store';
import { CommitButton } from './CommitButton';
import { ResetButton } from './ResetButton';
import { SaveButton } from './SaveButton';
import { LoadButton } from './LoadButton';
import { ClearSaveButton } from './ClearSaveButton';

export type CommitAndResetSectionProps = {
  onCommit: () => void;
  onLoad: () => void;
  onSave: () => void;
  onClearSave: () => void;
};

export function CommitAndResetSection(props: CommitAndResetSectionProps) {
  const formData = useQRScoutState(state => state.formData);
  const isSaveData = useSaveState(state => state.isSaveData)
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

  return (
    <div className="mb-4 flex flex-col justify-center rounded bg-white py-2 shadow-md dark:bg-gray-600">
      <CommitButton
        disabled={missingRequiredFields.length > 0}
        onClick={props.onCommit}
      />
      <SaveButton 
        disabled={missingRequiredFields.length > 0 }
        onClick={props.onSave}
      />
      <LoadButton
        disabled={!isSaveData}
        onClick={props.onLoad} 
      />
      <ClearSaveButton
        disabled={!isSaveData}
        onClick={props.onClearSave}
      />
      <ResetButton />
    </div>
  );
}
