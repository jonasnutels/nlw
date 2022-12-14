import logoImg from './assets/logo.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import { Input } from './components/Form/Input';

import './styles/main.css';
import { GameController } from 'phosphor-react';

function App() {
  const [games, setGames] = useState<Game[]>([]);
  interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
      ads: number;
    }
  }

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setGames(data)
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto  flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white mt-20 font-black">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
          <Dialog.Content
            className=' fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
            <Dialog.Title className='text-3xl text-white font-black'> Publique um anúncio</Dialog.Title>
            <form className='mt-8'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="game" className='font-semibold' >Qual o game?</label>
                <Input id="game" placeholder='Selecione o jogo que deseja jogar' />

              </div>

              <div>
                <label htmlFor="name" className='flex flex-col gap-2'>Seu nome (ou nickname)</label>
                <Input id='name' placeholder='Como te chamam dentro do game ?' />
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="yearsPlaying">Joga a quantos anos ?</label>
                  <Input type="number" placeholder='Tudo bem ser ZERO' />
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="discord">Qual seu Discord ?</label>
                  <Input type="text" placeholder='Usuário#0000' />
                </div>
              </div>
              <div className='flex gap-6'>
                <div className='flex flex-col gap-2' >
                  <label htmlFor="weekDays"> Quando costuma jogar ?</label>
                  <div className='grid grid-cols-4'>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900 '
                      title='Domingo'>D</button>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900 '
                      title='Segunda'>S</button>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900 '
                      title='Terça'>T</button>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900 '
                      title='Quarta'>Q</button>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900 '
                      title='Quinta'>Q</button>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900 '
                      title='Sexta'>S</button>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900 '
                      title='Sábado'>S</button>
                  </div>
                </div>

                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor="hourStart">Qual horário do dia ?</label>
                  <div className='grid grid-cols-2 gap-2'>
                    <Input type="time" id='hourStart' placeholder='De' />
                    <Input type="time" id='hourEnd' placeholder='Até' />
                  </div>
                </div>
              </div>
              <div className='mt-2 flex gap-2 text-sm'>
                <Input type="checkbox" />
                Costumo me concectar ao chat de voz
              </div>

              <footer className='mt-4 flex justify-end gap-4'>
                <button className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</button>
                <button type='submit' className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'>
                  <GameController className='w-6 h-6' />
                  Encontrar Duo
                </button>
              </footer>

            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App