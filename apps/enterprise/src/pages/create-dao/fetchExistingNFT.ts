import { FormModifier } from '@terra-money/apps/hooks';
import { validateAddress } from '@terra-money/apps/utils';
import { fetchCW721ContractInfo } from 'queries';
import { DaoWizardState } from './DaoWizardFormProvider';
import { LCDClient } from '@terra-money/feather.js';

export const fetchExistingNFT = async (
  dispatch: FormModifier<DaoWizardState>,
  lcd: LCDClient,
  tokenAddr: string
) => {
  const existingNFTError = validateAddress(tokenAddr);

  dispatch({
    existingNFT: undefined,
    existingNFTLoading: existingNFTError === undefined,
    existingNFTError,
  });

  if (existingNFTError === undefined) {
    try {
      dispatch({
        existingNFT: await fetchCW721ContractInfo(lcd, tokenAddr),
        existingNFTLoading: false,
        existingNFTError: undefined,
      });
    } catch (e) {
      dispatch({
        existingNFT: undefined,
        existingNFTLoading: false,
        existingNFTError: 'The existing NFT could not be found.',
      });
    }
  }
};
