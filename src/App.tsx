import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
{/* import { Box, Flex } from "@radix-ui/themes"; */}
import OthelloBoard from "./OthelloBoard";
{/*import walrusImg from './assets/walrus.png'; */}

function App() {
  const currentAccount = useCurrentAccount();

  return (
    <div className="flex flex-col min-h-screen">
      {/* ヘッダー */}
      <header className="w-full border-b border-gray-700 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight text-slate-100">
          Othello dApp
        </h1>
        <ConnectButton />
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 flex items-center justify-center px-4">
        {currentAccount ? (
          <OthelloBoard />
        ) : (
          <div className="text-center">
            <img
              src="/walrus.png"
              alt="Walrus with Othello"
              className="mx-auto w-48 md:w-64 mb-6"
            />

            <h2 className="font-['Anton'] text-center text-6xl leading-tight">
              <span className="text-white">L</span>
              <span className="text-green-400">E</span>
              <span className="text-white">T</span>
              <span className="text-green-400">'</span>
              <span className="text-white">S</span>
              <span className="text-green-400"> </span>
              <span className="text-white">P</span>
              <span className="text-green-400">L</span>
              <span className="text-white">A</span>
              <span className="text-green-400">Y</span>
              <br />
              <span className="text-white">O</span>
              <span className="text-green-400">T</span>
              <span className="text-white">H</span>
              <span className="text-green-400">E</span>
              <span className="text-white">L</span>
              <span className="text-green-400">L</span>
              <span className="text-white">O</span>
            </h2>
            <p className="text-slate-400">
              Connect your Sui wallet using the button above.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
