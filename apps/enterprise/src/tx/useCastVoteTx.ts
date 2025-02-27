import { useTx, TxBuilder } from '@terra-money/apps/libs/transactions';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { assertDefined } from '@terra-money/apps/utils';
import { useChainID } from '@terra-money/apps/hooks';

interface VoteOnProposalTxOptions {
  id: number;
  outcome: enterprise.VoteOutcome;
  contract: string;
}

interface MultisigExecuteMsg {
  cast_vote: {
    proposal_id: number;
    vote: enterprise.VoteOutcome;
  };
}

export const useCastVoteTx = (proposalVotingType: enterprise.ProposalType) => {
  const myAddress = useMyAddress()
  const chainID = useChainID()

  return useTx<VoteOnProposalTxOptions>(
    (options) => {
      const { id, outcome, contract } = options;

      const cast_vote = {
        proposal_id: id,
        outcome,
      };

      const payload = TxBuilder.new()
        .execute<MultisigExecuteMsg | enterprise.ExecuteMsg>(
          assertDefined(myAddress),
          contract,
          proposalVotingType === 'council' ? { cast_council_vote: cast_vote } : { cast_vote }
        )
        .build();

      return {
        ...payload,
        chainID
      }
    },
    {
      txKey: TX_KEY.CAST_VOTE,
    }
  );
};
