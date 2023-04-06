import { Container, ScrollableContainer } from '@terra-money/apps/components';
import { Panel } from 'components/panel';
import { NFTPairs, useDAONFTTreasury, useNFTsOwnersQuery } from 'queries';
import { TreasuryTokensOverview } from './TreasuryTokensOverview';
import styles from './TreasuryOverview.module.sass';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { NFTCard } from './NFTCard';
import { Text } from 'components/primitives';
import { useDAONFTsWhitelist } from 'queries/useDAONFTsWhitelist';
import { CW20Addr } from '@terra-money/apps/types';


export const TreasuryOverview = () => {
  
  const dao = useCurrentDao();
  const {data: whitelist= []} = useDAONFTsWhitelist(dao.address) 
  console.log(dao);

  let nftCollection: NFTPairs[] | undefined = [];
  const { data } = useNFTsOwnersQuery(whitelist as CW20Addr[], dao.address);
  if (dao.type !== 'nft') {
    nftCollection = data
  } else {
    nftCollection = []
  }
  
  
  
  return (
    <>
      <Panel className={styles.root}>
        <Container direction="column" gap={32}>
          <TreasuryTokensOverview />
        </Container>
      </Panel>
      <Container className={styles.nftAssets} direction="column" gap={8}>
        <Text className={styles.label} variant="heading4">
          NFT Treasury
        </Text>
        <ScrollableContainer className={styles.scrollableContainer}>
          <Container direction="row" gap={8} className={styles.nftContainer}>
            <>
            
              {nftCollection?.length && nftCollection[0]?.tokenIds.length !== 0 ? (
                nftCollection.filter(nftColitem => nftColitem.tokenIds.length !== 0).map((nft, index) => {
                  return <NFTCard key={index} nftCollectionAdress={nft.collectionAddress} tokenIds={nft.tokenIds.tokens} />;
                })
              ) : (
                <Container className={styles.noNFTToDisplay}>
                  <Text className={styles.noNFTLabel} variant="label">
                    No NFTs were added to the treasury yet.
                  </Text>
                </Container>
              )}
            </>
          </Container>
        </ScrollableContainer>
      </Container>
    </>
  );
};
