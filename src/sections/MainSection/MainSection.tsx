import { useChain } from '@cosmos-kit/react';
import { useAtomValue, useSetAtom } from 'jotai';
import waves2 from '@/assets/images/waves-test.svg';
import { defaultChainName } from '@/constants';
import { useWalletAssets } from '@/hooks/useWalletAssets';
import { useEffect } from 'react';
import { ErrorMessageAtom, WalletAssetsAtom } from './atoms';
import { WalletInfoContainer } from '@/components';
import { airdropRecipients } from './airdropList';

export const SwapSection = () => {
  const errorMessage = useAtomValue(ErrorMessageAtom);
  const setWalletAssets = useSetAtom(WalletAssetsAtom);

  const { data } = useWalletAssets();
  const { address: sendAddress } = useChain(defaultChainName);

  // Look up the airdrop entries for the sendAddress
  const airdropInfo = sendAddress
    ? airdropRecipients[sendAddress] ?? null
    : null;

  useEffect(() => {
    setWalletAssets(data?.assets ?? []);
  }, [data]);

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute bg-hero-blur-circle blur-[180px] w-[372px] rounded-full top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 transition-size duration-500"
        style={{ minHeight: '372px' }}
      />
      <div className="flex justify-center items-center min-h-[inherit] relative z-[1] px-25px md:px-6">
        <div
          className="flex flex-col max-w-[882px] text-center items-center gap-4"
          style={{ marginTop: '6rem', marginBottom: '2rem' }}
        >
          <WalletInfoContainer
            airdropRecipients={airdropRecipients}
            airdropInfo={airdropInfo}
          />
          <div className="min-h-[24px]">
            <p className="text-error">{errorMessage}</p>
          </div>
        </div>
      </div>
      <img
        className="absolute bottom-0 w-full h-[291px]"
        src={waves2}
        alt="Waves"
      />
    </div>
  );
};
