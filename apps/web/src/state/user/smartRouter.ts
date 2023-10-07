import { useAtom } from 'jotai'
import atomWithStorageWithErrorCatch from 'utils/atomWithStorageWithErrorCatch'

const userUseStableSwapAtom = atomWithStorageWithErrorCatch<boolean>('pcs:useStableSwap', false)

export function useStableSwapByDefault() {
  return useAtom(userUseStableSwapAtom)
}
